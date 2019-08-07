import UserController from '../../controller/userController'
export default (router) => {
    router.post('/user/createUser',UserController.userAddAction)
    router.post('/user/login',UserController.userLogin)
    router.post('/user/wechatSyncLogin',UserController.wechatUserSyncLogin)
    router.get('/user/logout',UserController.userLogout)
    router.get('/user/getUserInfo',UserController.userInfo)
    router.get('/user/getUserList',UserController.userFindAction)
    router.post('/user/removeUser',UserController.userRemoveAction)
    router.post('/user/changePass',UserController.userChangePassAction)
    router.post('/user/updateUser',UserController.userUpdateAction);
    router.post('/user/updateUser',UserController.userUpdateAction);
}