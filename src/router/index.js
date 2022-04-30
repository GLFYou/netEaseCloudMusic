import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import playList from '@/views/playList/index.vue'
// import Comment from '@/views/Comment'
// import Play from '@/views/Play'
// import Play from '@/components/Play'

Vue.use(VueRouter)

//  避免到当前位置的冗余导航。 简单来说就是重复触发了同一个路由
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  { path: '/', redirect: '/layout' },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',

    children: [
      { path: 'home', component: Home },
      { path: 'search', component: Search },
      { path: 'playlist/:id', component: playList }
      // { path: 'comment', component: Comment }
    ]
  }
  // { path: '/play', component: Play, meta: { noAlive: true } } // true缓存 false不缓存}}
]

const router = new VueRouter({
  routes
})

export default router
