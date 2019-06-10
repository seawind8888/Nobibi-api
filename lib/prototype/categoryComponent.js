import Category from '../models/category'
import BaseComponent from './baseComponent'

class CategoryComponent extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增分类
     * @returns {Function}
     */
    addCategory (conditions,  options) {
        return new Promise(async (resolve, reject) =>  {
            try {
                super.addData(Category, conditions, options, function (result) {
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        })
       
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
                super.findData(Category, conditions, {}, options, function (result) {
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
    async removeCategory (conditions) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await super.removeData(Category, conditions)
                resolve(result);
            } catch (error) {
                reject(error)
            }
        })
       
    }

    /**
     * 更新分类信息
     * @param conditions
     * @param update
     * @param options
     */
    updateCategory (conditions, update, options) {
        return new Promise((resolve, reject) => {
            try {
                super.updateData(Category, conditions, update, options, function (result) {
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        })
        
    }
}

export default CategoryComponent