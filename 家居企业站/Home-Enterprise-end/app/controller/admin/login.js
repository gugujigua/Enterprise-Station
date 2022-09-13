'use strict';
const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 登录页
  async login() {
    const { ctx } = this;
    await this.ctx.render('admin/login.html', { isLogin: ctx.session.isLogin });
  }
  // 检查登录
  async check() {
    try {
      this.ctx.validate({
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
      }, this.ctx.request.body);
      // 2. 调用服务
      const result = await this.service.admin.login.checkLogin(this.ctx.request.body);
      if (result) {
        this.ctx.body = {
          code: 200,
          msg: '登录成功',
        };
      } else {
        this.ctx.body = {
          code: 404,
          msg: '登录失败',
        };
      }
    } catch (err) {
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
  // 退出登录
  async loginout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.redirect('/admin/login');
  }
  // 修改密码
  async changePass() {
    try {
      this.ctx.validate({ // 数据验证方法 validate
        oldpass: { type: 'string', required: true },
        newpass: { type: 'string', required: true },
        renewpass: { type: 'string', required: true },
      }, this.ctx.request.body);
      if (this.ctx.request.body.newpass !== this.ctx.request.body.renewpass) {
        this.ctx.body = {
          code: 404,
          msg: '新密码与确认密码不一致',
        };
        return;
      }
      const result = await this.service.admin.login.changePass(this.ctx.request.body.oldpass, this.ctx.request.body.newpass); // 调用服务
      if (result) {
        this.ctx.body = {
          code: 200,
          msg: '修改成功',
        };
      } else {
        this.ctx.body = {
          code: 404,
          msg: '修改失败',
        };
      }
    } catch (err) {
      if (err.errors) {
        this.ctx.body = {
          code: 404, // 表示200正确、404错误的状态码
          msg: err.errors[0].field + ' ' + err.errors[0].message,
        };
      } else {
        this.ctx.body = {
          code: 404,
          msg: '修改出错',
        };
      }

    }
  }
}
module.exports = LoginController;
