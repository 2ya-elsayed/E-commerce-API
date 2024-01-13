const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddlware');

module.exports = {
  all: function (req, res) {
    res.send('All todos');
  },
  viewOne: function (req, res) {
    console.log('Viewing ' + req.params.id);
  },
  create: function (req, res) {
    console.log('Todo created');
  },
  destroy: function (req, res) {
    console.log('Todo deleted');
  },
  edit: function (req, res) {
    console.log('Todo ' + req.params.id + ' updated');
  }
};

// exports.getCategoryValidator = [
//   check('id').isMongoId().withMessage('Invalid category id format'),
//   validatorMiddleware,
// ];

// exports.createCategoryValidator = [
//   check('name')
//     .notEmpty()
//     .withMessage('Category required')
//     .isLength({ min: 3 })
//     .withMessage('Too short category name')
//     .isLength({ max: 32 })
//     .withMessage('Too long category name'),
//   validatorMiddleware,
// ];

// exports.updateCategoryValidator = [
//   check('id').isMongoId().withMessage('Invalid category id format'),
//   validatorMiddleware,
// ];

// exports.deleteCategoryValidator = [
//   check('id').isMongoId().withMessage('Invalid category id format'),
//   validatorMiddleware,
// ];
