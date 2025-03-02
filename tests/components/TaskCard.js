export class TaskCard {
  constructor(page) {
    this.page = page;
    this.taskTitle = this.page.locator('.MuiTypography-h5');
    this.taskContent = this.page.locator('.MuiCardContent-root p');
  }

  async getTitle() {
    return await this.taskTitle.innerText();
  }

  async getDescription() {
    return await this.taskContent.first().innerText();
  }
}
