/* globals module */

module.exports = {
  // This will test necessary polyfill support across browsers
  'Basic UI Test': function(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('#root', 10000)
      .assert.containsText('#root h1', 'Hello')
      .waitForElementVisible('li#image', 2000)
      .click('li#image a')
      .waitForElementVisible('img', 2000)
      .pause(1000)
      .end();
  },

  // Uncomment to test a range of ES 2015+ polyfills
  // This is somewhat arbitary as not all are necessarily required by fusion

  // 'Polyfill Test': function(browser) {
  //   require('./polyfills')(browser);
  // },

  // TODO: this reports pass/fail to saucelabs but is flakey and slow
  // Can probably live without it since Travis will correctly report success/fail

  // teardown: require('./report-result')(),
};
