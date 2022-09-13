'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async add() {
    const { ctx } = this;// 解构
    await ctx.render('admin/newsAdd.html'); // 渲染 view并将渲染后的 HTML 字符串发送到客户端。
  }
  async addNews() {
    const { ctx } = this;
    try {
      // 数据验证
      ctx.validate({ // eggjs数据验证方法
        title: { type: 'string', required: true },
        thumb: { type: 'string', required: true },
      }, ctx.request.body);
      // 调用服务 存储数据
      await this.service.common.news.add(ctx.request.body);
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
  async list() {
    const { ctx } = this;
    await ctx.render('admin/news.html');
  }
  async all() {
    const { ctx } = this;
    const result = await this.service.common.news.all(); // 调用服务
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result.data,
      total: result.total,
    };
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await this.service.common.news.one(id);// [{}]
    await ctx.render('admin/edit-news.html', {
      news: result[0],
    });
  }
  async editNews() {
    const { ctx } = this;
    try {
      // 数据验证
      ctx.validate({ // eggjs数据验证方法
        title: { type: 'string', required: true },
        thumb: { type: 'string', required: true },
      }, ctx.request.body);
      // 调用服务 存储数据
      await this.service.common.news.edit(ctx.request.body, ctx.params.id);
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
  async del() { // ajax => {code:200|404,msg:}
    const { ctx } = this;
    try {
      const id = ctx.params.id;
      await this.service.common.news.del(id);
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

module.exports = NewsController;
