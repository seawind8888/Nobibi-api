
import { response } from '../utils'
import CategoryComponent from '../prototype/categoryComponent';

class CategorytController extends CategoryComponent {
    constructor() {
        super()
    }
    /**
     * 新增分类
     * @returns {Function}
     */
    async categoryAddAction (req, res) {
        let category = {
            categoryCode: req.body.categoryCode,
            categoryName: req.body.categoryName,
            userCode: req.body.userCode,
            createTime: +new Date(),
            updateTime: +new Date(),
            desc: req.body.desc
        }
        let options = {
            params: {
                "categoryName": req.body.categoryName,
                "userCode": req.body.userCode
            },
            errormessage: '分类已存在'
        }
        const result = await super.addCategory(category, options);
        res.send(result)
    }
    
    /**
     * 获取分类列表
     * @returns {Function}
     */
    async categoryFindAction (req, res) {
        let query = req.query;
        let conditions = {}
        conditions.params = {...query}
        if(query.createTime) {
            conditions.params.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            delete conditions.params.page
            conditions.pagenation = {
                pageNo: Number(query.page),
                pageSize: Number(query.pageSize) || 10,
            }
        }
        const result = await super.findCategory(conditions);
        res.send(result)
    }
    
    /**
     *  删除分类
     * @returns {Function}
     */
    categoryRemoveAction (req, res) {
        const conditions = req.body;
        const result = super.removeCategory(conditions)
        res.send(result);
    }
    /**
     *  更新分类信息
     * @returns {Function}
     */
    async categoryUpdateAction (req, res)  {
        var conditions = {
            categoryCode: req.body.categoryCode
        };
        var update = {
            $set: {
                categoryCode: req.body.categoryCode,
                categoryName: req.body.categoryName
            }
        }
        const result = super.updateCategory(conditions, update, {new: true})
        res.send(result);
    }
}

export default new CategorytController()
