'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    // console.log(file);
    const state = fs.statSync(file.filepath);
    if (state.size > 1024 * 1024) {
      this.ctx.body = {
        code: 404,
        msg: '文件超过1M',
      };
      return;
    }
    if ([ 'image/png', 'image/jpeg', 'image/gif' ].indexOf(file.mime) === -1) { // 不允许的文件类型
      this.ctx.body = {
        code: 404,
        msg: '请上传png、jpg、gif格式图片',
      };
      return;
    }
    // var dataObj = new Date();
    // let localDir = path.join(__dirname,'../../public/upload'); // 获取public下的upload文件夹
    // // 用日期设置上传的图片文件夹名称
    // var dir = [dataObj.getFullYear(),
    // (dataObj.getMonth() + 1).toString().padStart(2, '0'), dataObj.getDate().toString().padStart(2, '0'),
    // ].join('');
    // localDir = path.join(localDir,dir); // 存放图片的路径
    // if(!fs.existsSync(localDir)){
    //     fs.mkdirSync(localDir);

    // }
    // let filePath = path.join(localDir,file.filename)
    // var rs = fs.createReadStream(file.filepath);
    // var ws = fs.createWriteStream(filePath);
    // rs.pipe(ws);
    // // 用户访问图片 网络地址
    // ctx.body ={
    //     code:200,
    //     msg:'上传成功',
    //     data:'/public/upload/' + dir + '/' + file.filename,
    // }
    // 代码实现：自动创建 20220517目录
    const date = new Date();
    const dirname = [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('');
    const projectPath = path.join(this.app.baseDir, 'app/public/upload');
    const dirPath = path.join(projectPath, dirname);
    // xxx/public/uploads/
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    // 自动生成一个文件名
    const filename = Date.now() + path.extname(file.filename);
    // 将文件从临时目录转移到指定目录
    const rs = fs.createReadStream(file.filepath);
    const ws = fs.createWriteStream(path.join(dirPath, filename));
    rs.pipe(ws);
    // 返回这个文件的URL
    // 在public 下  URL：/public/upload/dirname/filename
    this.ctx.body = {
      code: 200,
      msg: '上传成功',
      data: '/public/upload/' + dirname + '/' + filename,

    };
  }
}


module.exports = UploadController;
