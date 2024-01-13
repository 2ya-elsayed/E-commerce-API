const express = require('express');
// const getCategoryValidator = require('../utils/validators/categoryValidator');
const {
    createCategories,
    getCategories, 
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const router = express.Router();

router
    .route('/')
    .get(getCategories)
    .post(createCategories);

router
    .route('/:id')
    .get(categoryValidator.viewOne, getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;