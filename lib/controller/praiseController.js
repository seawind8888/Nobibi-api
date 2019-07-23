import Praise from '../models/praise'
import Topic from '../models/topic'
import BaseComponent from '../prototype/baseComponent'


class PraiseController extends BaseComponent {
    constructor() {
        super()
    }
    // 新增点赞
    praiseAction = async (ctx) => {
        const {topicId, userName, type} = ctx.request.body
        let praiseNum = await this.praiseCountAction({
            topicId: ctx.query.topicId
        })
        const conditions = {
            ...ctx.body,
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
                ctx.body = {
                    status: 500,
                    message: '已经赞过了'
                };
            } else {
                delete conditions.type
                await this.addData({
                    model: Praise, 
                    conditions: conditions
                });
                this.updateTopicPraiseNum({
                    _id: topicId,
                    num: praiseNum += 1
                })
                ctx.body = {
                    status: 200,
                    message: '点赞成功'
                };
                
            }
        } else {
            if(!result.data.total) {
                ctx.body = {
                    status: 500,
                    message: '还没赞过'
                };
            } else {
                const { userName } = ctx.request.body
                
                await this.removeData({
                    model: Praise,
                    key: 'userName',
                    value: userName
                })
                this.updateTopicPraiseNum({
                    _id: topicId,
                    num: praiseNum -= 1
                })
                
                ctx.body = {
                    status: 200,
                    message: '取消点赞成功'
                }
            }
        }
      
    }
    praiseFindAction = async (ctx) =>{
        const result = await this.praiseCountAction({
            topicId: ctx.query.topicId
        })
        ctx.body = {
            status: 200,
            data: result
        };
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
    praiseCountAction = ({topicId = ''}) => {
        return new Promise(async (resolve, reject) => {
            const result = await this.countData({
                model: Praise, 
                conditions: {
                    topicId: topicId
                }
            });
            resolve(result)
        })
    }
}

export default new PraiseController()