/* globals module, Symbol */

var expected = {
  typeOfSymbol: 'symbol',
  objectAssignment: {a: 1, b: 2, c: 3},
  promiseResolution: 3,
  arrayShouldInclude: true,
  arrayShouldNotInclude: false,
  arrayFind: {a: 2, b: 1},
};

module.exports = {
  // 'Polyfill Test': function(browser) {
  //   browser.executeAsync(gatherBrowserData(), [], testBrowserData(browser));
  // },

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

  // TODO: this reports pass/fail to saucelabs but is flakey and slow
  // Can probably live without it since Travis will correctly report success
  // teardown: reportToSauce,
};

function gatherBrowserData() {
  return function testInBrowser(done) {
    const result = {
      typeOfSymbol: typeof Symbol !== 'undefined' && typeof Symbol(),
      objectAssignment:
        typeof Object.assign === 'function' &&
          Object.assign({a: 1, b: 3}, {b: 2, c: 3}),
      arrayShouldInclude: [1, 2, 3].includes(2),
      arrayShouldNotInclude: [1, 2, 3].includes(4),
      arrayFind: [{a: 1, b: 2}, {a: 2, b: 1}, {a: 3}].find(function(e) {
        return e.a === 2;
      }),
    };
    if (typeof Promise === 'function') {
      new Promise(function(resolve) {
        resolve(3);
      }).then(function(d) {
        result.promiseResolution = d;
        done(result);
      });
    } else {
      result.promiseResolution = undefined;
      done(result);
    }
  };
}

function testBrowserData(browser) {
  return function(result) {
    var actual = result.value;
    browser.assert.equal(
      actual.typeOfSymbol,
      expected.typeOfSymbol,
      'Symbol() is a symbol'
    );
    browser.assert.deepEqual(
      actual.objectAssignment,
      expected.objectAssignment,
      'Object.assign works as expected'
    );
    browser.assert.equal(
      actual.arrayShouldInclude,
      expected.arrayShouldInclude,
      'array.includes works when element is present'
    );
    browser.assert.equal(
      actual.arrayShouldNotInclude,
      expected.arrayShouldNotInclude,
      'array.includes works when element is not present'
    );
    browser.assert.deepEqual(
      actual.arrayFind,
      expected.arrayFind,
      'array.find works as expected'
    );
    browser.assert.deepEqual(
      actual.promiseResolution,
      expected.promiseResolution,
      'Promises resolve correctly'
    );
  };
}

// TODO: this reports pass/fail to saucelabs but is flakey and slow
// Can probably live without it since Travis will correctly report success

// const https = require('https');

// function reportToSauce() {
//   const currentTest = this.client.currentTest;
//   const username = this.client.options.username;
//   const sessionId = this.client.capabilities['webdriver.remote.sessionid'];
//   const accessKey = this.client.options.accessKey;

//   if (!this.client.launch_url.match(/saucelabs/)) {
//     console.log('Not saucelabs ...');
//     return;
//   }

//   if (!username || !accessKey || !sessionId) {
//     console.log(this.client);
//     console.log('No username, accessKey or sessionId');
//     return;
//   }

//   const passed = currentTest.results.passed === currentTest.results.tests;

//   const data = JSON.stringify({
//     passed,
//   });

//   const requestPath = `/rest/v1/${username}/jobs/${sessionId}`;

//   function responseCallback(res) {
//     res.setEncoding('utf8');
//     console.log('Response: ', res.statusCode, JSON.stringify(res.headers));
//     res.on('data', function onData(chunk) {
//       console.log('BODY: ' + chunk);
//     });
//     res.on('end', function onEnd() {
//       console.info('Finished updating saucelabs');
//     });
//   }

//   try {
//     console.log('Updating saucelabs', requestPath);

//     const req = https.request(
//       {
//         hostname: 'saucelabs.com',
//         path: requestPath,
//         method: 'PUT',
//         auth: `${username}:${accessKey}`,
//         headers: {
//           'Content-Type': 'application/json',
//           'Content-Length': data.length,
//         },
//       },
//       responseCallback
//     );

//     req.on('error', function onError(e) {
//       console.log('problem with request: ' + e.message);
//     });
//     req.write(data);
//     req.end();
//   } catch (error) {
//     console.log('Error', error);
//   }
// }
