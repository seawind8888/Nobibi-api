import Praise from '../models/praise'
import Topic from '../models/topic'
import BaseComponent from '../prototype/baseComponent'


class PraiseController extends BaseComponent {
    constructor() {
        super()
        this.praiseAction = this.praiseAction.bind(this)
    }
    // 新增点赞
    async praiseAction (req, res) {
        const {topicId, userName, type} = req.body
        let praiseNum = req.body.praiseNum
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        super.findData({
            model: Praise, 
            conditions: {
                topicId: topicId,
                userName: userName
            }, 
            callback: async (result) => {
                if(type === 'up') {
                    if(!!result.data.total) {
                        res.send({
                            status: 500,
                            message: '已点赞'
                        });
                    } else {
                        delete conditions.type
                        praiseNum += 1
                        await super.addData({
                            model: Praise, 
                            conditions: conditions
                        });
                        this.updateTopicPraiseNum({
                            _id: topicId,
                            num: praiseNum
                        })
                        res.send({
                            status: 200,
                            message: '点赞成功'
                        });
                        
                    }
                } else {
                    if(!result.data.total) {
                        res.send({
                            status: 500,
                            message: '无法取消点赞'
                        });
                    } else {
                        const { userName } = req.body
                        const conditions = {
                            'userName': {
                                $in: Array.isArray(userName)?userName.map(e => {return e}):[userName]
                            }
                        }
                        await super.removeData(Praise, conditions)
                        praiseNum -= 1
                        this.updateTopicPraiseNum({
                            _id: topicId,
                            num: praiseNum
                        })
                        res.send({
                            status: 200,
                            message: '取消点赞成功'
                        })
                    }
                }
            }
        });
      
    }
    async praiseFindAction (req, res){
        const query = req.query;
        const conditions = {
            topicId: req.query.topicId
        }
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
            model: Praise, 
            options: options,
            conditions: conditions, 
            callback: function (result) {
                res.send(result);
            }
        });
    }
    async updateTopicPraiseNum({_id='',num = 0}) {
        const result = await super.updateData({
            model: Topic, 
            conditions: {
               _id: _id
            }, 
            update: {
                $set: {
                    praiseNum: num,
                    updateTime: +new Date()
                }
            },
            options: {new: true}
        })
        console.log(result)
    }
}

export default new PraiseController()