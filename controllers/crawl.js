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
exports.crawlReviews = function (req, res) {
  res.status(200).send('CRAWL REVIEWS');
};
