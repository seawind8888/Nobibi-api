import Topic from '../models/topic'
import BaseComponent from '../prototype/baseComponent'
// import TopicComponent from '../prototype/TopicComponent';

class TopicController extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增文章
     * @returns {Function}
     */
    async topicAddAction (req, res) {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const options = {
            uniqueness: false
        }
        super.addData(Topic, conditions, options, (result) => {
            res.send(result)
        });
        // super.addTopic(topic, options, function (result) {
        //     // 添加文章与分类 关联关系
        //     res.send(result);
        // });
        
    }
    /**
     * 获取文章列表
     * @returns {Function}
     */
    async topicFindAction (req, res){
        const query = req.query;
        let options = {}
        const conditions = {params: {}}
        if(query.createTime) {
            
            conditions.params.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            delete conditions.params.page
            delete conditions.params.pageSize
            options = {
                sort: { _id: -1 },
                limit: Number(query.pageSize) || 10,
                skip: (Number(query.page) - 1) * (Number(query.pageSize) || 10)
            }
        }

        super.findData(Topic, conditions, {}, options, function (result) {
            res.send(result);
        });
    }
    /**
     * 删除文章
     * @returns {Function}
     */
    async topicRemoveAction  (req, res) {
        const conditions = req.body;
        const result = await super.removeData(Topic, conditions)
        res.send(result)
    }
    /**
     * 更新文章信息
     * @returns {Function}
     */
    async topicUpdateAction (req, res) {
        const conditions = {
            _id: req.body._id,
            userCode: req.body.userCode
        };
        const update = {
            $set: {
                ...req.body,
                updateTime: +new Date()
            }
        }
        const options = {}
        const result = await super.updateData(Topic, conditions, update, options)
        res.send(result)
    }

}

export default new TopicController()