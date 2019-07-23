import UserController from '../../controller/userController'
export default (router) => {
    router.post('/user/createUser',UserController.userAddAction)
    router.post('/user/login',UserController.userLogin)
    router.get('/user/logout',UserController.userLogout)
    router.get('/user/getUserInfo',UserController.userInfo)
    router.get('/user/getUserList',UserController.userFindAction)
    router.post('/user/removeUser',UserController.userRemoveAction)
    router.post('/user/changePass',UserController.userChangePassAction)
    router.patch('/user/updateUser',UserController.userUpdateAction);
}