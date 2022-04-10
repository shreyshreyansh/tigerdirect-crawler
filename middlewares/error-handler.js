const BadRequestError = require('../errors/bad-request-error');
const PuppeteerConfigureError = require('../errors/puppeteer-configure-error');

const errorHandler = (err, req, res, next) => {
  console.error('Error Handling Middleware called', err);

  if (
    err instanceof BadRequestError ||
    err instanceof PuppeteerConfigureError
  ) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // some generic error
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};

module.exports = errorHandler;
