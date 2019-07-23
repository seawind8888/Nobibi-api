import PraiseController from '../../controller/praiseController'
export default (router) => {
    router.post('/praise/praiseAction',PraiseController.praiseAction);
    router.get('/praise/getPraiseInfo',PraiseController.praiseFindAction);
}