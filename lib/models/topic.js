const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    topicTitle: String,
    createTime: Date,
    updateTime: Date,
    userName:String,
    userAvatar: String,
    commentNum: Number,
    praiseNum: Number,
    content:String,
    desc: String,
    categoryName: String,
    status:String,
}, { collection: 'topic' })

const Topic = mongoose.model('topic', topicSchema);

module.exports = Topic
