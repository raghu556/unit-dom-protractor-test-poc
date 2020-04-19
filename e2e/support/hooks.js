/* jshint node: true */
"use strict";

const { browser} = require("protractor");
const {
  BeforeAll,
  setDefaultTimeout
} = require("cucumber");

BeforeAll({ timeout: 60 * 1000 }, function(callback) {
  // use ./index.html when using a baseURL that has a path. See https://github.com/angular/protractor/issues/2502
  // See also https://github.com/angular/protractor/issues/2008 for some more insights
  browser.get("./index.html").then(() => {
    callback();
  });
});

setDefaultTimeout(200000);


