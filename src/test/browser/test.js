/* globals module, navigator */

module.exports = {
  'Polyfill Test': function(browser) {
    console.log('######### navigator', navigator);
    browser.assert.ok(typeof Symbol() === 'symbol', 'Symbol() is a symbol');
    browser.assert.ok(
      typeof Object.assign === 'function',
      'Object.assign is a function'
    );
    browser.assert.deepEqual(
      Object.assign({a: 1, b: 3}, {b: 2, c: 3}),
      {
        a: 1,
        b: 2,
        c: 3,
      },
      'Object.assign works as expected'
    );
    browser.assert.ok(
      [1, 2, 3].includes(2),
      'array.includes (element present)'
    );
    browser.assert.ok(
      ![1, 2, 3].includes(4),
      'array.includes (element not present)'
    );
    browser.assert.deepEqual(
      [{a: 1, b: 2}, {a: 2, b: 1}, {a: 3, b: 1}].find(function(e) {
        return e.a === 2;
      }),
      {a: 2, b: 1},
      'array.find'
    );
    new Promise(function(resolve) {
      resolve(3);
    }).then(function(data) {
      browser.assert.equal(data, 3, 'Promises');
    });
    browser.end();
  },

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
  // teardown: reportToSauce,
};

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
