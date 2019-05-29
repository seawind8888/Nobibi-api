const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    articleTitle: String,
    createTime: Date,
    updateTime: Date,
    userCode:String,
    content:String,
    abstract: String,
    tags: Array,
    category:Array,
    status:String,
}, { collection: 'article' })

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel
