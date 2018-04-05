/* eslint-env node */
import {test} from 'fusion-test-utils';
import {withPage, instrument} from '../../test-utils/puppeteer-utils.js';

test('404 works', async t => {
  await withPage(async page => {
    const response = await instrument(page, 'http://localhost:3000/404');
    const text = await page.content();

    t.equal(response.status(), 404);
    t.ok(text.match(/404/));
  });
});
