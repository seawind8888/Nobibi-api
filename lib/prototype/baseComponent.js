import { response, paramsFilter} from '../utils'
import User from '../models/user'
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
  addData({
    model = {}, 
    conditions = {}, 
    options = {}
  }) {
    return new Promise((resolve, reject) => {
      model.findOne(options.params, function (err, doc) {
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
  updateData({
    model = {}, 
    conditions = {}, 
    update = {}, 
    options = {}
  }) {
    return new Promise((resolve, reject) => {
      model.updateOne(conditions, update, options)
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
        console.log('updateData:',err);
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
   * @param conditions 
   * @param callback 
   */
  async removeData(model, conditions) {
    return model.deleteMany(conditions)
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
        console.log('removeData:',err);
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
  findData({
    model = {}, 
    conditions = {}, 
    fields = {}, 
    options = {}, 
    callback = () => {}
  }) {
    const _conditions = paramsFilter(conditions)
    model.countDocuments(_conditions)
      .exec()
      .then(total => {
        model.find(_conditions, fields, options)
          .exec()
          .then(result => {
            callback(response({
                body: {
                  total: total,
                  list: result
                }
              }))
          }).catch(err => {
            console.log('findData:',err)
            callback(response({
              message: '服务器未知异常',
              status: 500
            }));
          })
      }).catch(err => {
        console.log('findData:',err)
        callback(response({
          message: '服务器未知异常',
          status: 500
        }));
      })
  }
}

export default BaseComponent