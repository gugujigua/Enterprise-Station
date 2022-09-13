'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async all() {
    // ?page=1&limit=5
    const page = this.ctx.query.page || 1;
    const limit = this.ctx.query.limit * 1 || 6;
    const offset = (page - 1) * limit;
    const allData = await this.app.mysql.query('select id from news');
    const total = allData.length;
    const sql = 'select id,title,description,thumb,create_time,update_time from news limit ?,?';
    const data = await this.app.mysql.query(sql, [ offset, limit ]);
    const pages = Math.ceil(total / limit);
    return { data, total, pages };
  }
  async add(data) {
    const sql = 'insert into news (title,description,content,create_time,update_time,thumb)value(?,?,?,?,?,?)';
    return await this.app.mysql.query(sql, [ data.title, data.description, data.content || '', Date.now(), Date.now(), data.thumb ]);
  }
  async one(id) {
    return await this.app.mysql.query('select * from news where id=?', [ id ]);
  }
  async getPrevNext(id) {
    const prevSql = 'select id,title from news where id<' + id + ' order by id desc limit 1';
    const prev = await this.app.mysql.query(prevSql);
    const nextSql = 'select id,title from news where id>' + id + ' order by id asc limit 1';
    const next = await this.app.mysql.query(nextSql);
    return { prev, next };
  }
  async edit(data, id) {
    const sql = 'update news set title=?,description=?,thumb=?,content=?,update_time=? where id=' + id;
    return await this.app.mysql.query(sql, [ data.title, data.description, data.thumb, data.content, Date.now() ]);
  }
  async del(id) {
    const sql = 'delete from news where id=' + id;
    return await this.app.mysql.query(sql);
  }
}

module.exports = NewsService;
