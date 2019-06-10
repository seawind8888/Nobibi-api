import TopicComponent from '../prototype/TopicComponent';

class TopicController extends TopicComponent {
    constructor() {
        super()
    }
    /**
     * 新增文章
     * @returns {Function}
     */
    topicAddAction (req, res) {
        let topic = {
            topicTitle: req.body.topicTitle,
            category: req.body.category,
            status: req.body.status,
            userCode: req.body.userCode,
            content: req.body.content,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        let options = {
            // 以后可以限制文章发表标题或者其他的条件 防止重复
            params: {
                _id: '2',
            },
            errormessage: '文章已存在'
        }
        super.addTopic(topic, options, function (result) {
            // 添加文章与分类 关联关系
            res.send(result);
        });
    }
    /**
     * 获取文章列表
     * @returns {Function}
     */
    async topicFindAction (req, res){
        let query = req.query;
        let conditions = {}
        conditions.params = {...query}
        if(query.createTime) {
            conditions.params.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            delete conditions.params.page
            conditions.pagenation = {
                pageNo: Number(query.page),
                pageSize: Number(query.pageSize) || 10,
            }
        }
        const result = await super.findTopic(conditions);
           
            res.send(result)
    }
    /**
     * 删除文章
     * @returns {Function}
     */
    topicRemoveAction  (req, res) {
        let conditions = req.body;
        super.removeTopic(conditions, function (result) {
            // 删除表关联
                res.send(result)
        })
    }
    /**
     * 更新文章信息
     * @returns {Function}
     */
    topicUpdateAction (req, res) {
        let conditions = {
            userCode: req.body.userCode
        };
        let update = {
            $set: {
                topicTitle: req.body.topicTitle,
                category: req.body.category,
                status: req.body.status,
                userCode: req.body.userCode,
                content: req.body.content,
                updateTime: +new Date()
            }
        }
        var options = {}

        super.updateTopic(conditions, update, options, function (result) {
            // 删除表关联
            res.send(result)
        });
    }

}

export default new TopicController()