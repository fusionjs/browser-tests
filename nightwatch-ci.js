/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* globals module, process, require */

require('@babel/register');

const environments = require('./selenium-environments');

const JOB_IDENTIFIER = process.env.BUILDKITE_JOB_ID;
const BINPATH = './node_modules/nightwatch/bin/';

const settings = {
  src_folders: ['src/test/browser/index.js'],
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
        'tunnel-identifier': JOB_IDENTIFIER,
      },
    },
  },
};

settings.test_settings = {...settings.test_settings, ...environments};
module.exports = settings;
