const { query, param } = require("express-validator");

const paramValidator = param('movieId')
  .notEmpty().isInt({ min: 1 });

const queryValidator = [
  query('order')
    .optional()
    .isIn(['Asc', 'Dsc'])
    .withMessage('order can either be Asc or Dsc'),
  query('sortBy')
    .optional()
    .isIn(['name', 'gender', 'height'])
    .withMessage('sortBy can either be name or gender or height'),
  query('filter')
    .optional()
    .isIn(['male', 'female', 'n/a'])
    .withMessage('filter can either be male or female or n/a')
];

module.exports = {
  paramValidator,
  queryValidator
}