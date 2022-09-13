'use strict';
const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await this.service.common.product.all(); // 调用服务
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result.data,
      total: result.total,
    };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await this.service.common.product.one(id);// [{}]
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result[0],
    };
  }
  async create() {
    const { ctx } = this;
    try {
      // 数据验证
      ctx.validate({ // eggjs数据验证方法
        title: { type: 'string', required: true },
        thumb: { type: 'string', required: true },
      }, ctx.request.body);
      // 调用服务 存储数据
      await this.service.common.product.add(ctx.request.body);
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
    const id = ctx.params.id;
    const result = await this.service.common.product.edit(ctx.request.body, id);// [{}]
    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: result[0],
    };
  }
  async destroy() {
    const { ctx } = this;
    try {
      const id = ctx.params.id;
      await this.service.common.product.del(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
      };
    } catch (err) {
      ctx.body = {
        code: 404,
        msg: '删除出错',
      };
    }
  }
}
module.exports = ProductController;
