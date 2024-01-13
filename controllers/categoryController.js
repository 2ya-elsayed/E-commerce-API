const slugify = require('slugify');
const asyncHandler = require("express-async-handler");
const CategoryModel = require('../models/categoryModel');
const ApiError = require("../utils/apiError");

// @desc    get list of category
// @reote   GET    /api/categories
// @access  Public
exports.getCategories = asyncHandler(async(req,res)=>{
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1 )* limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({result: categories.length, page: page , data: categories});
});

// @desc    get category by ID
// @reote   GET    /api/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async(req,res, next)=>{
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if(!category){
        return next(new ApiError(`No category for id ${id} to find`, 404));
    }
    res.status(200).json({data: category});
});

// @desc    Create category
// @reote   POST    /api/categories
// @access  Private
exports.createCategories = asyncHandler(async (req, res)=>{
    const name = req.body.name;
    const category = await CategoryModel.create({
        name, 
        slug: slugify(name)
    });
    res.status(201).json({data: category});
});

// @desc    update specific category
// @reote   PUT    /api/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id} = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findOneAndUpdate(
        { _id: id }, 
        {
        name: name,
        slug: slugify(name)
        }, 
        { new: true }
        );
    if (!category) {
        return next(new ApiError(`No category for this id ${id} to update`, 404));
    }
    res.status(200).json({
        data: category
    });
});

// @desc    delete specific category
// @reote   DELETE    /api/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new ApiError(`No category for id ${id} to delete`, 404));
    }
    res.status(204).send();
});