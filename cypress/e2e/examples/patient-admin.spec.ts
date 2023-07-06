import { patientAdmin } from '@pom/patient-admin'
import { procedure } from '@pom/select-procedure'
import { menu } from '@pom/shared/menu'

import { util } from '@util'
import { guiRoutes } from '@util/assert/config'

describe('Example spec for the Patient Admin POMs', () => {
  const title = 'My epic application!'
  const date = '30/Feb/2022'

  before(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    cy.setLanguage()
  })

  beforeEach(() => {
    util.auth.login()
    util.exit()
    cy.visit('/')
    util.assert.urlIs(guiRoutes.selectProcedure)
    procedure.action.select(procedure.opt.availableProcedures.biopsy)
    menu.action.clickPatient()
  })

  it('Select Snapshot tab, interact with snapshot', () => {
    // Select snapshot, check title and date, check checkbox, delete by clicking Delete Selected
    patientAdmin.snapshotsTab().click()
    patientAdmin.mediaContainer(title).then(($mediaContainer) => {
      patientAdmin.mediaTitle(title).should('have.text', `${title}`)
      patientAdmin.mediaDate($mediaContainer).should('have.text', date)
      patientAdmin.deleteButton().should('be.disabled')
      patientAdmin.checkbox($mediaContainer).check()
      patientAdmin.checkbox($mediaContainer).should('be.checked')
      patientAdmin.deleteButton().should('be.enabled').click()
    })

    // Select snapshot, delete via drag and drop method
    patientAdmin.mediaContainer(title).then(($mediaContainer) => {
      patientAdmin.checkbox($mediaContainer).check()
    })
    patientAdmin.mediaContainer(title).trigger('dragstart')
    patientAdmin.deleteButton().trigger('drop')
  })

  it('Select Videos tab, interact with video element', () => {
    // Select Videos tab, select by clicking anywhere on video card, delete video
    patientAdmin.videosTab().click()
    patientAdmin.deleteButton().should('be.disabled')
    patientAdmin
      .mediaContainer(title)
      .click()
      .then(($mediaContainer) => {
        patientAdmin.checkbox($mediaContainer).should('be.checked')
        patientAdmin.deleteButton().should('be.enabled').click()
      })

    // Select video, play video
    // NOTE: The videos are default html5 video elements with built-in controls, meaning they cannot be interacted with
    // This is why the video element itself needs to be acted on (e.g. $video[0].play() ); however, this doesn't show up in the Cypress logs, hence the cy.log()
    // In addition, fullscreen, download, and picture-in-picture (which are also built-in properties of the html5 video element) cannot be interacted with in Cypress
    // because of backend conflicts (e.g. requestFullscreen() fails because of an error that is returned from that backend call, even though overall the fullscreen is entered)
    // TODO: investigate clicking on play, pause, etc by using their coordinate locations
    patientAdmin.mediaContainer(title).then(($mediaContainer) => {
      patientAdmin
        .video($mediaContainer)
        .should('have.prop', 'paused', true)
        .then(($video) => {
          cy.log('adjust playback rate')
          $video[0].playbackRate = 2
          cy.log('play')
          $video[0].play()
          cy.log('mute')
          $video[0].muted = true
        })
      patientAdmin
        .video($mediaContainer)
        .should('have.prop', 'paused', false)
        .and('have.prop', 'muted', true)
        .then(($video) => {
          cy.log('unmute')
          $video[0].muted = false
          cy.log('adjust volume')
          $video[0].volume = 0.5
          cy.log('pause')
          $video[0].pause()
        })
      patientAdmin
        .video($mediaContainer)
        .should('have.prop', 'volume', 0.5)
        .and('have.prop', 'paused', true)
    })
  })
})
