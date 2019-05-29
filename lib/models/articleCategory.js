const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const categoryArticleSchema = mongoose.Schema({
    categoryId:{type: Schema.Types.ObjectId, ref: 'category' },
    articleId:{type: Schema.Types.ObjectId, ref: 'article' }
}, { collection: 'category_article' });

const categoryArticleModel = mongoose.model('category_article', categoryArticleSchema);

module.exports = categoryArticleModel
