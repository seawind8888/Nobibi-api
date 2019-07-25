import FavoriteController from '../../controller/FavoriteController'
export default (router) => {
    router.post('/favorite/createFavorite',FavoriteController.favoriteAddAction)
    router.get('/favorite/getFavoriteList',FavoriteController.favoriteFindAction)
    
}