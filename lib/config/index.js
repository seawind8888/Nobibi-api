module.exports = {
    mongodb: {
        url: "mongodb://localhost:27017/Nobibi"
    },
    app: {
        secret: 'Jwt-sessionId',
        port: 3001,
        whiteList: [
            /\/user\/login/,
            /\/user\/createUser/,
            /\/user\/wechatSyncLogin/,
            /\/topic\/getTopicList/,
            /\/category\/getCategoryList/,
            /\/comment\/getCommentList/,
            /\/praise\/getPraiseInfo/,
            /\/favorite\/getFavoriteList/
        ] 
    },
    redis: {
        host: '127.0.0.1',
        port: '6379',
        db: 0,
    },
    session: {
        useRedis: false,
        secret: 'mongo-es6-cms'
    },
    weapp: {
        AppID: "wxa967f0fe765f6cdc",
        AppSecret: "d476bbd8fd7350449a6e7a51b38793e5"
    }
}