const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    phone: String,
    email: String,
    userCode: String,
    userName: String,
    identifyNo: String,
    refUserRoleCode: String,
    status: String,
    createTime: Date,
    updateTime: Date,
    password: String,
    desc: String
}, { collection: 'user' });

const User = mongoose.model('user', userSchema);

module.exports = User