const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    topicTitle: String,
    createTime: Date,
    updateTime: Date,
    userName:String,
    userAvatar: String,
    praiseNum: Number,
    content:String,
    categoryName: String,
    categoryColor: String,
    status:String,
}, { collection: 'topic' })

const Topic = mongoose.model('topic', topicSchema);

module.exports = Topic
