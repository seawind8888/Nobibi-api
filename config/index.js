module.exports = {
    mongodb: {
        url: "mongodb://localhost:27017/mongoCms"
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
    
}