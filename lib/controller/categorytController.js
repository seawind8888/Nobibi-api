import Category from '../models/category'
import BaseComponent from '../prototype/baseComponent'
// import CategoryComponent from '../prototype/categoryComponent';

class CategorytController extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增分类
     * @returns {Function}
     */
    async categoryAddAction (req, res) {
        const conditions = {
            categoryCode: req.body.categoryCode,
            categoryName: req.body.categoryName,
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
        // const result = await super.addCategory(category, options);
        // res.send(result)
        super.addData(Category, conditions, options, function (result) {
            res.send(result);
        });
    }
    
    /**
     * 获取分类列表
     * @returns {Function}
     */
    async categoryFindAction (req, res) {
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
        super.findData({
            model: Category, 
            conditions: conditions,
            options: options, 
            callback: function (result) {
                res.send(result);
            }
        })
    }
    
    /**
     *  删除分类
     * @returns {Function}
     */
    async categoryRemoveAction (req, res) {
        const { _id } = req.body
        const conditions = {
            '_id': {
                $in: Array.isArray(_id)?_id.map(e => {return e}):[_id]
            }
        }
        const result = await super.removeData(Category, conditions)
        res.send(result)
    }
    /**
     *  更新分类信息
     * @returns {Function}
     */
    async categoryUpdateAction (req, res)  {
        const conditions = {
            _id: req.body._id
        };
        const update = {
            $set: {
                categoryCode: req.body.categoryCode,
                categoryName: req.body.categoryName
            }
        }
        // const result = await super.updateCategory(conditions, update, {new: true})
        // res.send(result);
        const result = await super.updateData(Category, conditions, update, options)
        res.send(result)
    }
}

export default new CategorytController()
