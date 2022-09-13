'use strict';

const Service = require('egg').Service;

class CooperateService extends Service {
  async one(id) {
    return await this.app.mysql.query('select * from cooperate where id=?', [ id ]);
  }
  async all() {
    // ?page=1&limit=5
    let term = '';
    let dateTerm = '';
    let searchTerm = '';
    console.log(this.ctx.query.date);
    if (this.ctx.query.date) {
      this.ctx.query.date *= 1;
      console.log(this.ctx.query.date);
      const start = this.ctx.query.date;
      const end = this.ctx.query.date + 24 * 60 * 60 * 1000;
      dateTerm = ' create_time between ' + start + ' and ' + end + ' ';
    }
    if (this.ctx.query.name) {
      searchTerm = 'name like "%' + this.ctx.query.name + '%" ';
    }
    if (dateTerm) {
      term = ' where ' + dateTerm;
      if (searchTerm) {
        term += ' and' + searchTerm;
      }
    } else {
      if (searchTerm) {
        term = ' where ' + searchTerm;
      }
    }
    const page = this.ctx.query.page || 1;
    const limit = this.ctx.query.limit * 1 || 4;
    const offset = (page - 1) * limit;
    const allData = await this.app.mysql.query('select id from cooperate ' + term);
    console.log(allData);
    const total = allData.length;
    const sql = 'select id,name,contact,msg,create_time from cooperate  ' + term + ' limit ?,?';
    console.log(sql);
    const data = await this.app.mysql.query(sql, [ offset, limit ]);
    return { data, total };
  }
  async add(data) {
    const sql = 'insert into cooperate(name,contact,msg,create_time)value(?,?,?,?)';
    return await this.app.mysql.query(sql, [ data.name, data.contact, data.msg, Date.now() ]);
  }
  async del(id) {
    const sql = 'delete from cooperate where id=' + id;
    return await this.app.mysql.query(sql);
  }

}

module.exports = CooperateService;
