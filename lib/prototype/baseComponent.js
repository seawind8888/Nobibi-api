import filterData from '../utils/filterData'

class BaseComponent {
  /** 
   * 公共addData方法 
   * @param model 要操作数据库的模型 
   * @param conditions 增加的条件,如{id:xxx} 
   * @param callback 
   */
  addData(model, conditions, options, callback) {
    model.findOne(options.params, function (err, doc) {
      if (doc && !options.isNotOne) {
        let obj = filterData({
          respCode: "900000",
          respMsg: options.errorRespMsg || "已存在"
        })
        callback(obj);
        return false;
      }
      model.create(conditions, function (err, result) {
        console.log('++++++++++++++++', result)
        if (err) {
          console.log(error);
          let obj = filterData({
            respMsg: '服务器异常',
            respCode: '999999'

          })
          callback(obj);
        } else {
          let obj = filterData({
            body: {
              _id: result._id
            },
            respMsg: '添加成功',
          })
          callback(obj);
        }
      });
    });
  }
  /** 
   * 公共update方法 
   * @param model 要操作数据库的模型 
   * @param conditions 增加的条件,如{id:xxx} 
   * @param update 更新条件{set{id:xxx}} 
   * @param options  
   * @param callback 
   */
  updateData(model, conditions, update, options, callback) {

    model.update(conditions, update, options, function (error, result) {
      if (error) {
        console.log(error);
        let obj = filterData({
          respMsg: '服务器异常',
          respCode: '999999'
        })
        callback(obj);
      } else {
        console.log(result)
        if (result.n != 0) {
          let obj = filterData({
            respMsg: '修改成功'
          })
          callback(obj);
        } else {
          let obj = filterData({
            respMsg: '暂无数据',
            respCode: '000000'
          })
          callback(obj);
        }

      }
    });
  }
  /** 
   * 公共remove方法 
   * @param model 
   * @param conditions 
   * @param callback 
   */
  removeData(model, conditions, callback) {
    model.remove(conditions, function (error, result) {
      if (error) {
        console.log(error);
        let obj = filterData({
          respMsg: '服务器异常',
          respCode: '999999'
        })
        callback(obj);
      } else {
        if (result.n != 0) {
          let obj = filterData({
            respMsg: "删除成功"
          })
          callback(obj);
        } else {
          let obj = filterData({
            respMsg: '暂无数据',
            respCode: '000000'
          })
          callback(obj);
        }

      }
    });
  }
  /** 
   * 公共find方法 非关联查找 
   * @param model 
   * @param conditions 
   * @param fields 查找时限定的条件，如顺序，某些字段不查找等 
   * @param options 
   * @param callback 
   */
  findData(model, conditions, fields, options, callback) {
    model.countDocuments(conditions.params, function (err, total) {
      if (err) {
        console.log(err)
        let obj = filterData({
          respMsg: '请求总条数失败'
        })
        callback(obj);
      }
      model.find(conditions.params, fields, options, function (error, result) {
        if (error) {
          console.log(error);
          let obj = filterData({
            respMsg: '服务器异常',
            respCode: '999999'
          })
          callback(obj);
        } else {
          if (result.length != 0) {
            let filterParams = {
              datas: result
            }
            if (conditions.pagenation) {
              filterParams.pagenation = {
                itemCount: total,
                pageNo: conditions.pagenation.pageNo,
                pageSize: conditions.pagenation.pageSize
              }
            }
            let obj = filterData({
              body: filterParams
            })
            callback(obj)
          } else {
            console.log(error);
            let obj = filterData({
              respMsg: '暂无数据',
              respCode: '000000'
            })
            callback(obj);
          }
        }
      });
    });
  }
  /** 
   * 公共populate find方法 
   * 是关联查找 
   * @param model 
   * @param conditions 
   * @param path :The field need to be refilled （需要覆盖的字段） 
   * @param fields :select fields (name -_id,Separated by a space field,In front of the field name plus "-"said not filled in) 
   * @param refmodel （关联的字段，有path可为null） 
   * @param options 
   * @param callback 
   */
  findDataPopulation(model, conditions, path, fields, refmodel, options, callback) {
    model.find(conditions)
      .populate(path, fields, refmodel, options)
      .exec(function (err, result) {
        if (err) {
          console.log(error);
          let obj = filterData({
            respMsg: '服务器异常',
            respCode: '999999'
          })
          callback(obj);
        } else {
          if (result.length != 0) {
            let filterParams = {
              values: result
            }
            if (conditions.pagenation) {
              filterParams.pagenation = {
                itemCount: total,
                pageNo: conditions.pagenation.pageNo,
                pageSize: conditions.pagenation.pageSize
              }
            }
            let obj = filterData(filterParams)
            callback(obj)
          } else {
            let obj = filterData({
              respMsg: '暂无数据',
              respCode: '000000'
            })
            callback(obj);
          }

        }
      });
  }
}

export default BaseComponent
