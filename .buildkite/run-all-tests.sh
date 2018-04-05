#!/usr/bin/env bash

if [[ $1 = '' ]]
then
  # run in series due to saucelabs concurrency limits
  echo "### running tests against all browsers"

  set -x

  # run in series due to saucelabs concurrency limits
  nightwatch --config nightwatch-ci.js --env chrome-mac
  nightwatch --config nightwatch-ci.js --env chrome-windows
  nightwatch --config nightwatch-ci.js --env safari-7
  nightwatch --config nightwatch-ci.js --env safari-9
  nightwatch --config nightwatch-ci.js --env safari-11
  nightwatch --config nightwatch-ci.js --env ie-9
  nightwatch --config nightwatch-ci.js --env ie-11
  nightwatch --config nightwatch-ci.js --env edge
  nightwatch --config nightwatch-ci.js --env samsung-S3
  nightwatch --config nightwatch-ci.js --env samsung-G4
  nightwatch --config nightwatch-ci.js --env iPhone-4S
  # skipping iphone X for now as tests are taking a very long time to complete
  # nightwatch --config nightwatch-ci.js --env iPhone-X
  nightwatch --config nightwatch-ci.js --env kindleFire
else
  echo "### running tests against $1"
  nightwatch --config nightwatch-remote.js --env $1
fi