import menuModel from '../models/menu'
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
    super.addData(menuModel, conditions, options, function (result) {
      callback(result);
    });
  };
  /**
   * 查找菜单
   * @param conditions
   * @param callback
   */
  findMenu(conditions, callback) {
    let options = {};
    if (conditions.pagenation) {
      options = {
        sort: {
          _id: -1
        },
        limit: conditions.pagenation.pageSize,
        skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
      }
    }
    super.findData(menuModel, conditions, {}, options, function (result) {
      callback(result);
    });

  }

  /**
   * 删除菜单
   * @param conditions
   * @param callback
   */
  removeMenu(conditions, callback) {
    super.removeData(menuModel, conditions, function (result) {
      callback(result);
    });
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
    super.updateData(menuModel, conditions, update, options, function (result) {
      callback(result);
    });
  }

}

export default MenuComponent