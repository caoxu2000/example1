#!/usr/bin/env bash

# Test Suite Name - Used for output directory name and title name in html output
SUITE_NAME="smoke-suite"

# Test List
TEST_LIST=(
    cypress/e2e/examples/select-procedure.spec.ts
    cypress/e2e/examples/select-procedure-all.spec.ts
    cypress/e2e/examples/main-menu.spec.ts
    cypress/e2e/examples/images.spec.ts
    cypress/e2e/examples/login-and-select-procedure.spec.ts
    cypress/e2e/examples/login-local.spec.ts
    cypress/e2e/examples/equipment.spec.ts
)

# Get the relative path to where the script was called
SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

# Run the generic test runner with the supplied suite name and test list
$SCRIPT_DIR/../lib/test-suite.sh $SUITE_NAME ${TEST_LIST[@]}