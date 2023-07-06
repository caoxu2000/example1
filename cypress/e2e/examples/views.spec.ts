import { views } from '@pom/views'
import { images } from '@pom/images'
import { procedure } from '@pom/select-procedure'
import { task } from '@pom/shared/task'

import { demoLee as patient } from '@fixtures/patients'

import { util } from '@util'
import { alias } from '@util/type/cy-alias'
import { guiRoutes } from '@util/assert/config'

describe('Example spec for the Views Manipulation POM', () => {
  // TODO: uncomment when current value is added back to the GUI
  // also update when JUNO-8621 (convert string asserts to custom child commands) is addressed
  // const newLevelSliderValue = '36'
  // const newWidthSliderValue = '135'

  before(() => {
    util.auth.login()
    util.cleanPatientDb()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    images.media.action.searchAndDownload(patient.examList.ct)
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    images.thisStealth.action.selectExam(patient, patient.examList.ct.name)

    task.next.plan()
  })

  it('Open 2D Views drawer, compare mode, auto blend, and enable/disable visibility', () => {
    views.drawer.drawerToggle2dViews().click()
    views.drawer.compareMode().click()
    views.drawer.autoBlend().click()
    views.drawer.examCard(patient.examList.ct).then(($selectedCard) => {
      views.drawer.hiddenIcon($selectedCard).click()
      views.drawer.visibleIcon($selectedCard).click()
    })
  })

  it('Adjust Level and Width Slider', () => {
    views.drawer.drawerToggle2dViews().click()
    views.drawer.examCard(patient.examList.ct).then(($selectedCard) => {
      views.drawer.adjustLevelWidth($selectedCard).click()
      views.drawer
        .sliderContainer($selectedCard, views.drawer.opt.LevelWidthSlider.LEVEL)
        .then(($sliderContainer) => {
          // adjust the Level slider and read the Level value
          // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
          cy.waitForApi(alias.sliderUpdate, () => {
            views.drawer.slider($sliderContainer).click()
          })

          // TODO: uncomment when current value is added back to the GUI
          // also update when JUNO-8621 (convert string asserts to custom child commands) is addressed
          // views.drawer
          //   .sliderValue($sliderContainer)
          //   .should('have.text', newLevelSliderValue)
        })
      views.drawer
        .sliderContainer($selectedCard, views.drawer.opt.LevelWidthSlider.WIDTH)
        .then(($sliderContainer) => {
          // adjust the Width slider and read the Width value
          // TODO: Update this to use the slider common functionality when implemented (JUNO-6881)
          views.drawer.slider($sliderContainer).as('slider')
          for (let n = 0; n < 35; n++) {
            cy.waitForApi(alias.sliderUpdate, () => {
              cy.get('@slider').click()
            })
          }

          // TODO: uncomment when current value is added back to the GUI
          // also update when JUNO-8621 (convert string asserts to custom child commands) is addressed
          // views.drawer
          //   .sliderValue($sliderContainer)
          //   .should('have.text', newWidthSliderValue)
        })
    })
  })

  // TODO: the assert in this test will fail because the dropdowns are not functional and don't change. Update to not
  // skip this assert when they are functional.
  it('Modify exam with 2D Views, add model', () => {
    views.drawer.drawerToggle2dViews().click()
    views.drawer.examCard(patient.examList.ct).then(($selectedCard) => {
      views.drawer.gearControl($selectedCard).click()
    })
    views.drawer.colormap().click()
    views.drawer.selectColormap(views.drawer.opt.Colormap.RAINBOW).click()
    // TODO: update when JUNO-8621 (convert string asserts to custom child commands) is addressed
    // views.drawer.colormapValue().invoke('text').should('eq', views.drawer.opt.Colormap.RAINBOW)
    views.drawer.addModel().click()
    views.drawer.buildModel().click()
  })

  it('Open 3D Views drawer, compare mode, auto blend, and enable/disable visibility', () => {
    views.drawer.drawerToggle3dViews().click()
    views.drawer.compareMode().click()
    views.drawer.autoBlend().click()
    views.drawer.examCard(patient.examList.ct).then(($selectedCard) => {
      views.drawer.hiddenIcon($selectedCard).click()
      views.drawer.visibleIcon($selectedCard).click()
    })
  })

  // TODO: the asserts in this test will fail because the dropdowns are not functional and don't change. Update to not
  // skip the asserts when they are functional.
  it('Modify exam with 3D Views, add model', () => {
    views.drawer.drawerToggle3dViews().click()
    views.drawer.examCard(patient.examList.ct).then(($selectedCard) => {
      views.drawer.gearControl($selectedCard).click()
    })
    views.drawer.colormap().click()
    views.drawer.selectColormap(views.drawer.opt.Colormap.SKIN_AND_BONE).click()
    // TODO: update when JUNO-8621 (convert string asserts to custom child commands) is addressed
    // views.drawer.colormapValue().invoke('text').should('eq', views.drawer.opt.Colormap.SKIN_AND_BONE)
    views.drawer.display().click()
    views.drawer.selectDisplay(views.drawer.opt.Display.SHADED).click()
    // TODO: update when JUNO-8621 (convert string asserts to custom child commands) is addressed
    // views.drawer.displayValue().invoke('text').should('eq', views.drawer.opt.Display.SHADED)
    views.drawer.cutMode().click()
    views.drawer.freeze().click()
    views.drawer.cutType().click()
    views.drawer.selectCutType(views.drawer.opt.CutType.OBLIQUE).click()
    // TODO: update when JUNO-8621 (convert string asserts to custom child commands) is addressed
    // views.drawer.cutTypeValue().invoke('text').should('eq', views.drawer.opt.CutType.OBLIQUE)
    views.drawer.addModel().click()
    views.drawer.buildModel().click()
  })

  it('Manipulate views, zoom and rotate', () => {
    // TODO: workaround to put left panel in proper state - remove opening right panel when new look and feel is applied everywhere
    views.drawer.drawerToggle3dViews().click()
    views.viewPanes
      .imageToolBarButton(views.viewPanes.opt.ImageToolButton.ZOOM)
      .click()
    views.viewPanes.action.changeViewTypeByValue(
      views.viewPanes.opt.ViewType.SAGITTAL,
      views.viewPanes.opt.ViewType.AXIAL
    )
    views.viewPanes.action.changeViewTypeByValue(
      views.viewPanes.opt.ViewType.AXIAL,
      views.viewPanes.opt.ViewType.VIDEO,
      2
    )
    views.viewPanes.viewPane(views.viewPanes.opt.ViewType.THREE_D).click()
    views.viewPanes.action.zoom(views.viewPanes.opt.ViewType.THREE_D, -200)
    views.viewPanes.action.rotate(
      views.viewPanes.opt.ViewType.THREE_D,
      -90,
      120
    )
    views.viewPanes.action.zoom(views.viewPanes.opt.ViewType.THREE_D, 2000)
    views.viewPanes.action.rotate(views.viewPanes.opt.ViewType.THREE_D, 180, 0)
  })
})
