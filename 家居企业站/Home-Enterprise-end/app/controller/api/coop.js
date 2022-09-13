'use strict';

const Controller = require('egg').Controller;

class CooperateController extends Controller {
  async create() {
    const { ctx } = this;
    try {
      // 数据验证
      ctx.validate({ // eggjs数据验证方法
        title: { type: 'string', required: true },
        thumb: { type: 'string', required: true },
      }, ctx.request.body);
      // 调用服务 存储数据
      await this.service.admin.cooperate.add(ctx.request.body);
      ctx.body = {
        code: 200,
        msg: '添加成功',
      };
    } catch (err) {
      console.log(err);
      if (err.errors) {
        ctx.body = { code: 404, msg: err.errors[0].field + ' ' + err.errors[0].message };
      } else {
        ctx.body = { code: 404, msg: '服务器出错' };
      }
      return;
    }
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await this.service.admin.cooperate.one(id);
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result[0],
    };
  }
  async index() {
    const { ctx } = this;
    const result = await this.service.admin.cooperate.all();
    console.log(result); // 调用服务
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result.data,
      total: result.total,
    };
  }
  async destroy() { // ajax => {code:200|404,msg:}
    const { ctx } = this;
    try {
      const id = ctx.params.id;
      await this.service.admin.cooperate.del(id);
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

module.exports = CooperateController;
