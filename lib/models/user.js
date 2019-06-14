const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    phone: String,
    email: String,
    userCode: String,
    userName: String,
    visit: Array,
    refUserRoleCode: String,
    status: String,
    createTime: Date,
    updateTime: Date,
    password: String
}, { collection: 'user' });

const User = mongoose.model('user', userSchema);

module.exports = User