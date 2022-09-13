'use strict';
const Controller = require('egg').Controller;

class WheelController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await this.service.common.wheel.all();
    await ctx.render('admin/wheel.html', { wheels: data });
    ctx.body = {
      code: 200,
      msg: '获取成功',
      wheels: data,
    };
  }
  async show() {
    const { ctx } = this;
    const data = await this.service.common.wheel.one(this.ctx.params.id);
    ctx.body = {
      code: 200,
      msg: '获取成功',
      wheel: data[0],
    };
  }
  async create() {
    const { ctx } = this;
    try {
      ctx.validate({
        thumb: {
          type: 'string',
          required: true,
        },
      }, ctx.request.body);
      await this.service.common.wheel.add(ctx.request.body);
      ctx.body = {
        code: 200,
        msg: '添加成功',
      };
    } catch (err) {
      if (err.errors) {
        ctx.body = { code: 404, msg: err.errors[0].field + ' ' + err.errors[0].message };
      } else {
        ctx.body = { code: 404, msg: '服务器出错' };
      }
      return;
    }
  }
  async update() {
    const { ctx } = this;
    try {
      const result = await this.service.common.wheel.edit(ctx.request.body, ctx.params.id);
      if (result) {
        ctx.body = {
          code: 200,
          msg: '修改成功',
        };
      }
    } catch (err) {
      if (err.errors) {
        ctx.body = { code: 404, msg: err.errors[0].field + ' ' + err.errors[0].message };
      } else {
        ctx.body = { code: 404, msg: '服务器出错' };
      }
      return;
    }
  }
  async destroy() {
    const { ctx } = this;
    await this.service.common.wheel.del(ctx.params.id);
    ctx.body = {
      code: 200,
      msg: '删除成功',
    };
    // try {
    //   await this.service.common.wheel.del(ctx.params.id);
    //   ctx.redirect('/admin/wheel');
    // } catch (err) {
    //   ctx.body = '删除出错了';
    // }
  }
}
module.exports = WheelController;
