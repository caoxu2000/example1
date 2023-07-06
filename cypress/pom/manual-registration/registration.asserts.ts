import { object } from './registration.objects'
import { CssColors } from '@global-config/CssColors'

/**
 * Description:
 * Validations for manual registration
 */
export const assert = {
  /** Assert the color of the specified touchpoint
   * @param {number} touchPointNumber: the number of the desired touchpoint
   * @param {CssColors} cssColor: the expected color string reference in global-config/CssColors
   */
  touchpointColorIs(touchPointNumber: number, cssColor: CssColors) {
    object
      .touchpoint(String(touchPointNumber))
      .should('have.css', 'border', cssColor)
  },

  /** Assert the number of landmarks of a specific color
   * @param {string} landmarkColor: the color of the landmarks to count
   * @param {number} numberOfLandmarks: the expected number of landmarks with the specified color
   */
  numberOfLandmarksByColor(landmarkColor: string, numberOfLandmarks: number) {
    cy.log(
      'Expect' + numberOfLandmarks + 'landmarks to be color:' + landmarkColor
    )
    let landmarkCount = 0
    object.landmarkList().each(($landmark) => {
      cy.wrap($landmark)
        .invoke('css', 'border')
        .then(($borderColor) => {
          if (String($borderColor) == landmarkColor) {
            landmarkCount = landmarkCount + 1
          }
          cy.wrap(landmarkCount).as('landmarksOfColor')
        })
    })
    cy.get('@landmarksOfColor').then(($landmarkCount) => {
      expect($landmarkCount).to.eq(numberOfLandmarks)
    })
  },

  /** Assert that no landmarks are detected - i.e., there are 12 empty landmark boxes and 0 landmarks
   */
  noLandmarksDetected() {
    object.landmarkPlaceholderList().should('have.length', 12)
    object.landmarkList().should('have.length', 0)
  },

  /** Assert that touch order is assigned to specified landmark or range of landmarks (default is to check all landmarks)
   * @param {number[] | number} landmarkRange: the range of landmark positions or single landmark position to check
   */
  touchOrderAssigned(landmarkRange?: number[] | number) {
    // Assertion on desired landmark position
    if (landmarkRange && typeof landmarkRange === 'number') {
      const landmarkPosition = landmarkRange
      object
        .landmark(landmarkPosition)
        .should('have.text', landmarkPosition.toString())
    }

    // Assertion on desired landmark range of positions
    else if (landmarkRange && Array.isArray(landmarkRange)) {
      for (const landmarkPosition of landmarkRange) {
        object
          .landmark(landmarkPosition)
          .should('have.text', landmarkPosition.toString())
      }
    }

    // Assertion on all landmarks (default)
    else {
      let landmarkPosition = 1
      object.landmarkList().each(() => {
        object
          .landmark(landmarkPosition)
          .should('have.text', landmarkPosition.toString())
        landmarkPosition++
      })
    }
  },

  /** Assert that touch order is NOT assigned to specified landmark or range of landmarks (default is to check all landmarks)
   * @param {number[] | number} landmarkRange: the range of landmark positions or single landmark position to check
   */
  touchOrderNotAssigned(landmarkRange?: number[] | number) {
    // Assertion on desired landmark position
    if (landmarkRange && typeof landmarkRange === 'number') {
      const landmarkPosition = landmarkRange
      object.landmark(landmarkPosition).should('not.have.text')
    }

    // Assertion on desired landmark range of positions
    else if (landmarkRange && Array.isArray(landmarkRange)) {
      for (const landmarkPosition of landmarkRange) {
        object.landmark(landmarkPosition).should('not.have.text')
      }
    }

    // Assertion on all landmarks (default)
    else {
      let landmarkPosition = 1
      object.landmarkList().each(() => {
        object.landmark(landmarkPosition).should('not.have.text')
        landmarkPosition++
      })
    }
  },

  /** TODO: JUNO-24600 - Clean up touch progress assert
   * Assert the status of the touch progress markers on the progress bar
   * Note that this assertion is for 0-3 progress markers being filled - the 4th progress marker does not fill because the progress bar disappears
   * @param {0|1|2|3} expectedProgressNumber : the expected number of completed progress markers
   */
  touchProgressMarkerStatus(expectedProgressNumber: 0 | 1 | 2 | 3) {
    cy.log(
      'Expected number of completed progress markers: ' + expectedProgressNumber
    )
    for (let progressMarker = 1; progressMarker < 5; progressMarker++) {
      // Checks the progress markers before and at the expected progress
      cy.log('PROGRESS MARKER: ' + progressMarker)
      if (progressMarker <= expectedProgressNumber) {
        object
          .touchProgressMarker(progressMarker)
          .should(
            'have.css',
            'background-color',
            CssColors.TOUCH_PROGRESS_MARKER
          )

        object
          .touchProgressInnerDot(progressMarker)
          .should('have.css', 'background-color', CssColors.STATUS_COMPLETED)
      }
      // Checks the progress markers beyond the expected progress
      else if (progressMarker > expectedProgressNumber && progressMarker != 1) {
        object
          .touchProgressMarker(progressMarker)
          .should(
            'have.css',
            'background-color',
            CssColors.TOUCH_PROGRESS_INCOMPLETE
          )
      }
      // Checks the first progress marker when there is no expected progress
      else if (
        progressMarker > expectedProgressNumber &&
        progressMarker === 1
      ) {
        object
          .touchProgressMarker(progressMarker)
          .should(
            'have.css',
            'background-color',
            CssColors.TOUCH_PROGRESS_MARKER
          )
      }
    }
  },

  /** Assert the status of the touch progress bar
   * Note that this assertion is for 0-66% progress (or 0-3 markers) - the the progress bar doesn't fill to 100% because it disappears
   * @param {0|1|2|3} expectedProgressNumber : the expected number of completed progress markers
   */
  touchProgressBarStatus(expectedProgressNumber: 0 | 1 | 2 | 3) {
    cy.log(
      'Expected number of completed progress markers: ' + expectedProgressNumber
    )

    object
      .touchProgressBar()
      .should('have.attr', 'style')
      .and(($touchProgressStyle) => {
        // Checks that the progress bar is at 0% for 0 or 1 touchpoints
        if (expectedProgressNumber === 0 || expectedProgressNumber === 1) {
          expect($touchProgressStyle).to.contain('width: 0%;')
        }

        // Checks that the progress bar is at 33% for 2 touchpoints
        else if (expectedProgressNumber === 2) {
          expect($touchProgressStyle).to.contain('width: 33.3333%;')
        }

        // Checks that the progress bar is at 66% for 3 touchpoints
        else if (expectedProgressNumber === 3) {
          expect($touchProgressStyle).to.contain('width: 66.6667%;')
        }
      })
  },

  /** Assert the status of the touch progress bar and markers
   * Note that this assertion is for  0-3 markers - the the progress bar doesn't fill to 100% because it disappears
   * @param {0|1|2|3} expectedProgressNumber : the expected number of completed progress markers
   */
  touchProgressOverallStatus(expectedProgressNumber: 0 | 1 | 2 | 3) {
    cy.log(
      'Expected number of completed progress markers: ' + expectedProgressNumber
    )

    assert.touchProgressMarkerStatus(expectedProgressNumber)
    assert.touchProgressBarStatus(expectedProgressNumber)
  },

  /** Assert that registration status is initialized
   */
  touchProgressInitialized() {
    object.touchProgressMarker(0).should('not.exist')
  }
}
