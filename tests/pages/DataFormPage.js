import { Inputs } from '../components/Inputs';
import { Buttons } from '../components/Buttons';
import { BasePage } from './BasePage';
import { BUTTONS } from '../data/buttonSelectors';

export class DataFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputs = new Inputs(page);
    this.buttons = new Buttons(page);
    this.form = this.page.locator('form');
  }

  async checkFormHasInput() {
    const input = this.page.locator('form input');
    const count = await input.count();
    expect(count).toBeGreaterThan(0);
  }
  async checkFormCreateVisible() {
    await expect(this.form).toBeVisible();
    await this.checkFormHasInput();
    await this.checkButtonVisible(BUTTONS.SAVE);
    await this.buttons.checkSaveBtnDisabled();
  }
}
