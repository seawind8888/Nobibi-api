const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    createTime: Date,
    updateTime: Date,
    topicCode: String,
    topicTitle: String,
    supNum: Number,
    noSupNum: Number,
    content: String,
    userCode:String,
    status:String
}, { collection: 'comment' });

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel