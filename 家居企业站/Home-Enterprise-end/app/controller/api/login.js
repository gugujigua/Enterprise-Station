'use strict';
const Controller = require('egg').Controller;

class LoginController extends Controller {
  async create() {
    try {
      this.ctx.validate({
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
      }, this.ctx.request.body);
      // 2. 调用服务
      this.ctx.body = await this.service.admin.login.checkLogin2(this.ctx.request.body);
    } catch (err) {
      console.log(err);
      if (err.errors) {
        this.ctx.body = {
          code: 404, // 表示200正确、404错误的状态码
          msg: err.errors[0].field + ' ' + err.errors[0].message,
        };
      } else {
        this.cts.body = {
          code: 404,
          msg: '登录出错',
        };
      }
    }
  }
}
module.exports = LoginController;
