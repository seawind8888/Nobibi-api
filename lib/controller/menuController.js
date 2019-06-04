import { response } from '../utils'
import MenuComponent from '../prototype/menuComponent';


class MenuController extends MenuComponent {
  constructor() {
    super()
  }
  /**
   * 新增菜单
   * @returns {Function}
   */
  menuAddAction(req, res) {
    let menu = {
      icon: req.body.icon,
      menuId: req.body.menuId,
      menuLevel: req.body.menuLevel,
      menuName: req.body.menuName,
      platType: req.body.platType,
      pmenuId: req.body.pmenuId,
      remark: req.body.remark,
      url: req.body.url,
      userCode: req.body.userCode,
      createTime: req.body.createTime,
      updateTime: req.body.updateTime
    }
    let options = {
      params: {
        "menuId": req.body.menuId,
      },
      errormessage: '菜单已存在'
    }
    super.addMenu(menu, options, function (result) {
      res.send(result);
    });
  }


  /**
   * 获取菜单列表
   * @returns {Function}
   */
  menuFindAction(req, res) {
    let conditions = {};
    // 处理时间数组
    if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
      let createTime = {
        "$gte": req.body.params.createTime[0],
        "$lt": req.body.params.createTime[1]
      }
      req.body.params.createTime = createTime
    } else if (req.body.params && req.body.params.createTime) {
      delete(req.body.params.createTime)
    }
    // 赋值
    conditions = req.body
    super.findMenu(conditions, function (result) {
      res.send(result)
    });
  }

  /**
   *  删除菜单
   * @returns {Function}
   */
  menuRemoveAction(req, res) {
    const conditions = req.body;
    super.removeMenu(conditions, function (result) {
      res.send(result);
    });
  }
  /**
   *  更新菜单信息
   * @returns {Function}
   */
  menuUpdateAction(req, res) {
    var conditions = {
      menuCode: req.body.menuCode
    };
    var update = {
      $set: {
        menuCode: req.body.menuCode,
        menuName: req.body.menuName,
        identifyNo: req.body.identifyNo,
        refmenuRoleCode: req.body.refmenuRoleCode,
        status: req.body.status,
        menuDuty: req.body.menuDuty,
        phone: req.body.phone,
        updateTime: +new Date(),
        desc: req.body.desc,
        password: req.body.password,
      }
    }
    var options = {
      new: true
    }
    super.updateMenu(conditions, update, options,  function (result) {
      if (result.status === '000000') {
        result = response({
          message: '修改成功',
          body: {
            menuCode: conditions.menuCode
          }
        })
      }
      res.send(result);
    });
  }
}


export default new MenuController()
