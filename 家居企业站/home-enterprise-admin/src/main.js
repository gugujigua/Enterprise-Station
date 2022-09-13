import Vue from 'vue'
import 'u-reset.css'
import './assets/fonts/iconfont.css'
import '../src/assets/css/common.scss'
import App from './App.vue'
import api from './api'
import router from './router'
import Filter from './utils/filter'
import {
  Button, Form, FormItem, Input, Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Upload,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Dialog,
  Card,
  Message,
  DatePicker,
  MessageBox,
  Pagination

} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.use(Filter)
Vue.prototype.api = api
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false
// api = {login{login},info{one,edit}}
Vue.prototype.api = api
new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
