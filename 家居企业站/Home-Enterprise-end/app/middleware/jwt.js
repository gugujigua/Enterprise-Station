'use strict';
module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.request.header.token;
    if (token) {
      try {
        const decode = ctx.app.jwt.verify(token, options.adminJwtSecretKey);
        ctx.username = decode;
        await next();
      } catch (error) {
        ctx.body = {
          code: 401,
          msg: 'token验证失败',
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: ' 请传入token',
      };
    }
  };
};
