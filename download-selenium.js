/* globals require */

// see https://github.com/ritz078/embed-js/blob/74b07bc74ac948ecc7ed6d328ef1b8e92be8eae1/nightwatch.conf.js
const BINPATH = './node_modules/nightwatch/bin/';
const fs = require('fs');
const seleniumDownload = require('selenium-download');

fs.stat(BINPATH + 'selenium.jar', function(err, stat) {
  if (err || !stat || stat.size < 1) {
    seleniumDownload.ensure(BINPATH, function(error) {
      if (error) {
        throw new Error(error);
      }
    });
  }
});
