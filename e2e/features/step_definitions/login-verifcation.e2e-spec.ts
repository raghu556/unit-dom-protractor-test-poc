import { LoginPage } from "../../pages/login-page";
import { expect } from "../../config/helpers/chai-imports";

const { defineSupportCode } = require("cucumber");
const loginPage = new LoginPage();

defineSupportCode(({ Given, When, Then }) => {
  Given(/^user is in the Login page$/, async () => {
    expect(await loginPage.loginPageText()).to.be.equal("Login");
  });

  Then(/^user clicks on the dropdown$/, async () => {
    await loginPage.clickDropDown();
  });

  Then(
    /^set the username as '([^']*)' from the dropdown$/,
    async (userId: string) => {
      await loginPage.selectUserNameFromDropDown(userId);
    }
  );

  When(/^user clicks on the login button$/, async () => {
    await loginPage.clickLoginButton();
  });
});
