/**
 * Publishes a Rabbit message using the given publishKey and publishContent, listens for the given waitKey
 * @param {string} publishKey : routing key to publish/send
 * @param {any} publishContent : payload of the publishKey
 * @param {string} waitKey : routing key to wait on/listen for
 */
export function rabbitMessage(
  publishKey: string,
  publishContent: any,
  waitKey: string
) {
  cy.task('publishAndWaitForRabbit', { publishKey, publishContent, waitKey })
}
