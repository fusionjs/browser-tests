/* eslint-env node */
import {test} from 'fusion-test-utils';
import {
  withPage,
  instrument,
  textContentOf,
} from '../../test-utils/puppeteer-utils';

test('CSRF Protection', async t => {
  await withPage(async page => {
    await instrument(page, 'http://localhost:3000/csrf-token');
    await page.waitFor(500);
    const text = await textContentOf(page, '#csrf');
    t.equal(text, 'Fetch request responded with: 200');
  });
});
