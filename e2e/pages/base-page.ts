import { browser, by, element } from 'protractor';
import { assert, expect } from '../config/helpers/chai-imports';

export enum IdentificationType {
  Xpath,
  Css,
  Id,
  Js,
  Name,
  PartialLinkText,
  ClassName
}

export class BasePage {
  ElementLocator(obj: any) {
    switch (obj.type) {
      case IdentificationType[IdentificationType.Xpath]:
        return element(by.xpath(obj.value));
      case IdentificationType[IdentificationType.ClassName]:
        return element(by.className(obj.value));
      case IdentificationType[IdentificationType.Id]:
        return element(by.id(obj.value));
      case IdentificationType[IdentificationType.Js]:
        return element(by.js(obj.value));
      case IdentificationType[IdentificationType.Css]:
        return element(by.css(obj.value));
      default:
        break;
    }
  }

  /**
   * Wait for the new tab to load and also for angular to bootstrap before continuing.
   * The code expects that one additional tab to the main tab will open.
   * Inputs:
   *    tabTitle: the title of the new tab
   *    expectedTabsCount: the number of tabs in the browser after the new tab is opened. Default value is 2;
   */
  static async waitForTabToLoad(tabTitle: string, expectedTabsCount = 2) {
    console.log('Waiting for Tab ' + tabTitle + ' to load');
    // Check the input parameters and don't bother to proceed if they are not correct.
    expect(expectedTabsCount, 'The expected tabs count should be >= 1').gte(1);
    expect(tabTitle, 'The expected tab title should not be empty').not.to.be
      .empty;

    // Wait until the number of tabs is equal to expectedTabsCount
    const TIMEOUT = 20000; // 20 seconds
    const SLEEP_IN_MILLIS = 250;
    const MAX_RETRIES = Math.ceil(TIMEOUT / SLEEP_IN_MILLIS); // approx a retry is 1 second

    let remainingRetries = MAX_RETRIES;
    let handles: string[];
    let doLoop = true;
    do {
      try {
        handles = await browser.getAllWindowHandles();
      } catch (err) {
        console.warn('Error while getting browser.getAllWindowHandles()');
        console.warn(err);
      }
      remainingRetries--;
      doLoop = handles.length === expectedTabsCount - 1 && remainingRetries > 0;
      if (doLoop) {
        // sleep only if you know that a loop will occur
        // sleep a little bit so that we don't pound the webdriver every few ms
        await browser.sleep(SLEEP_IN_MILLIS);
      }
    } while (doLoop);
    // Check if the number expected tabs is correct, otherwise do not bother to continue
    expect(
      handles.length,
      'Expected the number of open tabs, to be '
    ).to.be.equal(expectedTabsCount);

    // Now that the expected tabs count is correct, switch to that new tab (should be the last tab)
    try {
      await browser.switchTo().window(handles[expectedTabsCount - 1]);
    } catch (err) {
      console.warn('Error while browser.switchTo().window(handles[1])');
      console.warn(err);
    }

    // Wait for Angular to bootstrap
    // When redirecting to a new url from within the angular application, as it is the case of the IRiderbar Implementation,
    // Protractor may throw an exception because it does not expect that angular is not bootstrapped in the new tab.
    // So, wait until angular has bootstrapped before proceeding

    await BasePage.waitForAngularToBootStrap();

    // Wait until the title of the tab has changed, then we are very confident that everything went well
    const EC = browser.ExpectedConditions;

    try {
      await browser.wait(EC.titleIs(tabTitle), TIMEOUT);
    } catch (err) {
      console.warn('Error while browser.wait(EC.titleIs(tabTitle), TIMEOUT);');
      console.warn('wait for title to change to :' + tabTitle);
      console.warn(err);
      assert.isTrue(false, 'Wait for tab title to change to :' + tabTitle);
    }

    console.log(
      'Tab ' + tabTitle + ' loaded, testing with protractor can now proceed.'
    );
  }

  /**
   *  Wait for angular to bootstrap before continuing
   *  Background Info:
   *  When redirecting to a new url from within the angular application
   *  e.g. by clicking the login button or opening a new tab, as it is the case of the IRiderbar Implementation,
   *  Protractor may throw an exception because it does not expect that the angular application has to bootstrap again
   *  This problem may randomly occur depending on racing conditions causing tests to be flaky and throwing the error:
   *  "both angularJS testability and angular testability are undefined. This could be either because this is a non-angular page
   *  or because your test involves client-side navigation, which can interfere with Protractor's  bootstrapping.  See http://git.io/v4gXM for details"
   *
   *  Solution ; Test if angular has bootstrapped by simply checking window.getAngularTestability as it is done the source code of protractor
   *  See also source code of protractor https://github.com/angular/protractor/blob/5d29112fdea74ce4e5edb324b6243fdb07ca8229/lib/clientsidescripts.js#L215
   *  See also issue https://github.com/angular/protractor/issues/2643
   **/

  static async waitForAngularToBootStrap() {
    console.log('Waiting for Angular to load.');
    const TIMEOUT = 20000; // 20 seconds
    const SLEEP_IN_MILLIS = 250;
    const MAX_RETRIES = Math.ceil(TIMEOUT / SLEEP_IN_MILLIS); // approx a retry is 1 second

    // At this time the value of window.getAngularTestability may not be set, so we need to wait until it is set
    // or give up and thrown an error

    let remainingRetries = MAX_RETRIES;
    let angularIsPresent: any = false;
    while (!angularIsPresent && remainingRetries >= 0) {
      remainingRetries--;
      try {
        angularIsPresent = await browser.executeScript(
          'return !!window.getAngularTestability'
        );
      } catch (err) {
        console.warn('Error while executing strict');
        console.warn(err);
      }
      if (!angularIsPresent) {
        console.warn('Angular is not ready yet!');
        await browser.sleep(SLEEP_IN_MILLIS); // wait some time before asking again
      }
    }

    // Check if everything went well, otherwise dont bother to continue
    expect(angularIsPresent, 'Expected Angular to have bootstrapped').to.be
      .true;

    console.log('Angular loaded, testing with protractor can now proceed.');
  }
}
