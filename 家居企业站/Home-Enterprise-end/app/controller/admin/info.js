'use strict';
const Controller = require('egg').Controller;

class InfoController extends Controller {
  // 网站信息
  async info() {
    const { ctx } = this;
    const data = await ctx.service.common.info.one();
    await this.ctx.render('admin/info.html', { data: data[0] });
  }
  async edit() {
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
    // ctx.body = result;
  }

}
module.exports = InfoController;
