/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* globals module */

const DEFAULT_TIMEOUT = 8000;
module.exports = {
  // This will test necessary polyfill support across browsers
  'Basic UI Test': function(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('#root', DEFAULT_TIMEOUT)
      .assert.containsText('#root h1', 'Hello')

      // Check that the favicon plugin works
      .waitForElementPresent('link[rel="icon"]', DEFAULT_TIMEOUT)

      .waitForElementVisible('li#image', DEFAULT_TIMEOUT)
      .click('li#image a')
      .waitForElementVisible('img', DEFAULT_TIMEOUT)

      .waitForElementVisible('li#split', DEFAULT_TIMEOUT)
      .click('li#split a')
      .waitForElementVisible('div#split-example', DEFAULT_TIMEOUT)
      .assert.containsText('div#split-example', 'split-example')
      .waitForElementVisible('div#split-deferred', DEFAULT_TIMEOUT)
      .assert.containsText('div#split-deferred', 'split-deferred')

      .waitForElementVisible('li#custom-fonts', DEFAULT_TIMEOUT)
      .click('li#custom-fonts a')
      .waitForElementVisible('div#fancy-link-2', DEFAULT_TIMEOUT)
      .expect.element('div#fancy-link-2')
      .to.have.css('font-family')
      .which.contains('lato');
    browser

      .waitForElementVisible('li#translations', DEFAULT_TIMEOUT)
      .click('li#translations a')
      .waitForElementVisible('li#doge-translation', DEFAULT_TIMEOUT)
      .assert.containsText('li#doge-translation', 'doge')
      .end();
  },

  'Chunk Loading': function(browser) {
    browser
      .url('http://localhost:3000/split')
      .waitForElementVisible('div', DEFAULT_TIMEOUT)
      .waitForElementVisible('div#split-example', DEFAULT_TIMEOUT)
      .assert.containsText('div#split-example', 'split-example')
      .waitForElementVisible('div#split-deferred', DEFAULT_TIMEOUT)
      .assert.containsText('div#split-deferred', 'split-deferred')
      .end();
  },

  'Polyfill Testing': function(browser) {
    // For reasons unknown. Nightmare overrides polyfills in execute functions.
    // So we need to insert polyfill results in the DOM
    // See /components/polyfill-tests.js
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('#root', DEFAULT_TIMEOUT)
      .click('#polyfills a')
      .waitForElementVisible('#polyfills-root', DEFAULT_TIMEOUT)
      .waitForElementVisible('#symbol', DEFAULT_TIMEOUT)
      .assert.containsText('#symbol', 'symbol: true')
      .waitForElementVisible('#assign', DEFAULT_TIMEOUT)
      .assert.containsText('#assign', 'assign: true')
      .waitForElementVisible('#arrayinclude', DEFAULT_TIMEOUT)
      .assert.containsText('#arrayinclude', 'array.include: true')
      .waitForElementVisible('#arrayfind', DEFAULT_TIMEOUT)
      .assert.containsText('#arrayfind', 'array.find: true')
      .waitForElementVisible('#map', DEFAULT_TIMEOUT)
      .assert.containsText('#map', 'map: true')
      .waitForElementVisible('#weakMap', DEFAULT_TIMEOUT)
      .assert.containsText('#weakMap', 'weakMap: true')
      .waitForElementVisible('#set', DEFAULT_TIMEOUT)
      .assert.containsText('#set', 'set: true')
      .waitForElementVisible('#promise', DEFAULT_TIMEOUT)
      .assert.containsText('#promise', 'promise: true')
      .end();
  },

  // TODO(#19)
  // This reports pass/fail to saucelabs but is flakey and slow
  // Can probably live without it since Travis will correctly report success/fail

  // teardown: require('./report-result')(),
};
