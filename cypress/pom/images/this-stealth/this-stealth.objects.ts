import { cyGui } from '@util/type/cyGui'
import { pom } from './type/this-stealth'
import { translatedPhrase } from '@util/translated-phrase'

export const object = {
  /**
   * Returns the This Stealth tab button
   * @return {cyGui<pom.images.thisStealth.stealthTab>} : HTML element of the This Stealth tab
   */
  stealthTab(): cyGui<pom.images.thisStealth.stealthTab> {
    return cy.findByRole('tab', { name: 'This Stealth', exact: true })
  },
  /**
   * Returns the button for clearing the search bar
   * Note that this button only appears when there is text in the search bar
   * @return {cyGui<pom.images.thisStealth.clearSearchButton>} : HTML element of the clear search button
   */
  clearSearch(): cyGui<pom.images.thisStealth.clearSearchButton> {
    return cy.findByTestId('clear-input')
  },
  /**
   * Returns the search bar
   * @return {cyGui<pom.images.thisStealth.searchBar>} : HTML element of the search bar
   */
  searchBar(): cyGui<pom.images.thisStealth.searchBar> {
    return cy
      .findByTestId('views-layout', { exact: true })
      .findByRole('textbox')
  },
  /**
   * Returns the patient card of the specified patient
   * @param {string} patientName : Name of the patient to select
   * @return {cyGui<pom.images.thisStealth.patientCard>} : HTML element of the patient card
   */
  patientCard(patientName: string): cyGui<pom.images.thisStealth.patientCard> {
    return (
      cy
        .findByTestId('patient-list')
        // TODO: Remove timeout once app is more performant: JUNO-24040
        .findByText(patientName, { timeout: 10000 })
        .parents('[data-testid="patient-card"]')
    )
  },
  /**
   * Returns the name of the specified patient card
   * @param {pom.images.thisStealth.patientCard} patientCard : HTML element of the selected patient card
   * @return {cyGui<pom.images.thisStealth.patientName>} : HTML element of the patient Name
   */
  patientName(
    patientCard: pom.images.thisStealth.patientCard
  ): cyGui<pom.images.thisStealth.patientName> {
    return cy.wrap(patientCard).findByTestId('patient-name')
  },
  /**
   * Returns the MRN of the specified patient card
   * @param {pom.images.thisStealth.patientCard} patientCard : HTML element of the selected patient card
   * @return {cyGui<pom.images.thisStealth.patientMRN>} : HTML element of the patient MRN
   */
  patientMRN(
    patientCard: pom.images.thisStealth.patientCard
  ): cyGui<pom.images.thisStealth.patientMRN> {
    return cy.wrap(patientCard).findByTestId('patient-mrn')
  },
  /**
   * Returns the import date of the specified patient card
   * @param {pom.images.thisStealth.patientCard} patientCard : HTML element of the selected patient card
   * @return {cyGui<pom.images.thisStealth.patientImportDate>} : HTML element of the patient import date
   */
  patientImportDate(
    patientCard: pom.images.thisStealth.patientCard
  ): cyGui<pom.images.thisStealth.patientImportDate> {
    return cy.wrap(patientCard).findByTestId('patient-date')
  },
  /**
   * Returns the description of the specified patient card
   * @param {pom.images.thisStealth.patientCard} patientCard : HTML element of the selected patient card
   * @return {cyGui<pom.images.thisStealth.patientDescription>} : HTML element of the patient description
   */
  patientDescription(
    patientCard: pom.images.thisStealth.patientCard
  ): cyGui<pom.images.thisStealth.patientDescription> {
    return cy.wrap(patientCard).findByTestId('patient-description')
  },
  /**
   * Returns the button the sort the patients by import date
   * @return {cyGui<pom.images.thisStealth.sortDate>} : HTML element of the sort by Import Date button
   */
  sortByDate(): cyGui<pom.images.thisStealth.sortDate> {
    return cy
      .findAllByRole('button')
      .contains(
        translatedPhrase('Tasks.Images.ThisStealthTab.SearchBar.ImportDate')
      )
  },
  /**
   * Returns the button the sort the patients by name
   * @return {cyGui<pom.images.thisStealth.sortName>} : HTML element of the sort by Name button
   */
  sortByName(): cyGui<pom.images.thisStealth.sortName> {
    return cy
      .findAllByRole('button')
      .contains(translatedPhrase('Tasks.Images.ThisStealthTab.SearchBar.Name'))
  },
  /**
   * Returns the button the sort the patients by MRN
   * @return {cyGui<pom.images.thisStealth.sortMRN>} : HTML element of the sort by MRN button
   */
  sortByMRN(): cyGui<pom.images.thisStealth.sortMRN> {
    return cy
      .findAllByRole('button')
      .contains(translatedPhrase('Tasks.Images.ThisStealthTab.SearchBar.Mrn'))
  },
  // TODO: Complete implementation of history features (history list) once the code is fleshed out
  /**
   * Returns the button to show the history of the patient
   * @param {pom.images.thisStealth.patientCard} patientCard : HTML element of the selected patient card
   * @return {cyGui<pom.images.thisStealth.history>} : HTML element of the history button
   */
  history(
    patientCard: pom.images.thisStealth.patientCard
  ): cyGui<pom.images.thisStealth.history> {
    return cy
      .wrap(patientCard)
      .findByRole('button', { name: 'Show History', exact: true })
  },
  /**
   * Returns the clone patient button for the specified patient
   * @param {pom.images.thisStealth.patientCard} patientCard : HTML element of the selected patient card
   * @return {cyGui<pom.images.thisStealth.clone>} : HTML element of the clone patient button
   */
  clonePatient(
    patientCard: pom.images.thisStealth.patientCard
  ): cyGui<pom.images.thisStealth.clone> {
    return cy
      .wrap(patientCard)
      .findByRole('button', { name: 'Clone Patient', exact: true })
  },
  // TODO: Complete implementation of grabbing specific cloned patients when there is a way to distinguish between them
  /**
   * Returns the clone of the specified patient
   * @param {string} patientName : Name of the patient to select
   * @return {cyGui<pom.images.thisStealth.patientCard>} : HTML element of the patient card
   */
  clonedPatient(
    patientName: string
  ): cyGui<pom.images.thisStealth.patientCard> {
    return cy
      .findByTestId('patient-list')
      .findAllByText(patientName)
      .parents('[data-testid="patient-card"]')
      .findAllByTestId('patient-description')
      .contains('Cloned from patient')
      .parents('[data-testid="patient-card"]')
  }
}
