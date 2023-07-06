import { cyGui } from '@util/type/cyGui'
import { pom } from './type/media'
import { translatedPhrase } from '@util/translated-phrase'

export const object = {
  /**
   * Returns the Media tab button
   * @return {cyGui<pom.images.media.media>} : HTML element of the Media tab
   */
  mediaTab(): cyGui<pom.images.media.mediaTab> {
    return cy.findByRole('tab', { name: 'Media', exact: true })
  },
  /**
   * Returns the button for clearing the search bar
   * @return {cyGui<pom.images.media.clearSearchButton>} : HTML element of the clear search button
   */
  clearSearch(): cyGui<pom.images.media.clearSearchButton> {
    return cy.findByTestId('clear-input')
  },
  /**
   * Returns the search bar
   * @return {cyGui<pom.images.media.searchBar>} : HTML element of the search bar
   */
  searchBar(): cyGui<pom.images.media.searchBar> {
    return cy
      .findByTestId('views-layout', { exact: true })
      .findByRole('textbox')
  },
  /**
   * Returns the Search button
   * @return {cyGui<pom.images.media.searchButton>} : HTML element of the Search button
   */
  search(): cyGui<pom.images.media.searchButton> {
    return cy.findByRole('button', { name: 'media-search-button', exact: true })
  },
  /**
   * Returns the collapsable patient study container based on the study number
   * @param {string} studyNumber : A string of numbers specific to a study
   * @return {cyGui<pom.images.media.patientStudy>} : HTML element of the patient study container
   */
  patientStudyCard(studyNumber: string): cyGui<pom.images.media.patientStudy> {
    // TODO: Remove timeout once app is more performant: JUNO-24040
    return cy.findByTestId('study-' + studyNumber, { timeout: 10000 })
  },
  /**
   * Returns the Download All button from the collapsable patient study
   * Note that a patient study must be selected in order to access this element
   * @param {pom.images.media.patientStudy} patientStudyCard : HTML element of the patient study container
   * @return {cyGui<pom.images.media.downloadAllButton>} : HTML element of the Download All button
   */
  downloadAllExamsButton(
    patientStudyCard: pom.images.media.patientStudy
  ): cyGui<pom.images.media.downloadAllButton> {
    return cy.wrap(patientStudyCard).findByRole('button', {
      name: translatedPhrase('Tasks.Images.DicomQuery.Study.DownloadAll'),
      exact: true
    })
  },
  /**
   * Returns the Download button for the specified exam from the collapsable patient study
   * Note that a patient study must be selected in order to access this element
   * @param {pom.images.media.patientStudy} patientStudyCard : HTML element of the patient study container
   * @param {string} seriesNumber : Series number of the exam to select
   * @return {cyGui<pom.images.media.downloadExamButton>} : HTML element of the Download button
   */
  downloadExamButton(
    patientStudyCard: pom.images.media.patientStudy,
    seriesNumber: string
  ): cyGui<pom.images.media.downloadExamButton> {
    return cy
      .wrap(patientStudyCard)
      .findByText('Series: ' + seriesNumber, { exact: true })
      .last()
      .parents('[data-testid="series"]')
      .findByRole('button', {
        name: translatedPhrase('Tasks.Images.DicomQuery.Series.Btn.Download'),
        exact: true
      })
  },
  /**
   * Returns the button the sort the exams of the collapsable patient study by description
   * Note that a patient study must be selected in order to access this element
   * @param {pom.images.media.patientStudy} patientStudyCard : HTML element of the patient study container
   * @return {cyGui<pom.images.media.sortDescription>} : HTML element of the sort by Description button
   */
  sortByDescription(
    patientStudyCard: pom.images.media.patientStudy
  ): cyGui<pom.images.media.sortDescription> {
    return cy
      .wrap(patientStudyCard)
      .findAllByRole('button')
      .contains(
        translatedPhrase('Tasks.Images.DicomQuery.SeriesSort.Description')
      )
  },
  /**
   * Returns the button the sort the exams of the collapsable patient study by date
   * Note that a patient study must be selected in order to access this element
   * @param {pom.images.media.patientStudy} patientStudyCard : HTML element of the patient study container
   * @return {cyGui<pom.images.media.sortDate>} : HTML element of the sort by Date button
   */
  sortByDate(
    patientStudyCard: pom.images.media.patientStudy
  ): cyGui<pom.images.media.sortDate> {
    return cy
      .wrap(patientStudyCard)
      .findAllByRole('button')
      .contains(translatedPhrase('Tasks.Images.DicomQuery.SeriesSort.Date'))
  },
  /**
   * Returns the button the sort the exams of the collapsable patient study by number of slices
   * Note that a patient study must be selected in order to access this element
   * @param {pom.images.media.patientStudy} patientStudyCard : HTML element of the patient study container
   * @return {cyGui<pom.images.media.sortDescription>} : HTML element of the sort by Slices button
   */
  sortBySlices(
    patientStudyCard: pom.images.media.patientStudy
  ): cyGui<pom.images.media.sortSlices> {
    return cy
      .wrap(patientStudyCard)
      .findAllByRole('button')
      .contains(translatedPhrase('Tasks.Images.DicomQuery.SeriesSort.Slices'))
  }
}
