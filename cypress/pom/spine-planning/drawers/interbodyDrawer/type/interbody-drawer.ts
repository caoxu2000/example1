/**
 * Types for the Spine Planning Interbody Drawer sub-POM
 */
import { pom as pomDrawers } from '../../common/type/drawers'

export namespace pom.spinePlanning.drawers.interbodyDrawer {
  // Ignoring this because there is a defect in typescript-eslint plugin 5.43.0 that recognizes pom as unused with this syntax
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export import pom = pomDrawers
  export type interbodyDrawerIcon = JQuery<HTMLElement>
}
