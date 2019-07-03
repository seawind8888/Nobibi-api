import { response } from '../utils'
import User from '../models/user'
// import UserComponent from '../prototype/userComponent';
import BaseComponent from '../prototype/baseComponent'

class UserController extends BaseComponent {
    constructor() {
        super()
        this.userLogin = this.userLogin.bind(this)
        this.userInfo = this.userInfo.bind(this)
        this.userFindAction = this.userFindAction.bind(this)
        this.userAddAction = this.userAddAction.bind(this)
        this.userRemoveAction = this.userRemoveAction.bind(this)
    }
       /**
     * 查找用户
     * @param conditions
     */
    
    findUser (conditions) {
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
                super.findData(User, conditions, {}, options, function (result) {
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        })
    }
    
    
    /**
     * 新增用户
     */
    async userAddAction (req, res)  {
        const conditions = {
            ...req.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const options = {
            params: {
                "userName": req.body.userName,
            },
            uniqueness: true,
            errorMessage: '用户已存在'
        }
        super.addData(User, conditions, options, function (result) {
            res.send(result);
        });
    }
    /**
     * 用户登录
     */
    async userLogin (req, res) {
        const result = await this.findUser(
            {
            params:{
                userName: req.body.username,
                password: req.body.password
            }
        });
        if(!!result.data.list.length) {
            req.session.username = req.body.username
            req.session.save();
            res.send(response({message: '登录成功'}))
        } else {
            res.send(response({status: 500,message:'账号密码错误'}))
        }
    }
    async userInfo (req, res) {
        const result = await this.findUser({params:{
            userName: req.query.username
        }});
        
        if(!!result.data.list.length) {
            let _userInfo = result.data.list[0]
            _userInfo.password = null
            res.send(response({
                body: _userInfo
            }))
        }
    }
    userLogout (req, res) {
        delete req.session.username
        res.send(response({
            message: '退出成功'
        }))
    }
    async userFindAction (req, res) {
        const query = req.query;
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
        const result = await this.findUser(conditions);
        
        res.send(result)
        
       
    }
    /**
     *  删除用户
     */
    async userRemoveAction (req, res) {
        const { _id } = req.body
        const conditions = {
            '_id': {
                $in: Array.isArray(_id)?_id.map(e => {return e}):[_id]
            }
        }
        const result = await super.removeData(User, conditions)
        res.send(result);
       
      
    }
    /**
     *  更新用户信息
     * @returns {Function}
     */
    async userUpdateAction (req, res) {
        const conditions = {
            _id: req.body._id
        };
        const update = {
            $set: {
                userName: req.body.userName,
                identifyNo: req.body.identifyNo,
                refUserRoleCode: req.body.refUserRoleCode,
                status: req.body.status,
                phone: req.body.phone,
                updateTime: +new Date(),
                desc: req.body.desc,
                password: req.body.password,
                email: req.body.email
            }
        }
        const result = await super.updateData(User, conditions, update,  {new: true})
        res.send(result);
       
    }
   
   
}
export default new UserController()