export default function(ctx, next){
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.body = {
          status: 401,
          message: 'Token失效，请重新登录\n'
        }
      } else {
        throw err;
      }
    });
  }