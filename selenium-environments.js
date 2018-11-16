/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* globals module */

module.exports = {
  'safari-10-1': {
    desiredCapabilities: {
      browserName: 'safari',
      version: '10.1',
    },
  },

  'safari-11': {
    desiredCapabilities: {
      browserName: 'safari',
      version: '11',
    },
  },

  'safari-12': {
    desiredCapabilities: {
      browserName: 'safari',
      version: '12',
    },
  },

  'edge-latest': {
    desiredCapabilities: {
      browserName: 'MicrosoftEdge',
      version: 'latest',
    },
  },

  'firefox-latest': {
    desiredCapabilities: {
      browserName: 'firefox',
      version: 'latest',
    },
  },

  'firefox-previous': {
    desiredCapabilities: {
      browserName: 'firefox',
      version: 'latest-1',
    },
  },

  'firefox-46': {
    desiredCapabilities: {
      browserName: 'firefox',
      version: '46',
    },
  },

  'ie-11': {
    desiredCapabilities: {
      browserName: 'internet explorer',
      version: '11',
    },
  },
};
