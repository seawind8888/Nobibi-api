const filterData = require('../utils/filterData')
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
        let user = {
            userCode: req.body.userCode,
            userName: req.body.userName,
            identifyNo: req.body.identifyNo,
            refUserRoleCode: req.body.refUserRoleCode,
            status: req.body.status,
            userDuty: req.body.userDuty,
            phonenum: req.body.phonenum,
            createTime: +new Date(),
            updateTime: +new Date(),
            desc: req.body.desc,
            password: req.body.password
        }
        let options = {
            params: {
                "userCode": req.body.userCode,
            },
            errorRespMsg: '用户已存在'
        }
        let result = await super.addUser(user, options);
        if (result.respCode === '000000') {
            let respMsg
            if (req.body.userName) {
                respMsg = "保存成功"
            } else {
                respMsg = "注册成功,即将登录..."
            }
            result = filterData({
                respMsg,
                body: {
                    userCode: req.body.userCode
                }
            })
        }
        res.send(result);
       
    }
    /**
     * 获取用户列表
     * @returns {Function}
     */
    async userFindAction (req, res) {
        let conditions = {};
        // 处理时间数组
        if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
            let createTime = {
                "$gte": req.body.params.createTime[0],
                "$lt": req.body.params.createTime[1]
            }
            req.body.params.createTime = createTime
        } else if (req.body.params && req.body.params.createTime) {
            delete (req.body.params.createTime)
        }
        // 赋值
        conditions = req.body
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
                userDuty: req.body.userDuty,
                phonenum: req.body.phonenum,
                updateTime: +new Date(),
                desc: req.body.desc,
                password: req.body.password,
            }
        }
        const options = {
            new: true
        }
        const result = await super.updateUser(conditions, update, options);
        res.send(result);
       
    }

}
export default new UserController()