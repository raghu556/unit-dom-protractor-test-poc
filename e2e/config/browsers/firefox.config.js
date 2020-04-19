'use strict';

exports.config = firefoxConfig();

function firefoxConfig() {
  return {
    browserName: 'firefox',
    shardTestFiles: true,
    maxInstances: 6,
    requireWindowFocus: false
  };
}
