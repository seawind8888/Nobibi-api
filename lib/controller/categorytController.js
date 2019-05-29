
const filterData = require('../utils/filterData')
import CategoryComponent from '../prototype/categoryComponent';

class CategorytController extends CategoryComponent {
    constructor() {
        super()
    }
    /**
     * 新增分类
     * @returns {Function}
     */
    categoryAddAction (req, res) {
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
            errorRespMsg: '分类已存在'
        }
        super.addCategory(category, options, function (result) {
            if (result.respCode === '000000') {
                let respMsg
                if (req.body.categoryName) {
                    respMsg = "保存成功"
                } else {
                    respMsg = "注册成功,即将登录..."
                }
                result = filterData({
                    respMsg,
                    body: {
                        categoryCode: req.body.categoryCode
                    }
                })
            }
            res.send(result);
        });
    }
    
    /**
     * 获取分类列表
     * @returns {Function}
     */
    categoryFindAction (req, res) {
        let conditions = {};
        // 处理时间数组
        if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
            let createTime = {
                "$gte": req.body.params.createTime[0],
                "$lt": req.body.params.createTime[1]
            }
            req.body.params.createTime = createTime
        } else if (req.body.params && req.body.params.createTime) {
            delete (req.body.params.createTime)
        }
        // 赋值
        conditions = req.body
        super.findCategory(conditions, function (result) {
            res.send(result)
        });
    }
    
    /**
     *  删除分类
     * @returns {Function}
     */
    categoryRemoveAction (req, res) {
        var conditions = req.body;
        super.removeCategory(conditions, function (result) {
            res.send(result);
        });
    }
    /**
     *  更新分类信息
     * @returns {Function}
     */
    categoryUpdateAction (req, res)  {
        var conditions = {
            categoryCode: req.body.categoryCode
        };
        var update = {
            $set: {
                categoryCode: req.body.categoryCode,
                categoryName: req.body.categoryName,
                identifyNo: req.body.identifyNo,
                refCategoryRoleCode: req.body.refCategoryRoleCode,
                status: req.body.status,
                categoryDuty: req.body.categoryDuty,
                phonenum: req.body.phonenum,
                updateTime: +new Date(),
                desc: req.body.desc,
                password: req.body.password,
            }
        }
        var options = {
            new: true
        }
        super.updateCategory(conditions, update, options, function (result) {
            if (result.respCode === '000000') {
                result = filterData({
                    respMsg: '修改成功',
                    body: {
                        categoryCode: conditions.categoryCode
                    }
                })
            }
            res.send(result);
        });
    }
}

export default new CategorytController()
