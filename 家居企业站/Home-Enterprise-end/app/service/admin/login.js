'use strict';

const Service = require('egg').Service;
class LoginService extends Service {
  async checkLogin2(data) {
    const result = await this.app.mysql.query('select * from admin where username=?', [ data.username ]);
    if (result[0]) {
      // 验证密码 jiami(data.password) === result[0].password
      const pass = this.ctx.helper.encryptPass(data.password, this.app.config.adminSecretKey);
      if (pass === result[0].password) {
        const token = this.app.jwt.sign({ username: data.username }, this.app.config.jwt.adminJwtSecretKey);
        console.log(token);
        return {
          code: 200,
          msg: '登陆成功',
          data: token,
        };
      }
      return {
        code: 404,
        msg: '密码错误',
      };
    }
    return {
      code: 404,
      msg: '账号不存在',
    };

  }
  async checkLogin(data) {
    const result = await this.app.mysql.query('select * from admin where username=?', [ data.username ]);
    if (result[0]) {
      // 验证密码 jiami(data.password) === result[0].password
      const pass = this.ctx.helper.encryptPass(data.password, this.app.config.adminSecretKey);
      if (pass === result[0].password) {
        this.ctx.session.isLogin = true;
        this.ctx.session.username = data.username;
        // 登录成功
        return true;
      }
      // 密码错误
      return false;

    }
    // 账号不存在
    return false;

  }
  async changePass(oldpass, newpass) {
    const username = this.ctx.session.username;
    const data = await this.app.mysql.query('select * from admin where username=?', [ username ]);
    console.log(data);
    if (data[0]) {
      console.log(data[0].password);
      console.log(this.ctx.helper.encryptPass(oldpass, this.app.config.adminSecretKey));
      if (data[0].password === this.ctx.helper.encryptPass(oldpass, this.app.config.adminSecretKey)) {
        const secretNewPass = this.ctx.helper.encryptPass(newpass, this.app.config.adminSecretKey);
        const sql = 'update admin set password=?where username=?';
        const result = await this.app.mysql.query(sql, [ secretNewPass, username ]);
        if (result.affectedRows > 0) {
          // 要修改成功 重新登录  this.ctx.session = null;
          return true;
        }
      }
    }
    return false;

  }
}
module.exports = LoginService;
