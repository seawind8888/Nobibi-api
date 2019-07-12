const mongoose = require('mongoose');

const praiseSchema = mongoose.Schema({
    createTime: Date,
    updateTime: Date,
    praiseNum: Number,
    topicId: String,
    userName:String
}, { collection: 'praise' });

const praiseModel = mongoose.model('praise', praiseSchema);

module.exports = praiseModel