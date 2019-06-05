import Menu from '../models/menu'
import BaseComponent from './baseComponent'

class MenuComponent extends BaseComponent {
  constructor() {
    super()
  }
  /**
   * 新增菜单
   * @returns {Function}
   */
  addMenu(conditions, options, callback) {
    super.addData(Menu, conditions, options, function (result) {
      callback(result);
    });
  };
  /**
   * 查找菜单
   * @param conditions
   * @param callback
   */
  findMenu(conditions, callback) {
      return new Promise((resolve, reject) => {
        try {
            let options = {}
            if (conditions.pagenation) {
                options = {
                    sort: { _id: -1 },
                    limit: conditions.pagenation.pageSize,
                    skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
                }
            }
            super.findData(Menu, conditions, {}, options, function (result) {
                resolve(result);
            });
        } catch (error) {
            reject(error)
        }
      
    })
    // let options = {};
    // if (conditions.pagenation) {
    //   options = {
    //     sort: {
    //       _id: -1
    //     },
    //     limit: conditions.pagenation.pageSize,
    //     skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
    //   }
    // }
    // super.findData(Menu, conditions, {}, options, function (result) {
    //   callback(result);
    // });

  }

  /**
   * 删除菜单
   * @param conditions
   * @param callback
   */
  async removeMenu(conditions, callback) {
    const result = await super.removeData(Menu, conditions)
    callback(result);
  }

  /**
   * 更新菜单信息
   * @param conditions
   * @param update
   * @param options
   * @param   
   * @param callback
   */
  updateMenu (conditions, update, options, callback) {
    super.updateData(Menu, conditions, update, options, function (result) {
      callback(result);
    });
  }

}

export default MenuComponent