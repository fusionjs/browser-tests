#!/usr/bin/env bash

if [[ $1 = '' ]]
then
  # run in series due to saucelabs concurrency limits
  echo "### running tests against all browsers"

  set -x

  nightwatch --config nightwatch-remote.js --env chrome-mac
  nightwatch --config nightwatch-remote.js --env chrome-windows
  nightwatch --config nightwatch-remote.js --env safari-7
  nightwatch --config nightwatch-remote.js --env safari-9
  nightwatch --config nightwatch-remote.js --env safari-11
  nightwatch --config nightwatch-remote.js --env ie-9
  nightwatch --config nightwatch-remote.js --env ie-11
  nightwatch --config nightwatch-remote.js --env edge
  nightwatch --config nightwatch-remote.js --env samsung-S3 
  nightwatch --config nightwatch-remote.js --env samsung-G4
  nightwatch --config nightwatch-remote.js --env iPhone-4S
  nightwatch --config nightwatch-remote.js --env iPhone-X
  nightwatch --config nightwatch-remote.js --env kindleFire
else  
  echo "### running tests against $1"
  nightwatch --config nightwatch-remote.js --env $1
fi  
