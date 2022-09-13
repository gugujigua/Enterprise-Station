'use strict';

const Service = require('egg').Service;

class InfoService extends Service {
    async one() {
        return await this.app.mysql.query("select * from info where id=1")

    }
    async update(data) {
        let dataStr = '';
        for (const i in data) {
            dataStr += i + '="' + data[i] + '",';
        }
        dataStr = dataStr.slice(0,-1); // 去掉逗号
        console.log(dataStr);
        //title="家具企业网站11",keywords="家居，家具",description="这是一个家具网站",helpline="",telephone="",address="
        // 北京市",sales_hotline="",copyright="",
        console.log("update info set " + dataStr + " where id=1");
        return await this.app.mysql.query("update info set " + dataStr + " where id=1");
        
    }
}
module.exports = InfoService;