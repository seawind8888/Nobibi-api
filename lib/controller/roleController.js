// import RoleComponent from '../prototype/roleComponent';
import Role from '../models/role'
import BaseComponent from '../prototype/baseComponent'

class RoleController extends BaseComponent {
  constructor() {
    super()
  }
  /**
     * 新增角色
     */
    roleAddAction = async (req, res)  => {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
      
        const result = await this.addData({
            model: Role, 
            conditions: conditions, 
            options: {
                params: {
                    "roleName": req.body.roleName
                },
                uniqueness: true,
                errormessage: '角色名已存在'
            }
        });
        res.send(result);
    }
     /**
     * 获取角色分类
     */
    roleFindAction = async (req, res)  => {
        const query = req.query;
        const conditions = {}
        let options = {}
        if(query.createTime) {
            conditions.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            options = {
                limit: Number(query.pageSize) || 10,
                skip: (Number(query.page) - 1) * (Number(query.pageSize) || 10)
            }
        }
        const result = await this.findData({
            model: Role, 
            options: options,
            conditions: conditions, 
            callback: function (result) {
                res.send(result);
            }
        });
        res.send(result)
    }
     /**
     *  删除角色
     */
    roleRemoveAction = async (req, res)  => {
        const { _id } = req.body
        const result = await this.removeData({
            model: Role,
            value: _id
        })
        res.send(result)
    }
    /**
     *  更新角色信息
     */
    roleUpdateAction = async (req, res)  =>  {
        const {_id} = req.body
        const result = await this.updateData({
            model: Role, 
            conditions: {
                _id: _id
            }, 
            update: {
                $set: {
                    ...req.body
                }
            }, 
            options: {new: true}
        })
        res.send(result)
    }
}

export default new RoleController()