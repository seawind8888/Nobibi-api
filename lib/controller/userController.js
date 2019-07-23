import jwt from 'jsonwebtoken';
import {
    response
} from '../utils'
import User from '../models/user'
// import UserComponent from '../prototype/userComponent';
import BaseComponent from '../prototype/baseComponent'
import config from '../config'
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
    userAddAction = async (ctx) => {
        const conditions = {
            ...ctx.body,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        const options = {
            params: {
                "userName": ctx.request.body.userName,
            },
            uniqueness: true,
            errorMessage: '用户已存在'
        }
        const result = await this.addData({
            model: User,
            conditions: conditions,
            options: options
        });
        ctx.body = result;
    }
    /**
     * 用户登录
     */
    userLogin = async (ctx) => {
        const result = await this.findUser({
            conditions: {
                userName: ctx.request.body.username,
                password: ctx.request.body.password
            }
        });
        if (!!result.data.list.length) {
            const token = jwt.sign({
                    data: result.data.list[0]._id
                },
                config.app.secret, {
                    expiresIn: 60 * 60 * 24
                })
            ctx.body = response({
                message: '登录成功',
                body: {
                    token: token
                }
            })
        } else {
            ctx.body = response({
                status: 500,
                message: '账号密码错误'
            })
        }
    }
    userInfo = async (ctx) => {
        const result = await this.findUser({
            conditions: {
                userName: ctx.query.username
            },
            fields: {
                password: 0
            }
        });

        if (!!result.data.list.length) {
            let _userInfo = result.data.list[0]
            ctx.body = response({
                body: _userInfo
            })
        }
    }
    userLogout = async (ctx) => {
        delete req.session.username
        ctx.body = response({
            message: '退出成功'
        })
    }
    userFindAction = async (ctx) => {
        const query = ctx.query;
        const conditions = {}
        let options = {}
        if (query.createTime) {
            conditions.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if (query.page) {
            options = {
                limit: Number(query.pageSize) || 10,
                skip: (Number(query.page) - 1) * (Number(query.pageSize) || 10)
            }
        }
        const result = await this.findUser({
            conditions: conditions,
            options: options,
            fields: {
                password: 0
            }
        });
        ctx.body = result

    }
    /**
     *  删除用户
     */
    userRemoveAction = async (ctx) => {
        const {
            _id
        } = ctx.request.body
        const result = await this.removeData({
            model: User,
            value: _id
        })
        ctx.body = result;


    }
    /**
     *  更新用户信息
     */
    userUpdateAction = async (ctx) => {
        const conditions = {
            _id: ctx.request.body._id
        };
        const update = {
            $set: {
                avatar: ctx.request.body.avatar,
                userName: ctx.request.body.userName,
                status: ctx.request.body.status,
                phone: ctx.request.body.phone,
                updateTime: +new Date(),
                password: ctx.request.body.password,
                email: ctx.request.body.email
            }
        }
        const result = await this.updateData({
            model: User,
            conditions: conditions,
            update: update,
            options: {
                new: true
            }
        })
        ctx.body = result;

    }
    userChangePassAction = async (ctx) => {
        const {
            userName,
            oldPass,
            newPass
        } = ctx.request.body
        const valitePassRes = await this.findUser({
            conditions: {
                userName: userName,
                password: oldPass
            }
        });
        if (!valitePassRes.data.total) {
            ctx.body = response({
                status: 500,
                message: '密码输入错误'
            });
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
            options: {
                new: true
            }
        })
        ctx.body = changePassRes
    }


}
export default new UserController()