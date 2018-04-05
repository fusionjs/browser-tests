/* globals module, process, require */

const environments = require('./selenium-environments');

const JOB_IDENTIFIER = process.env.BUILDKITE_BUILD_NUMBER;
const BINPATH = './node_modules/nightwatch/bin/';

const settings = {
  src_folders: ['src/test/browser/index.js'],
  output_folder: 'reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',
  openDevTools: true,

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
        'tunnel-identifier': JOB_IDENTIFIER,
      },
    },
  },
};

Object.assign(settings.test_settings, environments);
module.exports = settings;
