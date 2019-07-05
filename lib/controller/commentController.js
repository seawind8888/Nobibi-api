import Comment from '../models/comment'
import BaseComponent from '../prototype/baseComponent'

class CommentController extends BaseComponent {
    constructor() {
      super()
    }
    /**
     * 新增评论
     */
    async commentAddAction (req, res) {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const result = await super.addData({
            model: Comment, 
            conditions: conditions
        });
        res.send(result);
    }
    /**
     * 获取评论列表
     */
    async commentFindAction (req, res) {
        const query = req.query;
        const conditions = {}
        let options = {}
        if(query.createTime) {
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
        super.findData({
            model: Comment,
            conditions: conditions,
            options: options,
            callback: function (result) {
                res.send(result);
            }
        });
    }
      /**
     *  删除角色
     * @returns {Function}
     */
    async commentRemoveAction (req, res) {
        const { _id } = req.body
        const conditions = {
            '_id': {
                $in: Array.isArray(_id)?_id.map(e => {return e}):[_id]
            }
        }
        const result = await super.removeData(Comment, conditions)
        res.send(result)
    }
      /**
     *  更新评论
     */
    async commentUpdateAction (req, res) {
        const conditions = {
            _id: req.body._id
        };
        const update = {
            $set: {
                ...req.body
            }
        }
        // const result = super.updateRole(conditions, update, {new: true})
        // res.send(result);
        const result = await super.updateData({
            model: Comment, 
            conditions: conditions, 
            update: update
        })
        res.send(result)
    }
}

export default new CommentController()