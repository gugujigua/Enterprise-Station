'use strict';

const Controller = require('egg').Controller;

class WheelController extends Controller {
  // 轮播图信息
  async show() {
    const { ctx } = this;
    const data = await this.service.common.wheel.all();
    await ctx.render('admin/wheel.html', { wheels: data });

  }
  // 添加页面
  async add() {
    const { ctx } = this;
    await ctx.render('admin/wheelAdd.html');
  }
  // 提交添加数据
  async addWheel() {
    const { ctx } = this;
    try {
      ctx.validate({
        thumb: {
          type: 'string',
          required: true,
        },
      }, ctx.request.body);
      const result = await this.service.common.wheel.add(ctx.request.body);
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
  // 展示编辑页
  async edit() {
    const { ctx } = this;
    const data = await this.service.common.wheel.one(this.ctx.params.id);
    await ctx.render('admin/wheelEdit.html', { wheel: data[0] });
  }
  async editwheel() {
    const { ctx } = this;
    try {
      ctx.validate({
        thumb: {
          type: 'string',
          required: true,
        },
      }, ctx.request.body); // 验证请求体
      await this.service.common.wheel.edit(ctx.request.body, ctx.params.id);
      ctx.body = {
        code: 200,
        msg: '修改成功',
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
  async del() {
    const { ctx } = this;
    try {
      await this.service.common.wheel.del(ctx.params.id);
      ctx.redirect('/admin/wheel');
    } catch (err) {
      ctx.body = '删除出错了';
    }
  }
}

module.exports = WheelController;
