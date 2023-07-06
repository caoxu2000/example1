import { pom } from './type/patient-admin'
import { cyGui } from '@util/type/cyGui'

export const object = {
  /**
   * Returns the button for the Videos tab
   * @return {cyGui<pom.patientAdmin.videosTab>} : HTML element of the Videos tab button
   */
  videosTab(): cyGui<pom.patientAdmin.videosTab> {
    return cy.findByRole('button', { name: 'VIDEOS', exact: true })
  },

  /**
   * Returns the button for the Snapshots tab
   * @return {cyGui<pom.patientAdmin.snapshotsTab>} : HTML element of the Snapshots tab button
   */
  snapshotsTab(): cyGui<pom.patientAdmin.snapshotsTab> {
    return cy.findByRole('button', { name: 'SNAPSHOTS', exact: true })
  },

  /**
   * Returns the desired video or snapshot container based on the provided title
   * @param {string} title : Title of the video or snapshot to select
   * @return {cyGui<pom.patientAdmin.mediaContainer>} : HTML element of the video or snapshot container
   */
  mediaContainer(title: string): cyGui<pom.patientAdmin.mediaContainer> {
    // TODO: Change to ".findByText()" and remove the ".first()" once there are actually unique names
    return cy
      .findAllByText(`${title}`)
      .first()
      .parentsUntil('.card-container')
      .last()
  },

  /**
   * Returns the title of a video or snapshot container
   * @param {string} title : Title of the desired video or snapshot
   * @return {cyGui<pom.patientAdmin.mediaTitle>} : HTML element of the title of the desired video or snapshot
   */
  mediaTitle(title: string): cyGui<pom.patientAdmin.mediaTitle> {
    // TODO: Change to ".findByText()" and remove the ".first()" once there are actually unique names
    return cy.findAllByText(`${title}`).first()
  },

  /**
   * Returns the creation date of the specified video or snapshot container
   * @param {pom.patientAdmin.mediaContainer} mediaContainer : HTML element of the selected video or snapshot container
   * @return {cyGui<pom.patientAdmin.mediaDate>} : HTML element of the creation date
   */
  mediaDate(
    mediaContainer: pom.patientAdmin.mediaContainer
  ): cyGui<pom.patientAdmin.mediaDate> {
    return cy.wrap(mediaContainer).find('.footer').children().eq(1)
  },

  /**
   * Returns the checkbox for the specified video or snapshot container
   * @param {pom.patientAdmin.mediaContainer} mediaContainer : HTML element of the selected video or snapshot container
   * @return {cyGui<pom.patientAdmin.checkbox>} : HTML element of the checkbox
   */
  checkbox(
    mediaContainer: pom.patientAdmin.mediaContainer
  ): cyGui<pom.patientAdmin.checkbox> {
    return cy.wrap(mediaContainer).find('[type="checkbox"]')
  },

  /**
   * Returns the snapshot from within the specified video container
   * Note that this element can only be found when on the Videos tab and when the mediaContainer is a video container
   * @param {pom.patientAdmin.mediaContainer} mediaContainer : HTML element of the selected video container
   * @return {cyGui<pom.patientAdmin.video>} : HTML element of the video
   */
  video(
    mediaContainer: pom.patientAdmin.mediaContainer
  ): cyGui<pom.patientAdmin.video> {
    return cy.wrap(mediaContainer).find('video')
  },

  /**
   * Returns the snapshot from within the specified snapshot container
   * Note that this element can only be found when on the Snapshots tab and when the mediaContainer is a snapshot container
   * @param {pom.patientAdmin.mediaContainer} mediaContainer : HTML element of the selected snapshot container
   * @return {cyGui<pom.patientAdmin.snapshot>} : HTML element of the snapshot
   */
  snapshot(
    mediaContainer: pom.patientAdmin.mediaContainer
  ): cyGui<pom.patientAdmin.snapshot> {
    return cy.wrap(mediaContainer).find('img')
  },

  /**
   * Returns the button to delete a video or snapshot
   * @return {cyGui<pom.patientAdmin.deleteButton>} : HTML element of the Delete Selected button
   */
  deleteButton(): cyGui<pom.patientAdmin.deleteButton> {
    return cy.findByRole('button', { name: 'Delete Selected', exact: true })
  }
}
