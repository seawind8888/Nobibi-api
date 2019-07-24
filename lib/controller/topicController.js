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
    topicAddAction = async (ctx) => {
        const conditions = {
            ...ctx.request.body,
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
        ctx.body = result;
    }
    /**
     * 获取文章列表
     */
    topicFindAction = async (ctx) => {
        const {_id, page = 1, pageSize = 10, categoryName, userName, hot} = ctx.query
        const conditions = {
            _id: _id,
            categoryName: categoryName,
            userName: userName
        }
        let fields = {}
        let options = {}
        if(hot) {
            options.sort = { commentNum: 1 }
            
        } else {
            options.sort = { updateTime: -1 }
        }
      
        // Time filter
        if(conditions.createTime) {
            conditions.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        // Pagenation
        if(hot || page) {
            options.limit = Number(pageSize)
            options.skip= (Number(page) - 1) * (Number(pageSize))
        }
        // Get detail
        if(!_id) {
            fields = {content: 0}
        }
     
        const result = await this.findData({
            model: Topic, 
            conditions: conditions, 
            fields: fields,
            options: options, 
        })
        ctx.body = result;
    }
    /**
     * Delete Topic
     * @returns {Function}
     */
    topicRemoveAction = async (ctx) => {
        const result = await this.removeData({
            model: Topic,
            value:ctx.request.body._id
        })
        ctx.body = result
    }
    /**
     * 更新文章信息
     * @returns {Function}
     */
    topicUpdateAction = async (ctx) => {
        const conditions = {
            _id: ctx.request.body._id,
            userName: ctx.request.body.userName
        };
        const update = {
            $set: {
                ...ctx.request.body,
                updateTime: +new Date()
            }
        }
        const result = await this.updateData({
            model: Topic, 
            conditions: conditions, 
            update: update
        })
        ctx.body = result
    }

}

export default new TopicController()