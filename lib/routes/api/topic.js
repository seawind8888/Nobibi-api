import TopicController from '../../controller/topicController';
export default (router) => {
    router.post('/topic/createTopic',TopicController.topicAddAction)
    router.get('/topic/getTopicList',TopicController.topicFindAction)
    router.post('/topic/removeTopic',TopicController.topicRemoveAction)
    router.patch('/topic/updateTopic',TopicController.topicUpdateAction);
    
}