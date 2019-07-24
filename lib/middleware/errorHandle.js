export default function(ctx, next){
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.body = {
          status: 401,
          message: 'Protected resource, use Authorization header to get access\n'
        }
      } else {
        throw err;
      }
    });
  }