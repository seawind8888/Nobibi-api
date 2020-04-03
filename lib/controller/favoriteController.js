import Favorite from '../models/favorite'
import Topic from '../models/topic'
import BaseComponent from '../prototype/baseComponent'
import {
    response
} from '../utils'

class FavoriteController extends BaseComponent {
    constructor() {
        super()
    }
    favoriteAction = async (ctx) => {
        const { topicId, type, userName } = ctx.request.body
        const conditions = {
            topicId: topicId,
            userName: userName
        }
        if(type === 'isFavorite') {
            const result = await this.addData({
                model: Favorite, 
                conditions: conditions,
                options: {
                    uniqueness: true
                }
            });
            if (result.status === 200) {
                ctx.body = {
                    status: 200,
                    message: '收藏成功'
                };
            } else {
                ctx.body = result;
                return;
            }
        } else {
            const result = await this.removeData({
                model: Favorite,
                key: 'topicId',
                value: topicId
            });
            if (result.status === 200) {
                ctx.body = {
                    status: 200,
                    message: '已取消收藏'
                };
            } else {
                ctx.body = result;
                return;
            }
        }
    }
    favoriteFindAction = async (ctx) => {
        const { userName, topicId, page, pageSize = 10 } = ctx.query
        const _conditions = {
            userName: userName,
            topicId: topicId
        }
        let options = {}
        if(page) {
            options.limit = Number(pageSize)
            options.skip= (Number(page) - 1) * (Number(pageSize))
        }
        const total = await this.countData({
            model: Favorite,
            conditions: _conditions
        })

        const result = await Favorite.find({userName: ctx.query.userName},{},{
            limit:  Number(pageSize),
            skip: (Number(page) - 1) * (Number(pageSize))
        }).populate({path: 'topicId', model: Topic, select: {content:0}}).exec();
        
        ctx.body = response({
            body: {
                total: total,
                list:result.map(e => {return e.topicId})
            }
        })
    }
}
export default new FavoriteController()