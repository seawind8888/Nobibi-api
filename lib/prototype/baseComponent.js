import {
  response,
  paramsFilter
} from '../utils'
class BaseComponent {
  constructor() {
  }

  /** 
   * 公共addData方法 
   * @param model 要操作数据库的模型 
   * @param conditions 增加的条件,如{id:xxx} 
   * @param conditions 增加的设置
   * @param callback 回调
   */
  addData = ({
    model = {},
    conditions = {},
    options = {}
  }) => {
    return new Promise((resolve, reject) => {
      model.findOne(conditions, function (err, doc) {
        if (doc && options.uniqueness) {
          resolve(response({
            status: 201,
            message: options.errorMessage || "已存在"
          }))
          return false;
        }
        model.create(conditions, function (err, result) {
          console.log('创建成功: ', result)
          if (err) {
            console.log(err);
            reject(response({
              message: '服务器未知异常',
              status: 500

            }))
          } else {
            resolve(response({
              message: '添加成功',
            }))
          }
        });
      });
    })

  }


  /** 
   * 公共update方法 
   * @param model 要操作数据库的模型 
   * @param conditions 增加的条件,如{id:xxx} 
   * @param update 更新条件{set{id:xxx}} 
   * @param options  设置
   */
  updateData = ({
    model = {},
    conditions = {},
    update = {},
    options = {}
  }) => {
    return new Promise((resolve, reject) => {
      const _$set = paramsFilter(update.$set)
      model.updateOne(conditions, {
          $set: _$set
        }, options)
        .exec()
        .then(result => {
          if (result.n != 0) {
            resolve(response({
              message: '修改成功'
            }))
          } else {
            resolve(response({
              message: '暂无数据',
              status: 204
            }))
          }
        }).catch(err => {
          console.log('updateData:', err);
          reject({
            message: '服务器未知异常',
            status: 500
          })
        })
    })
  }
  /** 
   * 公共remove方法 
   * @param model 
   * @param key 要删除的key
   * @param value 要删除的值
   */
  removeData = async ({
    model = {},
    key = '_id',
    value = []
  }) => {
    const _delList = {}
    _delList[key] = {$in: Array.isArray(value)?value.map(e => {return e}):[value]}
    return model.deleteMany(_delList)
      .exec()
      .then(result => {
        if (result.n != 0) {
          return response({
            message: "删除成功"
          })
        } else {
          return response({
            message: '暂无数据',
            status: 204
          })
        }
      })
      .catch(err => {
        console.log('removeData:', err);
        return response({
          message: '服务器未知异常',
          status: 500
        })
      })
  }
  /** 
   * 公共find方法 非关联查找 
   * @param model 
   * @param conditions 查找时限定的条件，如顺序，某些字段不查找等 
   * @param fields 字段筛选
   * @param options 设置
   * @param cb 
   */
  findData = async ({
    model = {},
    conditions = {},
    fields = {},
    options = {}
  }) => {
    var _self = this
    return new Promise(async (resolve, reject) => {
      const _conditions = paramsFilter(conditions)
      const total = await _self.countData({
        model: model,
        conditions: _conditions
      })
      model.find(_conditions, fields, options)
        .exec()
        .then(result => {
          resolve(response({
            body: {
              total: total,
              list: result
            }
          }))
        }).catch(err => {
          console.log('findData:', err)
          reject({
            message: '服务器未知异常',
            status: 500
          })
        })
    }).catch(err => {
      console.log('findData:', err)
      reject({
        message: '服务器未知异常',
        status: 500
      })
    })

  }
  countData = ({
    model = {},
    conditions = {}
  }) => {
    return new Promise((resolve, reject) => {
      const _conditions = paramsFilter(conditions)
      model.countDocuments(_conditions)
        .exec()
        .then(total => {
          resolve(total)
        }).catch(err => {
          console.log('countData:', err);
          reject({
            message: '服务器未知异常',
            status: 500
          })
        })

    })

  }
}

export default BaseComponent