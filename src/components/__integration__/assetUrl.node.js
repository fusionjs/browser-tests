/* eslint-env node */
import {test} from 'fusion-test-utils';
import {withPage} from '../../test-utils/puppeteer-utils.js';

test('Image url resolves', async t => {
  await withPage(async page => {
    await page.goto('http://localhost:3000/image');
    const text = await page.content();
    const src = text.match(/src="(.+\.png)"/)[1];
    t.ok(src, 'has src');

    await page.setExtraHTTPHeaders({
      Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
    });
    await page.goto(`http://localhost:3000${src}`);
    const blob = await page.content();
    t.ok(!blob.match(/Not Found/i), 'does not error');

    await page.setExtraHTTPHeaders({
      Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
    });
    await page.goto(`http://localhost:3000/non_existent${src}`);
    const notFound = await page.content();
    t.ok(notFound.match(/Not Found/i), 'error message matches expectations');
  });
});
