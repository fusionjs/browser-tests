/* globals module */

module.exports = function(browser) {
  browser.executeAsync(gatherBrowserData(), [], testBrowserData(browser));
};

const expected = {
  typeOfSymbol: 'symbol',
  objectAssignment: {a: 1, b: 2, c: 3},
  promiseResolution: 3,
  arrayShouldInclude: true,
  arrayShouldNotInclude: false,
  arrayFind: {a: 2, b: 1},
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
