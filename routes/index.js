
const express = require('express');
const router = express.Router();

import UserController from '../lib/controller/userController'
import ArticleController from '../lib/controller/articleController';
import MenuController from '../lib/controller/menuController'
import CategorytController from '../lib/controller/categorytController'
/**
 * 用户管理
 */
router.post('/user/create',UserController.userAddAction);
router.post('/user/login',UserController.userLogin);
router.get('/user/logout',UserController.userLogout);
router.get('/user/info',UserController.userInfo);
router.get('/user/list',UserController.userFindAction);
router.post('/user/remove',UserController.userRemoveAction);
router.patch('/user/update',UserController.userUpdateAction);

/**
 * 文章管理
 */
router.post('/article/create',ArticleController.articleAddAction)
router.post('/article/list',ArticleController.articleFindAction);
router.post('/article/remove',ArticleController.articleRemoveAction);
router.post('/article/update',ArticleController.articleUpdateAction);

/**
 * 菜单管理
 */
router.post('/menu/create',MenuController.menuAddAction);
router.get('/menu/list',MenuController.menuFindAction);
router.post('/menu/remove',MenuController.menuRemoveAction);
router.post('/menu/update',MenuController.menuUpdateAction);

/**
 * 分类管理
 */
router.post('/category/create',CategorytController.categoryAddAction);
router.post('/category/list',CategorytController.categoryFindAction);
router.post('/category/remove',CategorytController.categoryRemoveAction);
router.post('/category/update',CategorytController.categoryUpdateAction);



module.exports = router;