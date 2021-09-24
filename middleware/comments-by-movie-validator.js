const { param } = require("express-validator");

const paramValidator = param('movieId')
  .notEmpty().isInt({ min: 1 });

module.exports = paramValidator