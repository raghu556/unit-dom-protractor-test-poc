import { by, element, browser } from 'protractor';
import { IdentificationType, BasePage } from './base-page';

const LocatorsLoginPage: any = {
  loginPageHeading: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '/html/body/app-root/app-login/div/div/h2'
  },
  userNameDropdown: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '//*[@id="userSelectionDropdown"]'
  },
  loginButton: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '/html/body/app-root/app-login/div/div/form/button'
  }
};
export class LoginPage extends BasePage {
  async clickDropDown() {
    await this.ElementLocator(LocatorsLoginPage.userNameDropdown).click();
  }

  async selectUserNameFromDropDown(loginId: string) {
    await element(by.cssContainingText('.dropdown-item', loginId)).click();
  }

  async clickLoginButton() {
    await this.ElementLocator(LocatorsLoginPage.loginButton).click();
  }

  async loginPageText() {
    return this.ElementLocator(LocatorsLoginPage.loginPageHeading).getText();
  }
}
