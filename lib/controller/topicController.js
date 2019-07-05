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
        const result = await super.addData({
            model: Topic, 
            conditions: conditions, 
            options: options
        });
        res.send(result);
    }
    /**
     * 获取文章列表
     * @returns {Function}
     */
    async topicFindAction (req, res){
        const query = req.query;
        const conditions = {
            _id: query._id
        }
        let fields = {}
        let options = {
            sort: { _id: -1 }
        }
        if(conditions.createTime) {
            conditions.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            options = {
                limit: Number(query.pageSize) || 10,
                skip: (Number(query.page) - 1) * (Number(query.pageSize) || 10)
            }
        }
        // 查看详情
        if(!query._id) {
            fields = {content: 0}
        }
        super.findData({
            model: Topic, 
            conditions: conditions, 
            fields: fields,
            options: options, 
            callback: function (result) {
                res.send(result);
            }
        })
    }
    /**
     * 删除文章
     * @returns {Function}
     */
    async topicRemoveAction  (req, res) {
        const { _id } = req.body
        const conditions = {
            '_id': {
                $in: Array.isArray(_id)?_id.map(e => {return e}):[_id]
            }
        }
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
            userName: req.body.userName
        };
        const update = {
            $set: {
                ...req.body,
                updateTime: +new Date()
            }
        }
        const result = await super.updateData({
            model: Topic, 
            conditions: conditions, 
            update: update
        })
        res.send(result)
    }

}

export default new TopicController()