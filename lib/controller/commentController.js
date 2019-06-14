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
        const options = {}
        super.addData(Comment, conditions, options, function (result) {
            res.send(result);
        });
    }
    /**
     * 获取评论列表
     */
    async commentFindAction (req, res) {
        const query = req.query;
        let options = {}
        const conditions = {}
        conditions.params = {...query}
        if(query.createTime) {
            conditions.params.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            delete conditions.params.page
            delete conditions.params.pageSize
            conditions.pagenation = {
                pageNo: Number(query.page),
                pageSize: Number(query.pageSize) || 10,
            }
        }
        super.findData(Comment, conditions, {}, options, function (result) {
            res.send(result);
        });
        // const result = await super.findRole(conditions);
        // res.send(result)
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
        const result = await super.updateData(Comment, conditions, update, options)
        res.send(result)
    }
}

export default new CommentController()