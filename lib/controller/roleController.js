// import RoleComponent from '../prototype/roleComponent';
import Role from '../models/role'
import BaseComponent from '../prototype/baseComponent'

class RoleController extends BaseComponent {
  constructor() {
    super()
  }
  /**
     * 新增角色
     * @returns {Function}
     */
    async roleAddAction (req, res) {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const options = {
            params: {
                "roleName": req.body.roleName
            },
            uniqueness: true,
            errormessage: '角色名已存在'
        }
      
        super.addData(Role, conditions, options, function (result) {
            res.send(result);
        });
    }
     /**
     * 获取角色分类
     */
    async roleFindAction (req, res) {
        const query = req.query;
        let options = {}
        const conditions = {}
        conditions.params = {...query}
        if(query.createTime) {
            conditions.params.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            delete conditions.params.page
            delete conditions.params.pageSize
            conditions.pagenation = {
                pageNo: Number(query.page),
                pageSize: Number(query.pageSize) || 10,
            }
        }
        super.findData(Role, conditions, {}, options, function (result) {
            res.send(result);
        });
        // const result = await super.findRole(conditions);
        // res.send(result)
    }
     /**
     *  删除角色
     * @returns {Function}
     */
    async roleRemoveAction (req, res) {
        const { _id } = req.body
        const conditions = {
            '_id': {
                $in: Array.isArray(_id)?_id.map(e => {return e}):[_id]
            }
        }
        const result = await super.removeData(Role, conditions)
        res.send(result)
    }
    /**
     *  更新角色信息
     * @returns {Function}
     */
    async roleUpdateAction (req, res)  {
        // const _isController = await super.verifyControlUser(req.body.controlCode)
        // if(!_isController) {
        //     res.send({
        //         message: '无权操作',
        //         status: 201
        //     });
        //     return
        // }
        const conditions = {
            _id: req.body._id
        };
        const update = {
            $set: {
                ...req.body
            }
        }
        const result = await super.updateData(Role, conditions, update, {new: true})
        res.send(result)
    }
}

export default new RoleController()