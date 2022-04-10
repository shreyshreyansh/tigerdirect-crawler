/**
 * error class to handle puppeteer configuration error
 */
module.exports = class PuppeteerConfigureError extends Error {
  statusCode = 503;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, PuppeteerConfigureError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
};
