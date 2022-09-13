'use strict';
const Controller = require('egg').Controller;

class InfoController extends Controller {
  async show() {
    const { ctx } = this;
    const data = await ctx.service.common.info.one();
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: data[0],
    };
  }
  async update() {
    const { ctx } = this;
    try {
      const result = await ctx.service.common.info.update(ctx.request.body);
      if (result) {
        ctx.body = {
          code: 200,
          msg: '修改成功',
        };
      }
    } catch (err) {
      ctx.body = {
        code: 404,
        msg: '修改出错',
      };
    }
  }
}
module.exports = InfoController;
