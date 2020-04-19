/* jshint node: true */
'use strict';

exports.config = chromeConfig();

function chromeConfig() {
  return {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // '--headless',
        '--disable-gpu',
        '--disable-software-rasterizer', '--window-size=1600x1000', '--mute-audio'
      ],
      prefs: {
        'credentials_enable_service': false,
        'profile': {
          'password_manager_enabled': false
        }
      }
    },
    shardTestFiles: true,
    // Setting the maxInstances to a high value may cause tests to fail as the system cannot handle the load and will delay test executing beyond timeout thresholds.
    // Setting this to a very low value will cause the test to run slower
    // On my dev laptop with 16 GB RAM 4 cores T450 lenovo here are some results:
    // 8 Instances -> 1 Test failed completely | 9,5 minutes duration
    // 6 Instances -> 11 minutes duration
    // 4 Instances -> 12.5 minutes duration
    // 10,96001667	Minutes	6
    // 12,77025	Minutes	4
    maxInstances: 10, // choose a number that suits your system. For our Jenkins a value of 8 - 10 is optimal
    requireWindowFocus: false
  };
}
