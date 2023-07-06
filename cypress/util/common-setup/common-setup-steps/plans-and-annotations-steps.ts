import { menu } from '@pom/shared/menu'
import { planAndAnnotation } from '@pom/plans-and-annotations'

import { planType } from '@pom/plans-and-annotations/plans-and-annotations.options'
import { annotationType } from '@pom/plans-and-annotations/plans-and-annotations.options'

/**
 * Common setup step to set up specified plans
 * @param {Array<planType>} plans : Array of plans to create
 */
export function setupPlans(plans: Array<planType>) {
  menu.action.clickPlanning()
  for (const plan of plans) {
    planAndAnnotation.action.setupPlan(
      plan.name,
      plan.target,
      plan.entry,
      plan.color
    )
  }
}

/**
 * Common setup step to set up specified annotations
 * @param {Array<annotationType>} annotations : Array of annotations to create
 */
export function setupAnnotations(annotations: Array<annotationType>) {
  menu.action.clickPlanning()
  planAndAnnotation.annotationsDrawer().click()
  for (const annotation of annotations) {
    planAndAnnotation.action.createAnnotation(
      annotation.category,
      annotation.type,
      annotation.name
    )
  }
}
