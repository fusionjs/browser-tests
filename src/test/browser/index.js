/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* globals module */

module.exports = {
  // This will test necessary polyfill support across browsers
  'Basic UI Test': function(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('#root', 10000)
      .assert.containsText('#root h1', 'Hello')

      // Check that the favicon plugin works
      .waitForElementPresent('link[rel="icon"]', 10000)

      .waitForElementVisible('li#image', 2000)
      .click('li#image a')
      .waitForElementVisible('img', 2000)

      .waitForElementVisible('li#split', 2000)
      .click('li#split a')
      .waitForElementVisible('div#split-example', 2000)
      .assert.containsText('div#split-example', 'split-example')
      .waitForElementVisible('div#split-deferred', 2000)
      .assert.containsText('div#split-deferred', 'split-deferred')

      .waitForElementVisible('li#custom-fonts', 2000)
      .click('li#custom-fonts a')
      .waitForElementVisible('div#fancy-link-2', 2000)
      .expect.element('div#fancy-link-2')
      .to.have.css('font-family')
      .which.contains('lato');
    browser

      .waitForElementVisible('li#translations', 2000)
      .click('li#translations a')
      .waitForElementVisible('li#doge-translation', 2000)
      .assert.containsText('li#doge-translation', 'doge')
      .pause(1000)
      .end();
  },

  'Chunk Loading': function(browser) {
    browser
      .url('http://localhost:3000/split')
      .waitForElementVisible('div', 2000)
      .waitForElementVisible('div#split-example', 2000)
      .assert.containsText('div#split-example', 'split-example')
      .waitForElementVisible('div#split-deferred', 2000)
      .assert.containsText('div#split-deferred', 'split-deferred')
      .end();
  },

  'Polyfill Testing': function(browser) {
    // For reasons unknown. Nightmare overrides polyfills in execute functions.
    // So we need to insert polyfill results in the DOM
    // See /components/polyfill-tests.js
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
      .waitForElementVisible('#weakMap', 10000)
      .assert.containsText('#weakMap', 'weakMap: true')
      .waitForElementVisible('#set', 10000)
      .assert.containsText('#set', 'set: true')
      .waitForElementVisible('#promise', 10000)
      .assert.containsText('#promise', 'promise: true')
      .end();
  },

  // TODO(#19)
  // This reports pass/fail to saucelabs but is flakey and slow
  // Can probably live without it since Travis will correctly report success/fail

  // teardown: require('./report-result')(),
};
