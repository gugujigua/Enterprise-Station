export default {
  install (Vue, options) {
    Vue.filter('date', function (val, format = 'yyyy-MM-dd') {
      if (/^\d+$/.test(val)) {
        val = String(val)
        val = val.padEnd(13, '0') * 1
      }
      if (!isNaN(val)) {
        val *= 1
      }
      const date = new Date(val)
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
          const str = o[k] + ''
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
      }
      return format
    })
  }
}
