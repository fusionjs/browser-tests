#!/usr/bin/env bash

if [[ $1 = '' ]]
then
  # run in series due to saucelabs concurrency limits
  echo "### running tests against all browsers"

  set -ex

  nightwatch --config nightwatch-ci.js --env safari-10-3
  nightwatch --config nightwatch-ci.js --env safari-11
  nightwatch --config nightwatch-ci.js --env safari-12
  nightwatch --config nightwatch-ci.js --env edge-latest
  nightwatch --config nightwatch-ci.js --env firefox-latest
  nightwatch --config nightwatch-ci.js --env firefox-previous
  nightwatch --config nightwatch-ci.js --env firefox-46
  nightwatch --config nightwatch-ci.js --env ie-11

else
  echo "### running tests against $1"
  nightwatch --config nightwatch-ci.js --env $1
fi
