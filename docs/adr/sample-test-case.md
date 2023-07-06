# Sample template for test cases
### `Place all the Imports at the very beginning of the file`

The order for the import is as follows:
- POM imports
- imports from global-config folder
- imports from fixtures folder
- imports from util folder - note that when importing index file, the 'index' should be left off of the file path


```
import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'

import { instruments } from '@global-config/instruments'
import { demoLee as patient } from '@fixtures/patients'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

```

### `Declaring Test variables` 
Test variables that are required will be declared after the imports and outside the describe() block at the starting of the spec.

```
  const abc = 'abc'
  const num = '1.2.3.4'

```


### `describe() - high level` 
describe() - high level wrapper of all tests cases in the file; the description should include all the requirement IDs tested by the script as well as context of what the script is trying to achieve. Please note that the requirements should be separated by commas

```
describe('CR1234, CR9876 - Basic Spine Planning: Screws', () => {

```

### `before() Block`
In this block, we write setup steps that are executed once prior to any of the tests running

```

  before(() => {
    util.auth.login()
  // Any steps that need to be completed in order to set up the tests, such as:
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
  // Any patient information used is imported at the top of the spec. 
    images.media.action.searchAndDownload(patient.examList.ct)
  })

```

### `beforeEach() Block`
In this block, we write setup steps that run before every single test. Generally, this only comprises of logging in again and visiting the page in order to be dropped off in the correct task, but this block may include more steps depending on the needs of the test cases.

```

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')
  })

```

### `after() Block`
Generally, the before() should cover all of the setup/teardown needed to ensure the tests run on a clean slate (e.g. exiting the procedure, cleaning the databases, etc). Use the after() block if there is a need for tear down or resetting of state that cannot be done at the beginning of another spec (for example, if a spec contains the use of a simulator, the simulator should be stopped in the after() block of that spec, because there is no way for any other specs to know which simulators may or may not have been running previously). Avoid using after() whenever possible.

```
// After all test have been run, exit procedure and logout of application
  after(() => {
    util.cameraSimulator.stopCamSim()
  })

```

### `Inner describe() Blocks for individual requirement IDs`
Here we are creating describe block for the first requirement ID. 

```

  describe('CR1234', () => {
    //This beforeEach() block has setup steps that should run before both the it() in this describe(). For example:
    beforeEach(() => {
      util.cameraSimulator.stopCamSim()
      trackingView.action.showTrackingView()
    })

  // For the first verification point of CR1234, we add Sys-0010. The general format for test case labels is TC-<req ID>-Sys-00XX, where 00XX would be 0010 for the first test case for that requirement ID, 0020 for the second test case for that requirement ID, and so on
    it('TC-CR1234-Sys-0010, Verify <description of the specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
      //test steps
    })
  // For the second verification point of CR1234, we add Sys-0020
    it('TC-CR1234-Sys-0020, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
      //test steps
    })
  })

```

### `Second describe() block`
A script may test multiple requirements if they are similar to one another; in this case, create a new describe block for each requirement

```
  describe('CR9876', () =>
  {
  // For the first verification point of CR9876, we add Sys-0010
    it('TC-CR9876-Sys-0010, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
      //test steps
    })
  // For the second verification point of CR9876, we add Sys-0020
    it('TC-CR9876-Sys-0020, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
      //test steps
    })
  })
```

### `Third describe() block`
There is a possibility that a test case may test multiple requirements simultaneously; in that case, create a new describe block for the combination of requirements

```
  describe('CR9876, CR1234', () => {
    //The naming convention includes all the requirement IDs strung together
    it('TC-CR9876-CR1234-Sys-0010, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>', () => {
      //test steps
    })
  })

```

## `The whole template`
The code snippets shown above have been consolidated below to create the full test case template.

```
import { procedure } from '@pom/select-procedure'
import { images } from '@pom/images'

import { instruments } from '@global-config/instruments'
import { demoLee as patient } from '@fixtures/patients'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

const abc = 'abc'
const num = '1.2.3.4'

describe('CR1234, CR9876 - Basic Spine Planning: Screws', () => {

    before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    images.media.action.searchAndDownload(patient.examList.ct)
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')
  })

  after(() => {
    util.cameraSimulator.stopCamSim()
  })

  //First Requirement
  describe('CR1234', () => {

    beforeEach(() => {
      util.cameraSimulator.stopCamSim()
      trackingView.action.showTrackingView()
    })

    it('TC-CR1234-Sys-0010, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
        //test steps
    })

    it('TC-CR1234-Sys-0020, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
        //test steps
    })
  })

  //Second Requirement
  describe('CR9876', () =>
  {
    
    it('TC-CR9876-Sys-0010, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
        //test steps 
    })

    it('TC-CR9876-Sys-0020, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>',() => {
        //test steps
    })
  })

  //Test case hitting multiple requirements
  describe('CR9876, CR1234', () => {
    it('TC-CR9876-CR1234-Sys-0010, Verify <description of specific verification point, try to be as close as possible to the verbiage of the test approach>', () => {
      //test steps
    })
  })
})

```
