/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* globals module */

module.exports = {
  'chrome-mac': {
    desiredCapabilities: {
      browserName: 'chrome',
      platform: 'macOS 10.12',
      extendedDebugging: true,
    },
  },

  'chrome-windows': {
    desiredCapabilities: {
      browserName: 'chrome',
      platform: 'Windows 10',
    },
  },

  'safari-11': {
    desiredCapabilities: {
      browserName: 'safari',
      platform: 'macOS 10.12',
      version: '11.0',
    },
  },

  'safari-9': {
    desiredCapabilities: {
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '9.0',
    },
  },

  'safari-12': {
    desiredCapabilities: {
      browserName: 'safari',
      platform: 'OS X 10.13',
      version: '12.0',
      extendedDebugging: true,
    },
  },

  'ie-11': {
    desiredCapabilities: {
      browserName: 'internet explorer',
      platform: 'Windows 10',
      version: '11.103',
    },
  },

  'ie-9': {
    desiredCapabilities: {
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9.0',
    },
  },

  'firefox-13': {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '13.0',
  },

  edge: {
    desiredCapabilities: {
      browserName: 'MicrosoftEdge',
    },
  },

  'samsung-S3': {
    desiredCapabilities: {
      browserName: 'Android',
      deviceName: 'Samsung Galaxy S3 Emulator',
      deviceOrientation: 'portrait',
    },
  },

  'samsung-G4': {
    desiredCapabilities: {
      browserName: 'Android',
      deviceName: 'Samsung Galaxy S4 GoogleAPI Emulator',
      deviceOrientation: 'portrait',
    },
  },

  'iPhone-5C': {
    desiredCapabilities: {
      browserName: 'Safari',
      deviceName: 'iPhone 5C Simulator',
      deviceOrientation: 'portrait',
      platformVersion: '9.1',
      platformName: 'iOS',
    },
  },

  'iPhone-X': {
    desiredCapabilities: {
      browserName: 'Safari',
      deviceName: 'iPhone X Simulator',
      deviceOrientation: 'portrait',
      platformVersion: '11.0',
      platformName: 'iOS',
    },
  },

  kindleFire: {
    desiredCapabilities: {
      browserName: 'Browser',
      deviceName: 'Amazon Kindle Fire HD 8.9 GoogleAPI Emulator',
      deviceOrientation: 'portrait',
      platformVersion: '4.4',
      platformName: 'Android',
    },
  },
};
