import Comment from '../models/comment'
import Topic from '../models/topic'
import BaseComponent from '../prototype/baseComponent'

class CommentController extends BaseComponent {
    constructor() {
      super()
    }
    /**
     * 新增评论
     */
    commentAddAction = async (req, res) => {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const result = await this.addData({
            model: Comment, 
            conditions: conditions
        });
        const total = await this.countData({
            model: Comment,
            conditions: {
                topicId: req.body.topicId
            }
        })
        this.updateTopicCommentNum({
            topicId: req.body.topicId,
            num: total
        })
        res.send(result);
    }
    /**
     * 获取评论列表
     */
    commentFindAction = async (req, res) => {
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
        const result = await this.findData({
            model: Comment,
            conditions: conditions,
            options: options
        });
        res.send(result);
    }
      /**
     *  删除评论
     */
    commentRemoveAction = async (req, res) => {
        const result = await this.removeData({
            model: Comment,
            value: req.body._id
        })
        res.send(result)
        
    }
      /**
     *  更新评论
     */
    commentUpdateAction = async (req, res) => {
        const conditions = {
            _id: req.body._id
        };
        const update = {
            $set: {
                ...req.body
            }
        }
        const result = await this.updateData({
            model: Comment, 
            conditions: conditions, 
            update: update
        })
        res.send(result)
    }
      /**
     *  更新话题评论数
     */
    updateTopicCommentNum = async ({topicId='',num = 0}) => {
        await this.updateData({
            model: Topic, 
            conditions: {
               _id: topicId
            }, 
            update: {
                $set: {
                    commentNum: num,
                    updateTime: +new Date()
                }
            },
            options: {new: true}
        })
    }
}

export default new CommentController()