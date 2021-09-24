const { body } = require("express-validator");

const mcValidator = [
  body('movieId')
    .notEmpty()
    .isInt()
    .withMessage('Movie Identifier missing'),
  body('text')
    .notEmpty()
    .isLength({ max: 500 })
    .withMessage('Comment content not provided in text'),
  body('ip')
    .notEmpty()
    .isIP()
    .withMessage('IP not provided')
]

module.exports = {
  mcValidator
}