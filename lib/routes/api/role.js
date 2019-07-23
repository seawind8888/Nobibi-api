import RoleController from '../../controller/roleController'
export default (router) => {
    router.post('/role/createRole',RoleController.roleAddAction);
    router.get('/role/getRoleList',RoleController.roleFindAction);
    router.post('/role/removeRole',RoleController.roleRemoveAction);
    router.patch('/role/updateRole',RoleController.roleUpdateAction);
    
}