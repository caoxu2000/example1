#!/usr/bin/env bash

# Get the current system time and save as a variable for later use
printf -v date '%(%Y-%m-%d_%H-%M-%S)T'

# Default options
HEADED=""
QUIET=""
REPORTER_TYPE="mochawesome"
REPORT_DIR="cypress/out/individual_runs/$date"
REPORTER_OPTIONS="reportFilename=[status]_[name]-report"

# Fetch the options passed in
SHORT=s:,r:,d:,o:,h,q
LONG=spec:,reporter:,headed,dir:,options:,help,quiet
OPTS="$(getopt -o ${SHORT} -l ${LONG} -- "$@")"
eval set -- "$OPTS"

# Parse input args
eval set -- "$OPTS"
while [ : ]; do
  case "$1" in
    -s | --spec)
        SPEC_PATH=$2
        shift 2
        ;;
    -r | --reporter)
        REPORTER_TYPE=$2
        shift 2
        ;;
    --headed)
        HEADED="--headed"
        shift
        ;;
    -d | --dir)
        REPORT_DIR=$2
        shift 2
        ;;
    -o | --options)
        REPORTER_OPTIONS=$2
        shift 2
        ;;
    -q | --quiet)
        QUIET="-q"
        shift
        ;;
    -h | --help)
        echo "Usage of test-runner.sh:"
        echo
        echo "-s --spec : spec file to run"
        echo "-r --reporter : optional, reporter to use, default is mochawesome"
        echo "--headed : optional, no input needed for option, default is to run headless if option not given"
        echo "-d --dir : optional, report dir to use, default is cypress/out/individual_runs/<date>. Use \$date to reference current datetime"
        echo "-o --options : optional, reporter-options to pass in, default is"
        echo "-q --quiet : optional, no input needed for option, run Cypress in quiet mode"
        echo "-h --help : Print out the test runner parameters"
        echo
        echo "Examples:"
        echo "./cypress/e2e/test-runners/lib/test-runner.sh --spec cypress/e2e/examples/main-menu.spec.ts"
        echo "./cypress/e2e/test-runners/lib/test-runner.sh -s cypress/e2e/examples/robot-util.spec.ts -h -q -r cypress-multi-reporters -d cypress/out/myTests/\$date"
        echo
        echo "This script can be run standalone; can also be invoked with predefined inputs by npm scripts"
        echo


        exit 1
        ;;
    --) shift;
        break
        ;;
  esac
done

# Check that spec path is set, if not exit
[[ -z "$SPEC_PATH" ]] && { echo "No spec provided! Exiting test-runner" ; exit 1; }

echo "Running test runner with inputs:"
echo "SPEC: ${SPEC_PATH}"
echo "REPORTER_TYPE: ${REPORTER_TYPE}"
echo "HEADED MODIFIER: ${HEADED}"
echo "REPORT_DIR: ${REPORT_DIR}"
echo "REPORTER_OPTIONS: ${REPORTER_OPTIONS}"
echo "QUIET MODIFIER: ${QUIET}"

SPEC_NAME="$(basename $SPEC_PATH)"

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
ROOT_DIR="$( cd "$(dirname $SCRIPT_DIR)/../../.."; pwd -P )" # Note the Root Dir is pointed to the "systemTest/" folder

VIDEOS_DIR="$REPORT_DIR/videos"
SCREENSHOT_DIR="$REPORT_DIR/screenshots"
export CYPRESS_REPORT_DIR="$REPORT_DIR" # Exported path is used in Cypress when adding screenshots as context

# Check to see if output directory exists otherwise create it
mkdir -p $REPORT_DIR

cd $ROOT_DIR

if [ -d $REPORT_DIR ]; then

    # Get name of the test file name for outputting the results
    export TEST_CASE_NAME=$SPEC_NAME # Set Test Case Name as env variable for reporter

    echo "Running test: $SPEC_NAME"

    npx cypress run $QUIET $HEADED \
        --reporter "$REPORTER_TYPE" \
        --reporter-options "$REPORTER_OPTIONS,reportDir=$REPORT_DIR" \
        --config screenshotsFolder=$SCREENSHOT_DIR,trashAssetsBeforeRuns=false,videosFolder=$VIDEOS_DIR \
        --spec $SPEC_PATH
    
    echo "Copying image compare folder into test report"
    mkdir $REPORT_DIR/imageCompare
    cp -r $ROOT_DIR/cypress-visual-report $REPORT_DIR/imageCompare/cypress-visual-report
    cp -r $ROOT_DIR/cypress-visual-screenshots $REPORT_DIR/imageCompare/cypress-visual-screenshots

fi

echo "$SPEC_NAME Finished... ";
