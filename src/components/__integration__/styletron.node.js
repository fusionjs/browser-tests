/* eslint-env node */
import {test} from 'fusion-test-utils';
import {withPage, instrument} from '../../test-utils/puppeteer-utils.js';

test('Styles work', async t => {
  await withPage(async page => {
    await instrument(page, 'http://localhost:3000/styletron');
    await page.waitForSelector('#styled');
    await page.waitFor(100); // wait for repaint

    const borderColor = await page.evaluate(
      'getComputedStyle(document.querySelector("#styled")).borderColor'
    );
    t.equal(borderColor, 'rgb(255, 192, 203)');
  });
});
