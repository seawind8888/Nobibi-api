import { response } from '../utils'
import User from '../models/user'
// import UserComponent from '../prototype/userComponent';
import BaseComponent from '../prototype/baseComponent'
class UserController extends BaseComponent {
    constructor() {
        super()
    }
       /**
     * 查找用户
     * @param conditions
     */
    findUser = ({
        conditions = {}, 
        options = {},
        fields = {}
    }) => {
        return new Promise(async (resolve, reject) => {
           
            try {
                const result = await this.findData({
                    model: User,
                    conditions: conditions, 
                    fields: fields,
                    options: options
                });
                resolve(result);
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * 新增用户
     */
    userAddAction = async (req, res) =>  {
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
        const result = await this.addData({
            model: User, 
            conditions: conditions, 
            options: options
        });
        res.send(result);
    }
    /**
     * 用户登录
     */
    userLogin = async (req, res) => {
        const result = await this.findUser({
            conditions: {
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
    userInfo = async (req, res) => {
        const result = await this.findUser({
            conditions: {
                userName: req.query.username
            },
            fields: {password: 0}
        });
        
        if(!!result.data.list.length) {
            let _userInfo = result.data.list[0]
            res.send(response({
                body: _userInfo
            }))
        }
    }
    userLogout = async (req, res) => {
        delete req.session.username
        res.send(response({
            message: '退出成功'
        }))
    }
    userFindAction = async (req, res) => {
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
        const result = await this.findUser({
            conditions: conditions, 
            options: options,
            fields: {password: 0}
        });
        res.send(result)
       
    }
    /**
     *  删除用户
     */
    userRemoveAction = async (req, res) => {
        const { _id } = req.body
        const result = await this.removeData({
            model: User, 
            value: _id
        })
        res.send(result);
       
      
    }
    /**
     *  更新用户信息
     */
    userUpdateAction = async (req, res) => {
        const conditions = {
            _id: req.body._id
        };
        const update = {
            $set: {
                avatar: req.body.avatar,
                userName: req.body.userName,
                status: req.body.status,
                phone: req.body.phone,
                updateTime: +new Date(),
                password: req.body.password,
                email: req.body.email
            }
        }
        const result = await this.updateData({
            model: User, 
            conditions: conditions, 
            update: update,  
            options: {new: true}
        })
        res.send(result);
       
    }
    userChangePassAction= async (req, res) => {
        const { userName, oldPass, newPass } = req.body
        const valitePassRes = await this.findUser({
            conditions: {
                userName: userName,
                password: oldPass
            }
        });
        if(!valitePassRes.data.total) {
            res.send(response({
                status: 500,
                message: '密码输入错误'
            }));
            return
        }
        const changePassRes = await this.updateData({
            model: User, 
            conditions: {
                userName: userName,
            }, 
            update: {
                $set: {
                    password: newPass
                }
            },  
            options: {new: true}
        })
        res.send(changePassRes);
    }
   
   
}
export default new UserController()