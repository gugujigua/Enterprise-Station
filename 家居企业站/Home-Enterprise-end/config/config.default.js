/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1652333335986_5729';

  // add your middleware config here
  config.middleware = [];
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.multipart = {
    mode: 'file',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    adminJwtSecretKey: 'home-furnishing-2202',
    adminSecretKey: 'home-furnishing-2022',

  };

  return {
    ...config,
    ...userConfig,
  };
};
