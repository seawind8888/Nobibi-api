const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    icon: String,// 菜单图标编码
    menuId: String,// 菜单编码
    menuLevel: String,// 菜单级别
    menuName: String,// 菜单名称
    platType: String,// 所属平台
    pmenuId: String,//上级菜单 传code码值
    remark: String,//菜单描述
    url: String,//菜单地址
    createTime:Date,
    updateTime:Date,  
    userCode:String,  
}, { collection: 'menu' })

const menuModel = mongoose.model('menu', menuSchema);

module.exports = menuModel