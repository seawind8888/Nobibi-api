const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({

    roleName: String,
    permission: Array,
    createTime:Date,
    updateTime:Date,  
}, { collection: 'role' })

const Role = mongoose.model('role', menuSchema);

module.exports = Role