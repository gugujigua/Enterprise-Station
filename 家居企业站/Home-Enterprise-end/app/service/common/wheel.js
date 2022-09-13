'use strict';

const Service = require('egg').Service;

class WheelService extends Service {
  async all() {
    return await this.app.mysql.query('select * from wheel');
  }
  async add(data) {
    const sql = 'insert into wheel (title,thumb,link,sort)values(?,?,?,?)';
    return this.app.mysql.query(sql, [ data.title, data.thumb, data.link, data.sort ]);
  }
  // 获取数据
  async one(id) {
    const sql = 'select id,title,thumb,link,sort from wheel where id=' + id;
    return await this.app.mysql.query(sql);
  }
  async edit(data, id) {
    let dataStr = '';
    for (const i in data) {
      dataStr += i + '="' + data[i] + '",';
    }
    dataStr = dataStr.slice(0, -1);
    const sql = 'update wheel set ' + dataStr + 'where id=' + id;
    return await this.app.mysql.query(sql);
  }
  async del(id) {
    const sql = 'delete from wheel where id =' + id;
    return await this.app.mysql.query(sql);
  }
}


module.exports = WheelService;
