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
    categoryAddAction = async (req, res) => {
        const conditions = {
            categoryName: req.body.categoryName,
            userName: req.body.userName,
            createTime: +new Date(),
            updateTime: +new Date(),
            desc: req.body.desc
        }
        const options = {
            params: {
                "categoryName": req.body.categoryName
            },
            errormessage: '分类已存在'
        }
        const result = await this.addData({
            model: Category, 
            conditions: conditions, 
            options: options
        });
        res.send(result);
    }
    
    /**
     * 获取分类列表
     * @returns {Function}
     */
    categoryFindAction = async (req, res) => {
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
        res.send(result);
    }
    
    /**
     *  删除分类
     */
    categoryRemoveAction = async (req, res) => {
        const result = await this.removeData({
            model: Category,
            value: req.body._id
        })
        res.send(result)
    }
    /**
     *  更新分类信息
     */
    categoryUpdateAction = async (req, res) =>  {
        const {_id, categoryName} = req.body
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
        res.send(result)
    }
}

export default new CategorytController()
