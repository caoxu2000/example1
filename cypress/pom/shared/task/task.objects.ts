import { pom } from './type/task'
import { cyGui } from '@util/type/cyGui'

export const object = {
  /**
   * Returns the button for the next task
   * @return {cyGui<pom.task.nextTaskButton>} : HTML element of the next task button
   */
  nextButton(): cyGui<pom.task.nextTaskButton> {
    return cy
      .findByRole('button', { name: 'next-task-button' })
      .findByTestId('next-task-name')
  },
  /**
   * Returns the button for the previous task
   * @return {cyGui<pom.taskButton.prevTaskButton>} : HTML element of the previous task button
   */
  previousButton(): cyGui<pom.task.nextTaskButton> {
    return cy
      .findByRole('button', { name: 'previous-task-button' })
      .findByTestId('previous-task-name')
  }
}
