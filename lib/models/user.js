const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    phonenum: String,
    userCode: String,
    userName: String,
    identifyNo: String,
    refUserRoleCode: String,
    status: String,
    userDuty: String,
    createTime: Date,
    updateTime: Date,
    password: String,
    desc: String
}, { collection: 'user' });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel