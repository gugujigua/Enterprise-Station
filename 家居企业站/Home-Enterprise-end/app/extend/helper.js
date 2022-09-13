'use strict'
const crypto = require('crypto');
module.exports = {
    /**
     * 加密函数
     * @param {*} password 原始密码
     * @param {*} secretKey 加密密钥
     * @returns 40位16进制加密密码
     */
    encryptPass(password, secretKey) {
        var hmac = crypto.createHmac('sha1', secretKey);
        hmac.update(password);
        const pass = hmac.digest('hex')
        const sha1 = crypto.createHash('sha1');
        sha1.update(pass)
        return sha1.digest('hex');
    },
    formatDate(ts){
        var d = new Date(ts)
        var ymd = [
            d.getFullYear(),
            (d.getMonth()+1).toString().padStart(2,'0'),
            d.getDate().toString().padStart(2,'0')
        ].join('-');
        const hms = [
            d.getHours().toString().padStart(2,'0'),
            d.getMinutes().toString().padStart(2,'0'),
            d.getSeconds().toString().padStart(2,'0')
        ].join(':')
        return ymd + ' ' + hms;
    }
};