'use strict';
const config = require('./protractor.shared.conf').config;
const chrome = require('./config/browsers/chrome.config').config;
// NOTE: To run this tests the application must be running in localhost:4200.
// Use the standalone Selenium server.
config.directConnect = true;
config.capabilities = chrome;
exports.config = config;
