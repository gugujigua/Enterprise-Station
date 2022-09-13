'use strict';
module.exports = () => {
  return async function checkLogin(ctx, next) {
    if (ctx.session.isLogin) {
      await next();
    } else {
      ctx.redirect('/admin/login');
    }
  };
};
