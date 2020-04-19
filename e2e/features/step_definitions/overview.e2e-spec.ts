import { OverviewPage } from "../../pages/overview-page";
import { expect } from "../../config/helpers/chai-imports";
import { browser } from "protractor";

const { defineSupportCode } = require("cucumber");

const overViewPage = new OverviewPage();

defineSupportCode(({ Given, When, Then }) => {
  Then(
    /^user is redirected to the show Data page showing title '([^']*)'$/,
    async (pageTitle: string) => {
      await expect(await overViewPage.overviewTableHeadingExists()).to.be.equal(pageTitle);
      await expect(await overViewPage.getPageTitle()).to.be.equal(pageTitle);
    }
  );
  Then(/^aggrid table exists$/, async () => {
    await expect(await overViewPage.overviewTableExists()).to.be.present;
  });
});
