const puppeteer = require('puppeteer');
const BadRequestError = require('../errors/bad-request-error');
const PuppeteerConfigureError = require('../errors/puppeteer-configure-error');
const isUrl = require('../helpers/is-url');
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
exports.crawlReviews = async (req, res, next) => {
  try {
    const { url } = req.query;

    if (!isUrl(url)) {
      return next(
        new BadRequestError(
          'url is not valid or url is not from tigerdirect domain'
        )
      );
    }

    console.log('🎪');

    console.log('⏰ ~ file: crawl.js ~ Crawling reviews starting for', url);

    console.log('⏰ ~ file: crawl.js ~ Launching browser...');

    // configure a browser
    let browser;
    try {
      browser = await puppeteer.launch();
    } catch (err) {
      console.error(err);
      return next(
        new PuppeteerConfigureError('Unable to launch the puppeteer browser')
      );
    }

    console.log('✅ ~ file: crawl.js ~ Browser launch successful');

    console.log('⏰ ~ file: crawl.js ~ Opening new page...');

    // opening a new page on the browser
    let page;
    try {
      page = await browser.newPage();
    } catch (err) {
      console.error(err);
      return next(
        new PuppeteerConfigureError(
          'Unable to open a new page on the puppeteer browser'
        )
      );
    }

    console.log('✅ ~ file: crawl.js ~ New page opened');

    console.log('⏰ ~ file: crawl.js ~ URL opening...');

    // Go to https://www.tigerdirect.com/
    try {
      await page.goto(url);
    } catch (err) {
      console.error(err);
      return next(new PuppeteerConfigureError('Unable to open the url'));
    }

    console.log('✅ ~ file: crawl.js ~ URL opening successful');

    console.log('⏰ ~ file: crawl.js ~ DOM loading...');

    // wait for the required selector to load
    // await page.waitForSelector('.userGreeting');

    console.log('✅ ~ file: crawl.js ~ DOM loading successful');

    console.log('⏰ ~ file: crawl.js ~ Extracting value...');

    // extract reviews from the grabbed selector
    let value;
    try {
      value = await page.evaluate(() => {
        // get the name of the product
        const productName = document.querySelector('.pdp-info h1');

        // get the overall rating of the product
        const overallRating = document.querySelector('.score');

        // ratings of the product
        const reviewsNodeList = document.querySelectorAll(
          '#customerReviews .review'
        );
        // convert node list by querySelectorAll to array
        const reviews = Array.from(reviewsNodeList);

        return {
          productName: productName && productName.innerText,
          overallRating:
            overallRating && overallRating.innerText
              ? Number(overallRating.innerText)
              : 0,
          reviews: reviews.map((review) => {
            let commentHeading = review.querySelector(
              '.rightCol blockquote h6'
            );

            let commentMessage = review.querySelector('.rightCol blockquote p');

            let rating = review.querySelector(
              '.leftCol .itemReview .itemRating strong'
            );

            let reviewerDetailsNodeList = review.querySelectorAll(
              '.leftCol .reviewer dd'
            );
            const reviewerDetails = Array.from(reviewerDetailsNodeList);

            return {
              comment: {
                heading: commentHeading && commentHeading.innerText,
                message: commentMessage && commentMessage.innerText,
              },
              rating: rating && rating.innerText ? Number(rating.innerText) : 0,
              reviewDate:
                reviewerDetails.length >= 2 &&
                reviewerDetails[1] &&
                reviewerDetails[1].innerText,
              reviewerName:
                reviewerDetails.length >= 1 &&
                reviewerDetails[0] &&
                reviewerDetails[0].innerText,
            };
          }),
        };
      });
    } catch (err) {
      console.error(err);
      return next(new PuppeteerConfigureError('Unable to evaluate the page'));
    }

    console.log('✅ ~ file: crawl.js ~ Value extraction successful');

    console.log('⏰ ~ file: crawl.js ~ Closing browser...');

    // close the browser
    try {
      browser.close();
    } catch (err) {
      console.error(err);
      return next(new PuppeteerConfigureError('Unable to close the browser'));
    }

    console.log('✅ ~ file: crawl.js ~ Browser closing successful');

    console.log('✅ ~ file: crawl.js ~ Crawling review successful');

    console.log('🥇');

    res.status(200).send(value);
  } catch (err) {
    console.error(err);
    return next(new Error('Unable to open the url'));
  }
};
