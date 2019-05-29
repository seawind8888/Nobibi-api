const filterData = function (obj = {}) {
    
    return {
        status: obj.respCode || 200,
        message: obj.respMsg || 'success',
        data: obj.body
    }
}
module.exports = filterData