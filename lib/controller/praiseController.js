import Praise from '../models/praise'
import Topic from '../models/topic'
import BaseComponent from '../prototype/baseComponent'


class PraiseController extends BaseComponent {
    constructor() {
        super()
    }
    // 新增点赞
    praiseAction = async (req, res) => {
        const {topicId, userName, type} = req.body
        let praiseNum = req.body.praiseNum
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const result = await this.findData({
            model: Praise, 
            conditions: {
                topicId: topicId,
                userName: userName
            }, 
        });
        if(type === 'up') {
            if(!!result.data.total) {
                res.send({
                    status: 500,
                    message: '已经赞过了'
                });
            } else {
                delete conditions.type
                praiseNum += 1
                await this.addData({
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
                    message: '还没赞过'
                });
            } else {
                const { userName } = req.body
                await this.removeData({
                    model: Praise,
                    key: 'userName',
                    value: userName
                })
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
    praiseFindAction = async (req, res) =>{
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
        const result = await this.findData({
            model: Praise, 
            options: options,
            conditions: conditions
        });
        res.send(result);
    }
    updateTopicPraiseNum = async ({_id='',num = 0}) => {
        await this.updateData({
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
    }
}

export default new PraiseController()