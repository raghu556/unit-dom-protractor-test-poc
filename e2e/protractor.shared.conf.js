/* jshint node: true */
"use strict";

// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const ReporterSupport = require('./support/reporter');

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: getFeatureFiles(),
  cucumberOpts: {
    compiler: ['ts:ts-node/register'],
    require: ['./**/*.e2e-spec.ts', './support/*.js'],
    strict: true,
    format: 'json:./e2e/reports/json/cucumber_report.json',
    dryRun: false,
    tags: ["~@ignore"],
    keepAlive: false,
    ignoreUncaughtExceptions: true
  },
  beforeLaunch: function (){
    // Before starting any tests make sure the old folders are deleted and required folders are created
    console.time("Duration of Headless");
    ReporterSupport.initialiseDirectories();
  },
  afterLaunch: function (){
    // Process the intermediate Json report files after ALL features files have been completed and generate the HTML report
    ReporterSupport.generateReport();
    console.timeEnd("Duration of Headless");
  },
  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.manage().window().maximize();
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);
  },
  onComplete: function () {
  },
  allScriptsTimeout: 60000,
  disableChecks: true,
  useAllAngular2AppRoots: true
};

function getFeatureFiles() {
  const featureArgs = argv.features || process.env['features'] || '';

  if (featureArgs && featureArgs.trim().length > 0) {
    return featureArgs.split(',').map(feature => `${process.cwd()}/e2e/features/${feature}.feature`);
  } else {
    return [`${process.cwd()}/e2e/features/*.feature`];
  }
}
