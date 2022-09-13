'use strict';
const Controller = require('egg').Controller;

class MainController extends Controller{
    // 管理端主页
    async main(){
        const {ctx} = this;
        await this.ctx.render("admin/main.html",{username:ctx.session.username});
    }
} 
module.exports = MainController;