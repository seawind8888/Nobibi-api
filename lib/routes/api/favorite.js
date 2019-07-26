import FavoriteController from '../../controller/favoriteController'
export default (router) => {
    router.post('/favorite/createFavorite',FavoriteController.favoriteAddAction)
    router.get('/favorite/getFavoriteList',FavoriteController.favoriteFindAction)
    
}