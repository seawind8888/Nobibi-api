import CommentController from '../../controller/commentController'
export default (router) => {
    router.post('/comment/addComment',CommentController.commentAddAction);
    router.get('/comment/getCommentList',CommentController.commentFindAction);
    router.post('/comment/removeComment',CommentController.commentRemoveAction);
    router.patch('/comment/updateComment',CommentController.commentUpdateAction);
}