const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryCode: String,
    categoryName: String,
    createTime: Date,
    userCode: String,
    updateTime: Date,
    desc: String
}, { collection: 'category' });

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel
