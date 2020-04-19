// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-sonarqube-unit-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-htmlfile-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser,
      jasmine: {
        timeoutInterval: 30000 // sets Jasmine.DEFAULT_TIMEOUT_INTERVAL
      }
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "reports/coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true
    },
    htmlReporter: {
      outputFile: "reports/unit-tests/report.html",
      // Optional
      pageTitle: "Unit Tests",
      subPageTitle: "Karma Test Results",
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: false
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: "LATEST",
      outputFile: "reports/sonarqube/report.xml",
      useBrowserName: false,
      overrideTestDescription: true,
      testPaths: ["./src"],
      testFilePattern: ".spec.ts"
    },
    reporters: ["progress", "html", "sonarqubeUnit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 90000,
    browserSocketTimeout: 70000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000,
    browsers: ["HeadlessChrome"],
    customLaunchers: {
      HeadlessChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    singleRun: true,
    restartOnFileChange: true
  });
};
