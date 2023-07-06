// page objects
import { views } from '@pom/views'
import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'
import { task } from '@pom/shared/task'
import {
  ViewType,
  ImageToolButton
} from '@pom/views/view-panes/view-panes.options'

// static data
import { demoLee as patient } from '@fixtures/patients'
import {
  procedureDefaultPresets,
  updateViewTypeArray1,
  updateViewTypeArray2
} from '@fixtures/data/preset-configs'

// utility
import { util } from '@util/index'

// test variable
const presetName1 = 'Preset 1'
const presetName2 = 'Preset 2'
const defaultViewTypeArray = [
  ViewType.THREE_D,
  ViewType.SAGITTAL,
  ViewType.AXIAL,
  ViewType.CORONAL
]
const newViewTypeArray = [
  ViewType.VIDEO,
  ViewType.CORONAL,
  ViewType.AXIAL,
  ViewType.THREE_D,
  ViewType.SAGITTAL,
  ViewType.PROBES_EYE
]
const oneViewPort: [number, ViewType][] = [[1, ViewType.THREE_D]]
const sixViewPorts: [number, ViewType][] = [
  [1, newViewTypeArray[0]],
  [2, newViewTypeArray[1]],
  [3, newViewTypeArray[2]],
  [4, newViewTypeArray[3]],
  [5, newViewTypeArray[4]],
  [6, newViewTypeArray[5]]
]

describe('TC-CR105351, TC-CR105352, TC-CR105353', () => {
  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    images.media.action.searchAndDownload(patient.examList.ct)
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)
    task.next.plan()
  })

  beforeEach(() => {
    util.auth.login()
    cy.visit('/')

    // TODO: currently waiting on dropdown to load, but investigate better way to wait for page to load - JUNO-14068
    views.viewPanes.viewSelectionDropdownByPosition(1).should('exist')
    views.drawer.layoutsDrawer().click()
  })

  afterEach(() => {
    views.drawer.action.configureViewsLayoutPreset(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_FOUR
    )
  })

  // TODO: the following test is currently failing b/c this bug: JUNO-24839. It should pass once it's fixed
  it('TC-CR105351-Sys-0010, Verify that the cycle layouts button allows the user cycle through layouts', () => {
    // Click 'Preset 1' and assert layout viewports of Preset 1 is displayed in the left view layout
    views.drawer.presetContainer(presetName1).click()
    views.viewPanes.assert.layoutsArePresent(
      procedureDefaultPresets.biopsyPlanTaskDefaultPresets[0]
    )
    // Click 'Cycle' icon on the left toolbar and assert it's showing Preset 2's layout viewports now
    views.viewPanes.imageToolBarButton(ImageToolButton.CYCLE_LAYOUTS).click()
    views.viewPanes.assert.layoutsArePresent(
      procedureDefaultPresets.biopsyPlanTaskDefaultPresets[1]
    )
  })

  // TODO: the following test is currently failing b/c this bug: JUNO-24839. It should pass once it's fixed
  it('TC-CR105352-Sys-0010, Verify the default layouts are present', () => {
    // Click 'Preset 1' and assert its layout viewports
    views.drawer.presetContainer(presetName1).click()
    views.viewPanes.assert.layoutsArePresent(
      procedureDefaultPresets.biopsyPlanTaskDefaultPresets[0]
    )
    // Click 'Preset 2' and assert its layout viewports
    views.drawer.presetContainer(presetName2).click()
    views.viewPanes.assert.layoutsArePresent(
      procedureDefaultPresets.biopsyPlanTaskDefaultPresets[1]
    )
  })

  it('TC-CR105353-Sys-0020, Verify layout can be selected from layout option menu', () => {
    // Change Preset 1 layout to 1-up configuration and assert it's changed in viewports
    views.drawer.action.configureViewsLayoutPreset(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_ONE
    )
    views.viewPanes.assert.layoutsArePresent(oneViewPort)
  })

  it.skip('TC-CR105353-Sys-0030, Verify that new view layouts can be added', () => {
    // Placeholder for test. This is not yet implemented. see JUNO-24857
  })

  // TODO: the following test is currently failing b/c this bug: JUNO-24839. It should pass once it's fixed
  it('TC-CR105353-Sys-0040, Verify that the view type can be selected for each viewport in the layout', () => {
    // Change the layout option from default to 9-up configuration
    views.drawer.action.configureViewsLayoutPreset(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_NINE
    )

    // Change viewtype in the viewports from the default to another different type from left to right, top to bottom
    // Assert the viewtype of each viewport is changed to the new type
    for (const [index, viewtype] of updateViewTypeArray1.entries()) {
      views.viewPanes.action.changeViewTypeByValue(
        viewtype[0],
        viewtype[1],
        viewtype[2]
      )
      views.viewPanes.assert.viewSelectionDropdownValue(index + 1, viewtype[1])
    }
  })

  it.skip('TC-CR105353-Sys-0050, Verify that the user can change the layout name', () => {
    // Placeholder for test. This is not yet implemented. see JUNO-11511
  })

  // TODO: the following test is currently failing b/c this bug: JUNO-24839. It should pass once it's fixed
  it('TC-CR105353-Sys-0060, Verify changes to the layout settings can be saved', () => {
    // Assert default layout of Preset 1 is 4-up in the left view layout and the preview image
    views.drawer.presetContainer(presetName1).click()
    // TODO: JUNO-32648 will update the objects so the following assert will be working once the test ids are added to the app (JUNO-24986)
    views.drawer.assert.layoutPreviewImageIsExpected(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_FOUR,
      4
    )
    views.viewPanes.assert.layoutsArePresent(
      procedureDefaultPresets.biopsyPlanTaskDefaultPresets[0]
    )
    // Change layout of Preset 1 to 6-up and viewtypes of some viewports and save
    views.drawer.action.configureViewsLayoutPreset(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_SIX,
      newViewTypeArray
    )

    // Click 'Preset 2' and click 'Preset 1' again in order to assert change is saved
    views.drawer.presetContainer(presetName2).click()
    views.drawer.presetContainer(presetName1).click()
    // TODO: JUNO-31150 - Add a Test Case to test changes are still saved if logout/back in
    // TODO: JUNO-32648 will update the objects so the following assert will be working once the test ids are added to the app (JUNO-24986)
    // Assert the changes to layout and viewtype changes in the viewports are saved in the preview image and the left view layout
    views.drawer.assert.layoutPreviewImageIsExpected(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_SIX,
      6
    )
    views.viewPanes.assert.layoutsArePresent(sixViewPorts)
    // tear down to change the layout and viewtype of viewpanes back
    views.drawer.action.configureViewsLayoutPreset(
      presetName1,
      views.drawer.opt.LayoutOptionsInPreset.LAYOUT_FOUR,
      defaultViewTypeArray
    )
  })

  it('TC-CR105353-Sys-0080, Verify that each view type is selectable from a viewport dropdown', () => {
    // Selects 'Preset 1' and changes the viewtype of the 1st viewport from default to every option on the drop down list
    // Assert the viewtype is changed to the next one that is selected
    views.drawer.presetContainer(presetName1).click()

    for (const viewtype of updateViewTypeArray2) {
      views.viewPanes.action.changeViewTypeByValue(
        viewtype[0],
        viewtype[1],
        viewtype[2]
      )
      views.viewPanes.assert.viewSelectionDropdownValue(1, viewtype[1])
    }
  })

  it('TC-CR105353-Sys-0090, Verify that multiple 3D viewports can be selected concurrently', () => {
    // With the viewtype being 3D of the 1st viewport, change the viewtype of 2nd from Sagittal to 3D
    // Assert both viewports have the 3D selected
    views.drawer.presetContainer(presetName1).click()
    views.viewPanes.action.changeViewTypeByValue(
      ViewType.SAGITTAL,
      ViewType.THREE_D
    )
    views.viewPanes.assert.viewSelectionDropdownValue(1, ViewType.THREE_D)
    views.viewPanes.assert.viewSelectionDropdownValue(2, ViewType.THREE_D)
    // TODO: JUNO-32783: take a screenshot of the viewport for visual verification once the 3D image is working in the app
    cy.screenshot()
  })
})
