/* eslint-env node */
const {run: build} = require('fusion-cli/commands/build');
const {run: start} = require('fusion-cli/commands/start');
const {run: test} = require('fusion-cli/commands/test');

run({});

async function run({dir = '.'}) {
  await build({dir});
  const server = await start({dir});
  const tester = await test({
    dir,
    env: 'node',
    testFolder: '__integration__',
    configPath: './node_modules/fusion-cli/build/jest-config.js',
  });
  tester.stop();
  server.close();
  process.exit(0);
}
