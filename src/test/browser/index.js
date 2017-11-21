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

  'Polyfill Testing': function(browser) {
    // For reasons unknown. Nightmare overrides polyfills in execute functions.
    // So we need to insert polyfill reuslts in the DOM
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('#root', 10000)
      .click('#polyfills a')
      .waitForElementVisible('#polyfills-root', 10000)
      .waitForElementVisible('#symbol', 10000)
      .assert.containsText('#symbol', 'symbol: true')
      .waitForElementVisible('#assign', 10000)
      .assert.containsText('#assign', 'assign: true')
      .waitForElementVisible('#arrayinclude', 10000)
      .assert.containsText('#arrayinclude', 'array.include: true')
      .waitForElementVisible('#arrayfind', 10000)
      .assert.containsText('#arrayfind', 'array.find: true')
      .waitForElementVisible('#map', 10000)
      .assert.containsText('#map', 'map: true')
      .waitForElementVisible('#promise', 10000)
      .assert.containsText('#promise', 'promise: true')
      .end();
  },

  // TODO(#19)
  // This reports pass/fail to saucelabs but is flakey and slow
  // Can probably live without it since Travis will correctly report success/fail

  // teardown: require('./report-result')(),
};
