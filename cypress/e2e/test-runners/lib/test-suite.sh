#!/usr/bin/env bash

# Get inputs for test suite - suite name and test list
SUITE_NAME=$1
TEST_LIST=( "$@" )
unset TEST_LIST[0] # Remove first argument inputted since it will be the suite name and not a test

# Get the current system time and save as a variable for later use
printf -v date '%(%Y-%m-%d_%H-%M-%S)T'

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
ROOT_DIR="$( cd "$(dirname $SCRIPT_DIR)/../../.."; pwd -P )" # Note the Root Dir is pointed to the "systemTest/" folder

SUITE_DIR="cypress/out/$SUITE_NAME/$date"
export INDIV_REPORTS_DIR="$SUITE_DIR/individual_runs" # Exported path is used in reporter config as environment variable

# Verify the path of the script exists
# Check to see if output directory exists otherwise create it
mkdir -p $INDIV_REPORTS_DIR

cd $ROOT_DIR
for i in "${TEST_LIST[@]}"
do
    source $SCRIPT_DIR/test-runner.sh --spec $i --reporter cypress-multi-reporters \
        --options 'configFile=suite-reporter-config.js' \
        --dir $SUITE_DIR --quiet
done

# Merge all test case reports for readability
REPORT_JSON_PATH=$SUITE_DIR/report_$SUITE_NAME.json
npx mochawesome-merge "$INDIV_REPORTS_DIR/*.json" -o $REPORT_JSON_PATH

# Run Mocha Awesome Reporter on Merged Json
npx marge $REPORT_JSON_PATH --reportDir $SUITE_DIR --reportFilename "report-$SUITE_NAME" --reportTitle $SUITE_NAME

echo "$SUITE_NAME Finished... ";