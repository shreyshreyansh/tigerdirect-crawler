module.exports = class BadRequestError extends Error {
  statusCode = 503;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
};
