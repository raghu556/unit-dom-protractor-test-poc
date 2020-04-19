import { browser, by, element } from 'protractor';
import { IdentificationType, BasePage } from './base-page';

const LocatorsOverviewPage: any = {
  overviewTable: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '/html/body/app-root/app-show-data/ag-grid-angular'
  },
  overviewPageH2Text: {
    type: IdentificationType[IdentificationType.Xpath],
    value: '/html/body/app-root/app-show-data/h2'
  }
};

export class OverviewPage extends BasePage {
  getPageTitle() {
    return browser.getTitle();
  }

  overviewTableHeadingExists() {
    return this.ElementLocator(LocatorsOverviewPage.overviewPageH2Text).getText();
  }

  overviewTableExists() {
    return this.ElementLocator(LocatorsOverviewPage.overviewTable);
  }
}
