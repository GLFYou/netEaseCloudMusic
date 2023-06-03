<template>
  <div class="layout">
    <!-- 中间视图 -->
    <!-- 路由缓存 -->
    <keep-alive>
      <!-- 中间主要部分 -->
      <router-view></router-view>
    </keep-alive>
    <!-- 播放界面 -->
    <Play :key="key"></Play>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route active-color="rgb(243, 87, 113)" :border="false">
      <van-tabbar-item icon="home-o" replace to="/layout/home"></van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/layout/search"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      key: 0
    }
  },
  computed: {
    ...mapState(['id'])
  },
  watch: {
    id() {
      this.key += 1
    }
  }
}
</script>

<style lang="less" scoped>

/deep/.van-tabbar {
  height: 40px;
  border-radius: 0.2667rem 0.2667rem 0 0;
  z-index: 9990;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
}

/deep/.van-tabbar-item--active {
  background-color: transparent
  // backdrop-filter: blur(5px);

  // background-image: -webkit-radial-gradient(rgba(0, 255, 255, 0.296) 5%, rgba(255, 192, 203, 0.615) 80%);
}
// .play-container {
// margin-bottom: 410px;
// position: fixed;
// height: 100%;
// z-index: 777;
// overflow: hidden;

// left: 50%;
// transform: translateX(-50%);
// width: 50px;
// height: 50px;
// background-color: rgb(221, 140, 140);
// }
</style>
