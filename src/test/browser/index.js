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
      .getLogTypes(function(result) {
        console.log('Log Types', result);
      })
      .getLog('browser', function(result) {
        console.log('Browser Logs', result);
      })
      // Check that the favicon plugin works
      .waitForElementPresent('link[rel="icon"]', 10000)

      .waitForElementVisible('li#image', 2000)
      .click('li#image a')
      .waitForElementVisible('img', 2000)
      .pause(1000)

      .waitForElementVisible('li#split-deferred', 2000)
      .click('li#split-deferred a')
      .waitForElementVisible('div#split-example', 2000)
      .assert.containsText('div#split-example', 'This should be async loaded')
      .pause(1000)

      .waitForElementVisible('li#custom-fonts', 2000)
      .click('li#custom-fonts a')
      .waitForElementVisible('div#fancy-link-2', 2000)
      .expect.element('div#fancy-link-2')
      .to.have.css('font-family')
      .which.contains('lato');
    browser

      .waitForElementVisible('li#translations', 2000)
      .click('li#translations a')
      .waitForElementVisible('#i18n-hoc-interpolation', 2000)
      .assert.containsText('#i18n-hoc-interpolation', 'doge')
      .end();
  },

  'Chunk Loading': function(browser) {
    browser
      .url('http://localhost:3000/split-deferred')
      .waitForElementVisible('div#split-example', 2000)
      .assert.containsText('div#split-example', 'This should be async loaded')
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

  'I18n Testing': function(browser) {
    browser
      .url('http://localhost:3000/translations')
      .waitForElementVisible('#i18n', 10000)
      .assert.containsText('#i18n', 'This is a translation!')
      .waitForElementVisible('#i18n-hoc', 10000)
      .assert.containsText('#i18n-hoc', 'This is raw')
      .waitForElementVisible('#i18n-hoc-interpolation', 10000)
      .assert.containsText(
        '#i18n-hoc-interpolation',
        'This is interpolated doge'
      )
      .end();
  },

  'assetUrl Testing': function(browser) {
    browser
      .url('http://localhost:3000/image')
      .waitForElementVisible('#img', 10000)
      .assert.attributeContains('#img', 'src', '.png')
      .end();
  },

  'CSRF Protection Testing': function(browser) {
    browser
      .url('http://localhost:3000/csrf-token')
      .waitForElementVisible('#csrf', 10000)
      .assert.containsText('#csrf', '200')
      .end();
  },

  'reduxRPC Testing': function(browser) {
    browser
      .url('http://localhost:3000/redux-rpc')
      .waitForElementVisible('#increment', 10000)
      .click('#increment')
      .pause(500)
      .assert.containsText('#count', '1')
      .end();
  },

  // TODO(#19)
  // This reports pass/fail to saucelabs but is flakey and slow
  // Can probably live without it since Travis will correctly report success/fail

  // teardown: require('./report-result')(),
};
