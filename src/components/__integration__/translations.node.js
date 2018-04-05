/* eslint-env node */
import {test} from 'fusion-test-utils';
import {
  withPage,
  instrument,
  click,
  textContentOf,
} from '../../test-utils/puppeteer-utils.js';

test('Translations renders', async t => {
  await withPage(async page => {
    await instrument(page, 'http://localhost:3000/translations');
    const text = await textContentOf(page, '#i18n');
    t.ok(text.match(/This is a translation!/));
  });
});
test('Translations renders in other languages', async t => {
  await withPage(async page => {
    await page.setExtraHTTPHeaders({'Accept-Language': 'pt-BR;q=0.9'});
    await instrument(page, 'http://localhost:3000/translations');
    const text = await textContentOf(page, '#i18n');
    t.ok(text.match(/Isto/));
  });
});
test('Translations renders after route change', async t => {
  await withPage(async page => {
    await instrument(page, 'http://localhost:3000/image');
    await click(page, 'a[href="/translations"]');
    const text = await textContentOf(page, '#i18n');
    t.ok(text.match(/This is a translation!/));
  });
});
test('Translations renders in other languages after route change', async t => {
  await withPage(async page => {
    await page.setExtraHTTPHeaders({'Accept-Language': 'pt-BR;q=0.9'});
    await instrument(page, 'http://localhost:3000/image');
    await click(page, 'a[href="/translations"]');
    const text = await textContentOf(page, '#i18n');
    t.ok(text.match(/Isto/));
  });
});
/*
test('UTF-8', async t => {
  await withPage(async page => {
    await page.setExtraHTTPHeaders({'Accept-Language': 'pt-BR;q=0.9'});
    await instrument(page, 'http://localhost:3000/translations');
    const text = await textContentOf(page, '[data-test-i18n]');
    t.equal(text, 'Isto é uma tradução!');
  });
});
*/
