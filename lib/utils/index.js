export function response (obj = {}) {
    return {
        status: obj.status || 200,
        message: obj.message || 'success',
        data: obj.body
    }
}

// 过滤空字段
export function paramsFilter (params) {
   return Object.keys(params).map(e => {
       return !!params[e]
   })
}