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
            userName: userName,
            createTime: +new Date(),
            updateTime: +new Date()
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
        const result = await Favorite.find({userName: ctx.query.userName}).populate({path: 'topicId', model: Topic, select: {content:0}}).exec();
        
        ctx.body = response({
            body: {
                list:result.map(e => {return e.topicId})
            }
        })
    }
}
export default new FavoriteController()