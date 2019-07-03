const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    topicTitle: String,
    createTime: Date,
    updateTime: Date,
    userName:String,
    userAvatar: String,
    content:String,
    category:Array,
    status:String,
}, { collection: 'topic' })

const Topic = mongoose.model('topic', topicSchema);

module.exports = Topic
