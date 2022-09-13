import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue'),
    children: [
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../views/SettingView.vue'),
        meta: { title: '网站设置', icon: 'el-icon-s-tools', visible: true }
      },
      {
        path: 'wheel',
        name: 'wheel',
        component: () => import('../views/WheelView.vue'),
        meta: { title: '轮播管理', icon: 'el-icon-shouyelunbotu', visible: true }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
        meta: { title: '产品管理', icon: 'el-icon-chanpinguanli', visible: true },
        children: [
          {
            path: 'add',
            name: 'add-product',
            component: () => import('../views/ProductAdd.vue'),
            meta: { title: '添加产品', visible: true }
          },
          {
            path: 'list',
            name: 'list-product',
            component: () => import('../views/ProductList.vue'),
            meta: { title: '产品列表', visible: true }
          },
          {
            path: 'edit/:id',
            name: 'edit-product',
            component: () => import('../views/EditProduct.vue'),
            meta: { title: '编辑产品', visible: false }
          }
        ]
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('../views/NewsView.vue'),
        meta: { title: '新闻管理', icon: 'el-icon-xinwen', visible: true },
        children: [
          {
            path: 'add',
            name: 'add-news',
            component: () => import('../views/NewsAdd.vue'),
            meta: { title: '添加新闻', visible: true }
          },
          {
            path: 'list',
            name: 'list-news',
            component: () => import('../views/NewsList.vue'),
            meta: { title: '新闻列表', visible: true }
          },
          {
            path: 'edit/:id',
            name: 'edit-news',
            component: () => import('../views/EditNews.vue'),
            meta: { title: '编辑新闻', visible: false }
          }
        ]
      },
      {
        path: 'page',
        name: 'page',
        component: () => import('../views/PageView.vue'),
        meta: { title: '单页管理', icon: 'el-icon-zidingyiyemian', visible: true },
        children: [
          {
            path: 'add',
            name: 'add-page',
            component: () => import('../views/PageAdd.vue'),
            meta: { title: '添加页面', visible: true }
          },
          {
            path: 'list',
            name: 'list-page',
            component: () => import('../views/PageList.vue'),
            meta: { title: '页面列表', visible: true }
          },
          {
            path: 'edit/:id',
            name: 'edit-page',
            component: () => import('../views/EditPage.vue'),
            meta: { title: '编辑页面', visible: false }
          }
        ]
      },
      {
        path: 'coop',
        name: 'cooperate',
        component: () => import('../views/CooperateView.vue'),
        meta: { title: '合作意向', icon: 'el-icon-hezuohuoban', visible: true }
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (to.name === 'login' || token) {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
