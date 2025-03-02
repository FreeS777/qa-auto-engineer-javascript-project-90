export class Selectors {
  constructor(page) {
    this.page = page;
  }

  async selectAssignee(email) {
    await this.page.getByLabel('Assignee').selectOption(email);
  }
  async selectStatus(status) {
    await this.page.getByLabel('Status').selectOption(status);
  }
  async selectLabel(label) {
    await this.page.getByLabel('Label').selectOption(label);
  }
}
