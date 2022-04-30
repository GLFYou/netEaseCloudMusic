<template>
  <div class="bgc" ref="bgc" :style="`background-image: url(${firstImg})`">
    <div class="box-container">
      <div class="title">推荐歌单</div>
      <van-grid :column-num="3" :gutter="10" clickable>
        <van-grid-item v-for="item in recommendList" :key="item.id" :icon="item.picUrl" :text="item.name" @click="changeListId(item.id, item.picUrl)" />
      </van-grid>
      <div class="title">最新音乐</div>
      <div class="newMusic-container">
        <SongItem v-for="item in newMusicList" :key="item.id" :songName="item.name" :id_="item.id" :author="item.song.artists[0].name" class="vancell"></SongItem>
        <!-- <van-cell v-for="item in newMusicList" :key="item.id" center :title="item.name" :label="item.song.artists[0].name" icon="play-circle-o" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from '@/api/index.js'
// import SongItem from '@/components/SongItem.vue'
export default {
  data() {
    return {
      resRe: {},
      recommendList: [],
      resNew: {},
      newMusicList: [],
      firstImg: ''
    }
  },
  methods: {
    // 将点击的歌单id存到store
    changeListId(listId, listImg) {
      // this.$store.commit('getRecommendListId', listId)
      this.$router.push({
        path: `/layout/playlist/${listId}`,
        query: {
          listImg
        }
      })
    }
  },
  async created() {
    // 获取推荐歌单
    this.resRe = await recommendMusicAPI(6)
    this.recommendList = this.resRe.data.result
    this.firstImg = this.recommendList[0].picUrl

    // 获取推荐新音乐
    this.resNew = await newMusicAPI(10)
    this.newMusicList = this.resNew.data.result
  },
  mounted() {
    this.$notify({
      message: '希望和悲伤，都是一缕光。总有一天，我们会再相遇。————丐版网抑云————',
      color: 'pink',
      background: 'rgba(0,0,0,.8)',
      duration: '4000'
    })
  }
}
</script>

<style lang="less" scoped>
.bgc {
  // background-image: url('../../assets/logo.png')
  // background-color: aqua;
  margin-bottom: 0;
  padding-bottom: 35px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
}
.box-container {
  margin: 0 0.2667rem;
  padding-top: 0.2667rem;
  .title {
    height: 0.8rem;
    padding-left: 0.5333rem;
    background-color: rgba(239, 161, 161, 0.6);
    backdrop-filter: blur(5px);
    box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.1);

    font-size: 14px;
    line-height: 0.8rem;
    border-radius: 0.4rem;
  }
  .van-grid {
    margin: 0.2667rem 0;
  }
  /deep/.van-grid-item {
    .van-icon__image {
      border-radius: 0.2667rem;
    }
    .van-grid-item__content {
      border: 0.1333rem solid transparent;
      border-radius: 0.2667rem;
      box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.2);
      padding: 0.1333rem 0;
      background-color: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(5px);
    }
    .van-grid-item__text {
      width: 2.5333rem;
      color: black;

      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .van-grid-item__content::after {
      border: 0;
    }
  }
  /deep/ .newMusic-container {
    margin-top: 0.2667rem;
    .vancell {
      margin-bottom: 0.2667rem;
      backdrop-filter: blur(5px);
    }
  }
}
</style>
