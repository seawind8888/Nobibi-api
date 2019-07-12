const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    createTime: Date,
    updateTime: Date,
    topicCode: String,
    topicTitle: String,
    content: String,
    userName:String,
    status:String
}, { collection: 'comment' });

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel