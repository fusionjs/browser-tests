# browser-tests

CI and adhoc testing for cross browser API support using nightwatch, selenium and saucelabs

## Travis CI

Runs simple UI test over core libraries and plugins across all configured environments

## Running Ad hoc tests remotely using sauce labs

1. Start the app server\
`npm run dev`

1. Start sauce connect\
`sc -u <saucelabs username> -k <saucelabs access key>`

1. Run the tests remotely passing environment\
`npm run test-remote -- --env ie-11`

## Running Ad hoc tests over local environment

1. Start the app server\
`npm run dev`

1. Run the tests\
`npm run test-local`

## Tests

### Basic UI Test
Runs simple UI over core fusion libraries and plugins. In theory should be sufficient to verify necessary API/polyfill support, though we should add more UI interactions to improve confidence level.

### Polyfills Test
Off by default. Tests for a selection of ES2015+ utils which are not transpiled by Babel at buildtime. Tested utils are somewhat arbitary as not all are necessarily required by fusion, so only uncomment if you want to test for specific API/polyfill support.


## Configuration
* Travis: `nightwatch-ci.js`
* Ad Hoc (remote): `nightwatch-remote.js`
* Ad Hoc (local): `nightwatch.js`

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




