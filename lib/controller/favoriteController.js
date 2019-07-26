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
    favoriteAddAction = async (ctx) => {
        const { topicId, userName } = ctx.request.body
        const conditions = {
            topicId: topicId,
            userName: userName
        }
        const result = await this.addData({
            model: Favorite, 
            conditions: conditions,
            options: {
                uniqueness: true,
                errorMessage: '已经收藏过了~亲'
            }
        });
        ctx.body = result
    }
    favoriteFindAction = async (ctx) => {
        const { userName, page, pageSize = 10 } = ctx.query
        const _conditions = {
            userName: userName
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