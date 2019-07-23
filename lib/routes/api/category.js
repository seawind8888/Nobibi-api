import CategorytController from '../../controller/categorytController'
export default (router) => {
    router.post('/category/createCategory',CategorytController.categoryAddAction)
    router.get('/category/getCategoryList',CategorytController.categoryFindAction)
    router.post('/category/removeCategory',CategorytController.categoryRemoveAction)
    router.patch('/category/updateCategory',CategorytController.categoryUpdateAction);
    
}