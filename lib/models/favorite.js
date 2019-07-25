const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    createTime: Date,
    updateTime: Date,
    topicId: String,
    userName: String
}, { collection: 'favorite' });

const favoriteModel = mongoose.model('favorite', favoriteSchema);

module.exports = favoriteModel