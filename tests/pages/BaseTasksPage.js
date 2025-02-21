import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class BaseTasksPage extends BasePage {
  constructor(page) {
    super(page);

    this.draggable = this.page.locator('[data-rfd-draggable-id="5"]');
    this.droppable = this.page.locator('[data-rfd-droppable-id="2"]');
  }

  async dragAndDropCard(taskId = 1, columnId = 1) {
    const draggable = this.page.locator(`[data-rfd-draggable-id="${taskId}"]`);
    const droppable = this.page.locator(
      `[data-rfd-droppable-id="${columnId}"]`,
    );
    const task = await draggable.boundingBox();
    const target = await droppable.boundingBox();

    await this.page.mouse.move(
      task.x + task.width / 2,
      task.y + task.height / 2,
    );
    await this.page.mouse.down();

    await this.page.mouse.move(
      target.x + target.width / 2,
      target.y + target.height / 2,
      { steps: 15 },
    );
    await this.page.mouse.up();

    await expect(
      droppable.locator(`[data-rfd-draggable-id="${taskId}"]`),
    ).toBeVisible();
  }
}
