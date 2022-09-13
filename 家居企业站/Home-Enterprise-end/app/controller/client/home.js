'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 首页
  async index() {
    const { ctx } = this;
    this.ctx.query.limit = 4;
    const product = await this.service.common.product.all();
    const news = await this.service.common.news.all()
    await ctx.render("/client/index.html",{
      product:product.data,
      news:news.data,
    })
  }
  async addCooperate() {
    const {ctx} = this;
    try {
        // 数据验证
        // ctx.validate({ //eggjs数据验证方法
        //   linkMan: {type: 'string',required: true},
        //   telephone: {type: 'string',required: true},
        //   message: {type: 'string',required: true}
        // }, ctx.request.body);
        // 调用服务 存储数据
        await this.service.admin.cooperate.add(ctx.request.body);
        ctx.body = {
            code:200,
            msg:'添加成功'
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
  async about(){
    const {ctx} = this;
    const page = await this.service.common.page.all()
    await ctx.render("/client/about.html",{
      page:page.data,
      title:page.data[0].title,
    })
  }
  async product(){
    const {ctx} = this;
    var data = await this.service.common.product.all();
    await ctx.render("/client/product.html",{
      data:data.data,
      pages:data.pages,
      page:ctx.query.page || 1,
      title:"家居产品",
    })
  }
  async productShow(){
    const {ctx} = this;
    var id = ctx.params.id;
    var data = await this.service.common.product.one(id);
    data[0].create_time = ctx.helper.formatDate(data[0].create_time);
    const prevNextData = await this.service.common.product.getPrevNext(id);
    await ctx.render("/client/product-show.html",{
      data:data[0],
      prev:prevNextData.prev[0],
      next:prevNextData.next[0],    
    })
  }
  async office(){
    const {ctx} = this;
    const office = await this.service.common.page.all()
    await ctx.render("/client/office.html",{
      office:office.data,
      title:office.data[1].title,
    })
  }
  async hotel(){
    const {ctx} = this;
    const hotel = await this.service.common.page.all()
    await ctx.render("/client/hotel.html",{
      hotel:hotel.data,
      title:hotel.data[3].title,
    })
  }
  async apartment(){
    const {ctx} = this;
    const apartment = await this.service.common.page.all()
    await ctx.render("/client/apartment.html",{
      apartment:apartment.data,
      title:apartment.data[2].title,
    })
  }
  async news(){
    const {ctx} = this;
    var data = await this.service.common.news.all();
    await ctx.render("/client/news.html",{
      data:data.data,
      pages:data.pages,
      page:ctx.query.page || 1,
      title:'新闻中心',
    })
  }
  async newsShow(){
    const {ctx} = this;
    var id = ctx.params.id;
    var data = await this.service.common.news.one(id);
    data[0].create_time = ctx.helper.formatDate(data[0].create_time);
    const prevNextData = await this.service.common.news.getPrevNext(id);
    await ctx.render("/client/news-show.html",{
      data:data[0],
      prev:prevNextData.prev[0],
      next:prevNextData.next[0],    
    })
  }
  async contact(){
    const {ctx} = this;
    const contact = await this.service.common.page.all()
    await ctx.render("/client/contact.html",{
      contact:contact.data,
      title:'联系我们'
    })
  }
}

module.exports = HomeController;
