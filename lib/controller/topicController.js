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
    topicAddAction = async (req, res) => {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const options = {
            uniqueness: false
        }
        const result = await this.addData({
            model: Topic, 
            conditions: conditions, 
            options: options
        });
        res.send(result);
    }
    /**
     * 获取文章列表
     */
    topicFindAction = async (req, res) => {
        const {_id, page, pageSize, categoryName} = req.query
        const conditions = {
            _id: _id,
            categoryName: categoryName
        }
        let fields = {}
        let options = {
            sort: { _id: -1 }
        }
        // time filter
        if(conditions.createTime) {
            conditions.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        // 分页
        if(page) {
            options = {
                limit: Number(pageSize) || 10,
                skip: (Number(page) - 1) * (Number(pageSize) || 10)
            }
        }
        // detail
        if(!_id) {
            fields = {content: 0}
        }
        const result = await this.findData({
            model: Topic, 
            conditions: conditions, 
            fields: fields,
            options: options, 
        })
        res.send(result);
    }
    /**
     * 删除文章
     * @returns {Function}
     */
    topicRemoveAction = async (req, res) => {
        const result = await this.removeData({
            model: Topic,
            value:req.body._id
        })
        res.send(result)
    }
    /**
     * 更新文章信息
     * @returns {Function}
     */
    topicUpdateAction = async (req, res) => {
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
        const result = await this.updateData({
            model: Topic, 
            conditions: conditions, 
            update: update
        })
        res.send(result)
    }

}

export default new TopicController()