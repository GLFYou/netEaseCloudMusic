import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/reset.css'
import '@/mobile/flexible.js'
import 'vant/lib/index.less'
import SongItem from '@/components/SongItem.vue'
import Play from '@/components/Play/index.vue'
import defaultImg from '@/assets/images/defaultImg.png'
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
// 图片懒加载指令
Vue.directive('lazy', {
  inserted(el, binding) {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      },
      {
        threshold: 0.01
      }
    )
    observer.observe(el)
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
