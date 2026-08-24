import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new', args: ['--hide-scrollbars', '--force-device-scale-factor=1']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errs = [], fails = [];
page.on('pageerror', e => errs.push(e.message));
page.on('response', r => { if (r.status() >= 400) fails.push(r.status() + ' ' + r.url()); });
await page.goto('https://meghamittal0920.github.io/solo-leveling-/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise(r => setTimeout(r, 9000));
await page.screenshot({ path: '../_raw/live-1.png' });
const mo = await page.evaluate(() => document.querySelector('.monarch').offsetTop);
await page.evaluate(y => window.scrollTo(0, y + 1400), mo);
await new Promise(r => setTimeout(r, 4000));
await page.screenshot({ path: '../_raw/live-2.png' });
console.log('title:', await page.title());
console.log(errs.length ? 'JS ERRORS: ' + errs.join(' | ') : 'no js errors');
console.log(fails.length ? 'FAILED: ' + fails.join(' | ') : 'no failed requests');
await browser.close();
