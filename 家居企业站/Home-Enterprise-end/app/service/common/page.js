'use strict';

const Service = require('egg').Service;

class PageService extends Service {
  async all() {
    // ?page=1&limit=5
    const page = this.ctx.query.page || 1;
    const limit = this.ctx.query.limit * 1 || 4;
    const offset = (page - 1) * limit;
    const allData = await this.app.mysql.query('select id from page');
    const total = allData.length;
    const sql = 'select id,title,content,create_time,update_time from page limit ?,?';
    const data = await this.app.mysql.query(sql, [ offset, limit ]);
    const pages = Math.ceil(total / limit);
    return { data, total, pages };
  }
  async add(data) {
    const sql = 'insert into page (title,content,create_time,update_time)value(?,?,?,?)';
    return await this.app.mysql.query(sql, [ data.title, data.content || '', Date.now(), Date.now() ]);
  }
  async one(id) {
    return await this.app.mysql.query('select * from page where id=?', [ id ]);
  }
  async edit(data, id) {
    const sql = 'update page set title=?,content=?,update_time=? where id=' + id;
    return await this.app.mysql.query(sql, [ data.title, data.content, Date.now() ]);
  }
  async del(id) {
    const sql = 'delete from page where id=' + id;
    return await this.app.mysql.query(sql);
  }
}

module.exports = PageService;
