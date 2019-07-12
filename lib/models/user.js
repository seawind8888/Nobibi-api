const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    userName: String,
    avatar: String,
    refUserRoleCode: String, //角色
    visit: Array,
    status: String,
    createTime: Date,
    updateTime: Date,
    password: String
}, { collection: 'user' });

const User = mongoose.model('user', userSchema);

module.exports = User