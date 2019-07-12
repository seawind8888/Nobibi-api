
const express = require('express');
const router = express.Router();

import UserController from '../lib/controller/userController'
import TopicController from '../lib/controller/topicController';
import CategorytController from '../lib/controller/categorytController'
import RoleController from '../lib/controller/roleController'
import CommentController from '../lib/controller/commentController'
import PraiseController from '../lib/controller/praiseController'
/**
 * 用户管理
 */
router.post('/user/createUser',UserController.userAddAction);
router.post('/user/login',UserController.userLogin);
router.get('/user/logout',UserController.userLogout);
router.get('/user/getUserInfo',UserController.userInfo);
router.get('/user/getUserList',UserController.userFindAction);
router.post('/user/removeUser',UserController.userRemoveAction);
router.post('/user/changePass',UserController.userChangePassAction);
router.patch('/user/updateUser',UserController.userUpdateAction);

/**
 * 文章管理
 */
router.post('/topic/createTopic',TopicController.topicAddAction)
router.get('/topic/getTopicList',TopicController.topicFindAction);
router.post('/topic/removeTopic',TopicController.topicRemoveAction);
router.patch('/topic/updateTopic',TopicController.topicUpdateAction);

/**
 * 分类管理
 */
router.post('/category/createCategory',CategorytController.categoryAddAction);
router.get('/category/getCategoryList',CategorytController.categoryFindAction);
router.post('/category/removeCategory',CategorytController.categoryRemoveAction);
router.patch('/category/updateCategory',CategorytController.categoryUpdateAction);

/**
 * 角色管理
 */
router.post('/role/createRole',RoleController.roleAddAction);
router.get('/role/getRoleList',RoleController.roleFindAction);
router.post('/role/removeRole',RoleController.roleRemoveAction);
router.patch('/role/updateRole',RoleController.roleUpdateAction);

/**
 * 评论管理
 */
router.post('/comment/addComment',CommentController.commentAddAction);
router.get('/comment/getCommentList',CommentController.commentFindAction);
router.post('/comment/removeComment',CommentController.commentRemoveAction);
router.patch('/comment/updateComment',CommentController.commentUpdateAction);

/**
 * 点赞管理
 */
router.post('/praise/praiseAction',PraiseController.praiseAction);
router.get('/praise/getPraiseInfo',PraiseController.praiseFindAction);



module.exports = router;