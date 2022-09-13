'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // const checkLogin = middleware.checkLogin();
  const getCommonData = middleware.getCommonData();
  const jwt = middleware.jwt({ secret: app.config.adminJwtSecretKey });
  /* 客户端路由 */
  // 首页
  router.get('/', getCommonData, controller.client.home.index);
  // 合作意向 联系我们
  router.post('/', getCommonData, controller.client.home.addCooperate);
  router.post('/contact', getCommonData, controller.client.home.addCooperate);
  // 关于我们
  router.get('/about', getCommonData, controller.client.home.about);
  // 产品列表
  router.get('/product', getCommonData, controller.client.home.product);
  // 产品详情
  router.get('/product/:id', getCommonData, controller.client.home.productShow);
  // 办公家具
  router.get('/office', getCommonData, controller.client.home.office);
  // 公寓家具
  router.get('/apartment', getCommonData, controller.client.home.apartment);
  // 酒店家具
  router.get('/hotel', getCommonData, controller.client.home.hotel);
  // 新闻中心
  router.get('/news', getCommonData, controller.client.home.news);
  // 新闻详情
  router.get('/news/:id', getCommonData, controller.client.home.newsShow);
  // 联系我们
  router.get('/contact', getCommonData, controller.client.home.contact);


  /* 管理端路由 */
  router.resources('/api/login', controller.api.login);
  router.resources('/api/info', jwt, controller.api.info);
  router.resources('/api/product', jwt, controller.api.product);
  router.resources('/api/news', jwt, controller.api.news);
  router.resources('/api/wheel', jwt, controller.api.wheel);
  router.resources('/api/page', controller.api.page);
  router.resources('/api/upload', jwt, controller.api.upload);
  router.resources('/api/coop', controller.api.coop);


};
