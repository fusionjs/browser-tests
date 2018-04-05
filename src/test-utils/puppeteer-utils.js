import puppeteer from 'puppeteer';

export const withPage = async cb => {
  // ensures test failures don't leave zombie processes running
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await cb(page);
  } finally {
    await page.close();
    await browser.close();
  }
};
export const instrument = async (page, url) => {
  // disables CSP in order to allow Puppeteer's selector-related APIs to work
  // use this instead of page.goto if you need to introspect the DOM
  const response = await page.goto(url, {timeout: 2000});
  const body = await page.content();

  page.setRequestInterception(true);
  page.on('request', async req => {
    if (req.url() === url) {
      const headers = {...response.headers()};
      delete headers['content-security-policy'];
      await req.respond({
        body: body,
        resultHeaders: headers,
        status: response.status(),
      });
    } else {
      req.continue();
    }
  });
  return page.goto(url);
};
export const click = async (page, selector) => {
  // ensures element exists and event handler is attached before clicking
  await page.waitForSelector(selector, {visible: true, timeout: 1000});
  await page.waitFor(100); // wait for event handler to be attached
  await page.click(selector);
};
export const textContentOf = async (page, selector) => {
  // ensures element exists and prevent errors due to closure + function stringification
  await page.waitForSelector(selector, {visible: true, timeout: 1000});
  await page.waitFor(100); // wait for child nodes to render
  return page.evaluate(
    `document.querySelector(${JSON.stringify(selector)}).textContent`
  );
};
