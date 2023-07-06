/**
 * @description Takes in HTML element and checks an object's boundaries and text boundaries and compares them to check for overflow. According to current design specs
 * if there is any overflow in a static text, it must be reworded to not use so much space, so any overflows will fail the assertion,
 * regardless of overflow default behavior (having scroll bars for example)
 * Go to systemTest/docs/adr/text-overflow-function.md for more information
 * @param {HTMLElement} el : HTML element being checked for overflow
 */
function checkOverflow(el: HTMLElement) {
  let overflow = false
  const offsetWidth = el.offsetWidth
  const scrollWidth = el.scrollWidth
  const offsetHeight = el.offsetHeight
  const scrollHeight = el.scrollHeight
  const style = window.getComputedStyle(el)
  const parentStyle = window.getComputedStyle(el.parentElement)
  if (scrollWidth > offsetWidth) {
    // checks that the overflow behavior in the x-direction is not scroll or auto (there will be no scroll bar)
    if (
      style.getPropertyValue('overflow-x') != 'scroll' &&
      style.getPropertyValue('overflow-x') != 'auto' &&
      // checks that the overflow behavior of the parent element is not scroll or auto (it will have no scroll bar)
      parentStyle.getPropertyValue('overflow-x') != 'scroll' &&
      parentStyle.getPropertyValue('overflow-x') != 'auto'
    ) {
      overflow = true
    }
  }
  if (scrollHeight > offsetHeight) {
    // checks that the overflow behavior in the y direction is not scroll or auto
    if (
      style.getPropertyValue('overflow-y') != 'scroll' &&
      style.getPropertyValue('overflow-y') != 'auto'
    ) {
      overflow = true
    }
  }
  assert(!overflow, 'Checking for a text overflow on "' + el.textContent + '"')
}

/**
 * @description Checks a user-entered text object's boundaries and text boundaries and compares them to check for overflow. According to current design specs
 * if there is any overflow in text entered by a user, it should be cut off with '...' to show that it is being cut off
 * (The element should have the property text-overflow:ellipsis)
 * @param {HTMLElement} el : HTML element being checked for text overflow - this is the element that the checkOverflow command is chained off of
 */
function checkUserTextOverflow(el: HTMLElement) {
  cy.log(
    'checking user-inputted element for overflow on user-inputted text: ',
    el.textContent
  )
  const offsetWidth = el.offsetWidth
  const scrollWidth = el.scrollWidth
  const offsetHeight = el.offsetHeight
  const scrollHeight = el.scrollHeight
  if (scrollWidth > offsetWidth || scrollHeight > offsetHeight) {
    cy.wrap(el).should('have.css', 'text-overflow', 'ellipsis')
  }
}

/**
 * @description Checks an object's boundaries and text boundaries and compares them to check for overflow in situations where the text is in a dynamically-sized container
 * by comparing the size of the text to the size of its parent object
 * @param {HTMLElement} el : jquery element being checked for text overflow - this is the element that the checkOverflow command is chained off of
 */
function checkOverflowInDynamicContainers(el: HTMLElement) {
  let overflow = false
  const offsetWidth = el.parentElement.offsetWidth
  const scrollWidth = el.scrollWidth
  const offsetHeight = el.parentElement.offsetHeight
  const scrollHeight = el.scrollHeight
  const style = window.getComputedStyle(el)
  const parentStyle = window.getComputedStyle(el.parentElement)
  if (scrollWidth > offsetWidth) {
    if (
      style.getPropertyValue('overflow-x') != 'scroll' &&
      style.getPropertyValue('overflow-x') != 'auto' &&
      // checks that the overflow behavior of the parent element is not scroll or auto (it will have no scroll bar)
      parentStyle.getPropertyValue('overflow-x') != 'scroll' &&
      parentStyle.getPropertyValue('overflow-x') != 'auto'
    ) {
      overflow = true
    }
  }
  if (scrollHeight > offsetHeight) {
    if (
      style.getPropertyValue('overflow-y') != 'scroll' &&
      style.getPropertyValue('overflow-y') != 'auto'
    ) {
      overflow = true
    }
  }
  assert(!overflow, 'Checking for a text overflow on ' + el.textContent)
}
export {
  checkOverflow,
  checkUserTextOverflow,
  checkOverflowInDynamicContainers
}
