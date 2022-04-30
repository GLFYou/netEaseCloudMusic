import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/reset.css'
import '@/mobile/flexible.js'
import 'vant/lib/index.less'
import SongItem from '@/components/SongItem.vue'
import Play from '@/components/Play/index.vue'
import { Notify, Button, Icon, NavBar, Tabbar, TabbarItem, Grid, GridItem, Cell, CellGroup, Search, List } from 'vant'

Vue.use(List)
Vue.use(Search)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Button)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Notify)

// 注册全局组件
Vue.component('SongItem', SongItem)
Vue.component('Play', Play)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
