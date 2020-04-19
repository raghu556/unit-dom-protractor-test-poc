/* jshint node: true */
"use strict";

const fs = require("fs");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const reporter = require("cucumber-html-reporter");
const htmlReportsDirectory = `${process.cwd()}/e2e/reports/html`;
const intermediateJsonFilesDirectory = `${process.cwd()}/e2e/reports/json`;
const combinedJsonDirectory = `${process.cwd()}/e2e/reports/combinedJSON`;
const combinedJsonFile = `${combinedJsonDirectory}/cucumber_report.json`;

const cucumberReporterOptions = {
  theme: "bootstrap",
  jsonFile: combinedJsonFile,
  output: `${htmlReportsDirectory}/cucumber_reporter.html`,
  reportSuiteAsScenarios: true,
  launchReport: false
};

/**
 *  The ReporterSupport is working synchronously
 */
class ReporterSupport {

  /**
   * Delete any old files and create the folder structure
   */
  static initialiseDirectories() {
    console.info("Initialise the HTML Reports Directory");
    ReporterSupport.cleanDirectory(htmlReportsDirectory);

    console.info("Initialise the combined Json Directory Directory");
    ReporterSupport.cleanDirectory(combinedJsonDirectory);

    console.info("Initialise the Cucumber Intermediate Json Files Directory:" + intermediateJsonFilesDirectory);
    ReporterSupport.cleanDirectory(intermediateJsonFilesDirectory);
  }

  static cleanDirectory(directory){
    if (fs.existsSync(directory)) {
      rimraf.sync(directory);
    }
    mkdirp.sync(directory);
  }

  /**
   * Consolidate all json report files generated for each feature into a single file and generate a HTML report using the cucumber-html-reporter library
   * This method runs synchronously and should be called after all feature files have been completed and all json report files have been generated
   */
  static generateReport() {
    let data = [];
    console.info("Processing Json Report Files");
    let files = fs.readdirSync(intermediateJsonFilesDirectory);
    for (let i in files) {
      let f = `${intermediateJsonFilesDirectory}/${files[i]}`;
      console.log(`Processing file ${f}`);
      try {
        let fileContent = fs.readFileSync(f, 'utf-8');
        data.push(JSON.parse(fileContent)[0]);
      }catch (err) {
        if (err) {
          console.error(`Failed to process file ${f}`);
          console.error(err);
        }
      }
    }

    console.info("Writing consolidated json file");
    try {
      fs.writeFileSync('./e2e/reports/combinedJSON/cucumber_report.json', JSON.stringify(data));
    } catch (err) {
      if (err) {
        console.error("Failed to generate the consolidated json file.");
        console.error(err);
        throw  err;
      }
    }

    console.info("Generating Final HTML Report");
    try {
      reporter.generate(cucumberReporterOptions);
    } catch (err) {
      if (err) {
        console.error("Failed to generate the final html report");
        console.error(err);
        throw  err;
      }
    }
  }
}

module.exports = ReporterSupport;
