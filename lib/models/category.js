const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: String,
    createTime: Date,
    updateTime: Date,
    userName: String
}, { collection: 'category' });

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel
