
const express = require('express');
const router = express.Router();

import UserController from '../lib/controller/userController'
import TopicController from '../lib/controller/topicController';
import MenuController from '../lib/controller/menuController'
import CategorytController from '../lib/controller/categorytController'
/**
 * 用户管理
 */
router.post('/user/createUser',UserController.userAddAction);
router.post('/user/login',UserController.userLogin);
router.get('/user/logout',UserController.userLogout);
router.get('/user/getUserInfo',UserController.userInfo);
router.get('/user/getUserList',UserController.userFindAction);
router.post('/user/removeUser',UserController.userRemoveAction);
router.patch('/user/updateUser',UserController.userUpdateAction);

/**
 * 文章管理
 */
router.post('/topic/createTopic',TopicController.topicAddAction)
router.get('/topic/getTopicList',TopicController.topicFindAction);
router.post('/topic/removeTopic',TopicController.topicRemoveAction);
router.patch('/topic/updateTopic',TopicController.topicUpdateAction);

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
router.post('/category/createCategory',CategorytController.categoryAddAction);
router.get('/category/getCategoryList',CategorytController.categoryFindAction);
router.post('/category/removeCategory',CategorytController.categoryRemoveAction);
router.patch('/category/updateCategory',CategorytController.categoryUpdateAction);

// /**
//  * 评论管理
//  */
// router.post('/comment/create',CommentController.commentAddAction);
// router.get('/comment/list',CommentController.commentFindAction);
// router.post('/comment/remove',CommentController.commentRemoveAction);
// router.patch('/comment/update',CommentController.commentUpdateAction);



module.exports = router;