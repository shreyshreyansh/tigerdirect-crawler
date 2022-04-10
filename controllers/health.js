/**
 *
 * @param {*} req No request required
 * @param {*} res Response will be OK if server health is good
 * @description This controller is used to check if server is healthy or not
 */
exports.heathChecker = function (req, res) {
  res.status(200).send('OK');
};
