/* globals module, process */

module.exports = {
  src_folders: ['src/test/browser/test.js'],
  output_folder: 'reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: true,
    server_path:
      '/Users/anguscroll/Library/Caches/Homebrew/selenium-server-standalone-3.7.0.jar',
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '/usr/local/bin/chromedriver',
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
    },

    'chrome-mac': {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'macOS 10.12',
      },
    },

    safari: {
      desiredCapabilities: {
        browserName: 'safari',
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
      },
    },
  },
};
