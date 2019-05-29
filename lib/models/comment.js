const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    createTime: Date,
    updateTime: Date,
    articleTitle: String,
    content:String,
    userCode:String,
    status:String
}, { collection: 'comment' });
module.exports = {
    getModel: function () {
        return _getModel();
    }
};

var _getModel = function (type, err) {
    let commentModel = mongoose.model('comment', commentSchema);
    return commentModel;

};
