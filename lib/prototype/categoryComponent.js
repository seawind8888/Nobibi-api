import categoryModel from '../models/category'
import BaseComponent from './baseComponent'

class CategoryComponent extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增分类
     * @returns {Function}
     */
    addCategory (conditions,  options, callback) {
        super.addData(categoryModel, conditions, options, function (result) {
            callback(result);
        });
    };
    /**
     * 查找分类
     * @param conditions
     * @param callback
     */
    findCategory (conditions) {
       
        return new Promise((resolve, reject) => {
            try {
                let options = {};
                if (conditions.pagenation) {
                    options = {
                        sort: { _id: -1 },
                        limit: conditions.pagenation.pageSize,
                        skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
                    }
                }
                super.findData(categoryModel, conditions, {}, options, function (result) {
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
           
        })
      

    }

    /**
     * 删除分类
     * @param conditions
     * @param callback
     */
    async removeCategory (conditions, callback) {
        var categoryModel = category.getModel();
        const result = await super.removeData(categoryModel, conditions)
        callback(result);
    }

    /**
     * 更新分类信息
     * @param conditions
     * @param update
     * @param options
     * @param callback
     */
    updateCategory (conditions, update, options,  callback) {
        super.updateData(categoryModel, conditions, update, options, function (result) {
            callback(result);
        });
    }
}

export default CategoryComponent