# Installation
1. Obtain the `systemTest` repo:
    * `git clone https://code.medtronic.com/ET/te/systemTest.git`
    * `cd systemTest`
    * `npm install`
1. Optionally set cypress.config.ts > env > `host`:
    *  `localhost` : Default value - Cypress and S8 run on same machine
    *  `<your-ip-address>` : Remote configuration, IP or DNS value of running S8 
1. Optionally set cypress.config.ts > `build`:
    * `prd` : Default value - Cypress loads `host/gui`
    * `dev` : Expects `guiwebserver` running in `dev-mode`, Cypress loads `host/gui-dev`
1. Run the Cypress visual test runner:
    * `npm run cypress:open`
1. At this point a Cypress GUI should open and show a list of executable test files