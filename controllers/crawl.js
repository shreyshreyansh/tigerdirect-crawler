const puppeteer = require('puppeteer');

/**
 * 
 * @param {*} req Link of the tigerdirect product
 * @param {*} res Return the review of the product
 * @description Returns the list of Reviews where each review is identified by :
                - Review Comment
                - Rating
                - Review Date
                - Reviewer Name
 */
exports.crawlReviews = async (req, res) => {
  console.log('⏰ ~ file: crawl.js ~ Launching browser...');

  // configure a browser
  const browser = await puppeteer.launch();

  console.log('✅ ~ file: crawl.js ~ Browser launch successful');

  console.log('⏰ ~ file: crawl.js ~ Opening new page...');

  // opening a new page on the browser
  const page = await browser.newPage();

  console.log('✅ ~ file: crawl.js ~ New page opened');

  console.log('⏰ ~ file: crawl.js ~ URL opening...');

  // Go to https://www.tigerdirect.com/
  await page.goto('https://www.tigerdirect.com/');

  console.log('✅ ~ file: crawl.js ~ URL opening successful');

  console.log('⏰ ~ file: crawl.js ~ DOM loading...');

  // wait for the required selector to load
  await page.waitForSelector('.userGreeting');

  console.log('✅ ~ file: crawl.js ~ DOM loading successful');

  console.log('⏰ ~ file: crawl.js ~ Grabbing selector...');

  // grab the selector
  let element = await page.$('.userGreeting');

  console.log('✅ ~ file: crawl.js ~ Grabbing successful');

  console.log('⏰ ~ file: crawl.js ~ Extracting value...');

  // extract value from the grabbed selector
  let value = await page.evaluate((el) => el.textContent, element);

  console.log('✅ ~ file: crawl.js ~ Value extraction successful');

  console.log('⏰ ~ file: crawl.js ~ Closing browser...');

  // close the browser
  browser.close();

  console.log('✅ ~ file: crawl.js ~ Browser closing successful');

  res.status(200).send(value);
};
