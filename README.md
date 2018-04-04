# browser-tests

[![Build status](https://badge.buildkite.com/97cbb370d16a1aa622bc2d8c3475b887475be2710f0370fab9.svg?branch=master)](https://buildkite.com/uberopensource/browser-tests)

CI and adhoc testing for cross browser API support using nightwatch, selenium and saucelabs

## Cross-browser testing using Buildkite CI

After each push Buildkite runs cross-browser UI tests over core libraries and plugins

## Running Ad hoc chrome and firefox tests locally

In Chrome
`yarn test-chrome`
In Firefox
`yarn test-firefox`

## Running Ad hoc cross-browser tests remotely

1. Add SAUCE\_USERNAME and SAUCE\_ACCESS_KEY as environment variables. See Angus if you don't have these.

2. `docker-compose build` (this copies repo environment to docker)

3. `docker-compose run browser-tests yarn test` (run tests for all environments)
`docker-compose run browser-tests yarn test --ie9` (run tests for one environment)

## The Tests

### Basic UI Test
Runs simple UI over core fusion libraries and plugins. In theory should be sufficient to verify necessary API/polyfill support, though we should add more UI interactions to improve confidence level.

### Polyfills Test
Off by default. Tests for a selection of ES2015+ utils which are not transpiled by Babel at buildtime. Tested utils are somewhat arbitary as not all are necessarily required by fusion, so only uncomment if you want to test for specific API/polyfill support.


## Nightwatch Configuration files
* Buildkite: `nightwatch-ci.js`
* Ad Hoc (local): `nightwatch.js`
* Ad Hoc (remote): `nightwatch-remote.js`

**Test folder / file**\
`src_folders: ['src/test/browser/index.js'],`

**Test environments**\
e.g.
```js
'chrome-mac': {
  desiredCapabilities: {
    browserName: 'chrome',
    platform: 'macOS 10.12',
  },
},
```

To add additional test environments see https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
