import Category from '../models/category'
import BaseComponent from '../prototype/baseComponent'
// import CategoryComponent from '../prototype/categoryComponent';

class CategorytController extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增分类
     */
    categoryAddAction = async (ctx) => {
        const { categoryName, userName} = ctx.request.body
        const conditions = {
            categoryName: categoryName,
            userName: userName,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const options = {
            params: {
                "categoryName": categoryName
            },
            errormessage: '分类已存在'
        }
        const result = await this.addData({
            model: Category, 
            conditions: conditions, 
            options: options
        });
        ctx.body = result;
    }
    
    /**
     * 获取分类列表
     * @returns {Function}
     */
    categoryFindAction = async (ctx) => {
        const query = ctx.query;
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
                sort: { _id: -1 },
                limit: Number(query.pageSize) || 10,
                skip: (Number(query.page) - 1) * (Number(query.pageSize) || 10)
            }
        }
        const result = await this.findData({
            model: Category, 
            conditions: conditions,
            options: options
        })
        ctx.body = result;
    }
    
    /**
     *  删除分类
     */
    categoryRemoveAction = async (ctx) => {
        const result = await this.removeData({
            model: Category,
            value: ctx.request.body._id
        })
        ctx.body = result
    }
    /**
     *  更新分类信息
     */
    categoryUpdateAction = async (ctx) =>  {
        const {_id, categoryName} = ctx.request.body
        const result = await this.updateData({
            model: Category, 
            conditions: {
                _id: _id
            }, 
            update: {
                $set: {
                    categoryName: categoryName
                }
            }
        })
        ctx.body = result
    }
}

export default new CategorytController()
