/* eslint-env node */
import {test} from 'fusion-test-utils';
import {withPage} from '../../test-utils/puppeteer-utils.js';

test('RPC failure works', async t => {
  await withPage(async page => {
    await page.goto('http://localhost:3000/rpc-error');
    const text = await page.content();
    t.ok(text.match(/Test RPC Failure/));
  });
});
