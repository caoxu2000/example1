import { guiRoutes } from '@util/assert/config'
import { procedure, Anatomy } from './procedure.options'
import { util } from '@util'

export const assert = {
  /**
   * Asserts the page routed to the correct URL according to the selected procedure
   *
   * @param {procedure} selected the selected procedure
   */
  procedureRouteIs(selected: procedure) {
    if (
      selected.anatomy === Anatomy.CRANIAL ||
      selected.anatomy === Anatomy.ENT
    ) {
      util.assert.urlIs(guiRoutes.images)
    }
    // TODO: See JUNO-13184 this is only true if the O-arm is in the procedure. If O-arm is not in procedure it should go directly to images. Update this to match expected.
    if (selected.anatomy === Anatomy.SPINE) {
      // TODO: JUNO-13184 - Update spine procedure assert to match expected behavior of routing to instruments or images
      util.assert.urlIs(guiRoutes.instruments)
    }
  }
}
