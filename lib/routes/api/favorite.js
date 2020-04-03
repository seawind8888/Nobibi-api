import FavoriteController from '../../controller/favoriteController'
export default (router) => {
    router.post('/favorite/favoriteAction',FavoriteController.favoriteAction)
    router.get('/favorite/getFavoriteList',FavoriteController.favoriteFindAction)
    
}