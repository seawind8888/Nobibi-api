import { response } from '../utils'
import UserComponent from '../prototype/userComponent';

class UserController extends UserComponent {
    constructor() {
        super()
    }
    /**
     * 新增用户
     * @returns {Function}
     */
    async userAddAction (req, res)  {
        // let user = {
        //     ...req.body,
        //     createTime: +new Date(),
        //     updateTime: +new Date(),
        //     password: req.body.password
        // }
        let user = {
            userCode: req.body.userCode,
            userName: req.body.userName,
            refUserRoleCode: req.body.refUserRoleCode,
            status: req.body.status,
            phone: req.body.phone,
            createTime: +new Date(),
            updateTime: +new Date(),
            desc: req.body.desc,
            password: req.body.password
        }
        let options = {
            params: {
                "userCode": req.body.userCode,
            },
            errormessage: '用户已存在'
        }
        let result = await super.addUser(user, options);
        if (result.status === 200) {
            res.send(response({message: '注册成功'}))
        } else {
            res.send(result)
        }
    }
    /**
     * 获取用户列表
     * @returns {Function}
     */
    async userLogin (req, res) {
       
        const result = await super.findUser({params:{
            userCode: req.body.username,
            password: req.body.password
        }});
        if(!!result.data.list.length) {
            req.session.username = req.body.username
            req.session.save();
            res.send(response({message: '登录成功'}))
        } else {
            res.send(response({status: 500,message:'账号密码错误'}))
        }
    }
    async userInfo (req, res) {
        const result = await super.findUser({params:{
            userCode: req.query.username
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
        let query = req.query;
        let conditions = {}
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
        const result = await super.findUser(conditions);
        
        res.send(result)
        
       
    }
    /**
     *  删除用户
     * @returns {Function}
     */
    async userRemoveAction (req, res) {
        const conditions = req.body;
        const result = await super.removeUser(conditions);
        res.send(result);
       
      
    }
    /**
     *  更新用户信息
     * @returns {Function}
     */
    async userUpdateAction (req, res) {
        const conditions = {
            userCode: req.body.userCode
        };
        const update = {
            $set: {
                userCode: req.body.userCode,
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
        const result = await super.updateUser(conditions, update, {new: true});
        res.send(result);
       
    }

}
export default new UserController()