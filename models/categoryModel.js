const mongoose = require("mongoose");
// 1- create schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Category required'],
        unique: [true , 'Category must be unique'],
        minlength: [3, 'Too short name'],
        maxlength: [32 , 'Too long name']
    },
    // A and B => shoping.com/a-and-b
    slug:{
        type: String,
        lowercase: true
    },
    image: String
}, {timestamps: true});

// 2- create model
const CategoryModel = mongoose.model("Category" , categorySchema);

module.exports = CategoryModel;