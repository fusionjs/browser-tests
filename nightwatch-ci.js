/* globals module, process */

const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;
const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
  src_folders: ['src/test/browser/test.js'],
  output_folder: 'reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: false,
    server_path: BINPATH + 'selenium.jar',
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': BINPATH + 'chromedriver',
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: {
        build: `build-${TRAVIS_JOB_NUMBER}`,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
      },
    },

    'chrome-mac': {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'macOS 10.12',
      },
    },

    'chrome-windows': {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'Windows 10',
      },
    },

    'safari-mac': {
      desiredCapabilities: {
        browserName: 'safari',
        platform: 'macOS 10.12',
      },
    },

    // not supported by sauce
    'safari-windows': {
      desiredCapabilities: {
        browserName: 'safari',
        platform: 'Windows 10',
      },
    },

    ie: {
      desiredCapabilities: {
        browserName: 'internet explorer',
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
      },
    },

    android: {
      desiredCapabilities: {
        browserName: 'Android',
        deviceName: 'Samsung Galaxy S4 GoogleAPI Emulator',
        deviceOrientation: 'portrait',
      },
    },

    iOS: {
      desiredCapabilities: {
        browserName: 'Safari',
        deviceName: 'iPhone 4s Simulator',
        deviceOrientation: 'portrait',
        platformVersion: '8.1',
        platformName: 'iOS',
      },
    },

    // caps.setCapability("appiumVersion", "1.6.4");
    // caps.setCapability("deviceName","iPhone 4s Simulator");
    // caps.setCapability("deviceOrientation", "portrait");
    // caps.setCapability("platformVersion","8.1");
    // caps.setCapability("platformName", "iOS");
    // caps.setCapability("browserName", "Safari");
  },
};
