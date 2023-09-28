<template>
  <div class="bgc" ref="bgc" :style="`background-image: url(${firstImg})`">
    <div class="box-container">
      <div class="logoBox"><img src="@/assets/images/logo.png" alt="" /><span>网抑云音乐</span></div>
      <div class="recommend-container" v-if="recommendList.length">
        <div class="title">推荐歌单</div>
        <van-grid :column-num="3" :gutter="10" clickable>
          <van-grid-item v-for="item in recommendList" :key="item.id" :icon="item.picUrl" :text="item.name" @click="changeListId(item.id, item.picUrl)" />
        </van-grid>
      </div>
      <div class="newMusic-container" v-if="newMusicList.length">
        <div class="title">最新音乐</div>
        <SongItem v-for="item in newMusicList" :key="item.id" :songName="item.name" :id_="item.id" :author="item.song.artists[0].name" :idArr="songIdArr" class="vancell"></SongItem>
        <!-- <van-cell v-for="item in newMusicList" :key="item.id" center :title="item.name" :label="item.song.artists[0].name" icon="play-circle-o" /> -->
      </div>
      <div class="singers-container" v-if="singerList.length">
        <div class="title">热门歌手</div>
        <div class="singer-item" v-for="(item, index) in singerList" :key="item.id" @click="changeSingerId(item.id, item.picUrl)">
          <span class="singer-ranking">{{ index + 1 }}</span>
          <span class="singer-name">{{ item.name }}</span>
          <div class="singer-img"><img v-lazy="item.picUrl" alt="" /></div>
        </div>
      </div>
      <div class="loading" v-if="!recommendList.length || !newMusicList.length || !singerList.length"><img src="@/assets/images/loading.gif" /></div>
    </div>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI, hotSingersAPI } from '@/api/index.js'
// import SongItem from '@/components/SongItem.vue'
export default {
  data() {
    return {
      recommendList: [],
      newMusicList: [],
      singerList: [],
      firstImg: '',
      songIdArr: []
    }
  },
  methods: {
    // 路由跳转，携带歌单id，封面
    changeListId(listId, listImg) {
      // this.$store.commit('getRecommendListId', listId)
      this.$router.push({
        path: `/layout/playlist/${listId}`,
        query: {
          listImg
        }
      })
    },
    // 路由跳转，携带歌手id，封面
    changeSingerId(singerId, singerImg) {
      // this.$store.commit('getRecommendListId', listId)
      this.$router.push({
        path: `/layout/singersongslist/${singerId}`,
        query: {
          singerImg
        }
      })
    }
  },
  async created() {
    // 获取推荐歌单
    const resRe = await recommendMusicAPI(6)
    this.recommendList = resRe.data.result
    this.firstImg = this.recommendList[0].picUrl

    // 获取推荐新音乐
    const resNew = await newMusicAPI(10)
    this.newMusicList = resNew.data.result
    this.newMusicList.forEach((item) => {
      this.songIdArr.push(item.id)
    })
    // 获取热门歌手
    const resSinger = await hotSingersAPI()
    this.singerList = resSinger.data.artists
    // console.log(this.singerList)
  },
  mounted() {
    this.$notify({
      message: '希望和悲伤，都是一缕光。总有一天，我们会再相遇。',
      color: 'pink',
      background: 'rgba(0,0,0,.8)',
      duration: '5000'
    })
  }
}
</script>

<style lang="less" scoped>
.loading {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 100%;
  img {
    width: 100%;
    transform: scale(4.2);
  }
}
.bgc {
  margin-bottom: 0;
  padding-bottom: 35px;
  background-size: auto;
  background-position-x: 50%;
}
.box-container {
  margin: 0 0.2667rem;
  padding-top: 10px;
  .logoBox {
    margin-bottom: 15px;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: rgb(255, 255, 255);
    img {
      width: 50px;
      height: 100%;
      object-fit: contain;
      margin-right: 15px;
    }
    span {
      padding: 3px 20px;
      background: rgba(45, 45, 45, 0.5);
      border-radius: 100px;
      backdrop-filter: blur(10px);
      border: 2px dotted #ff517f;
    }
  }
  .title {
    margin: 15px 0;
    height: 40px;
    padding-left: 20px;
    background-image: -webkit-linear-gradient(left, rgba(255, 148, 198, 0.587), transparent);
    backdrop-filter: blur(5px);
    box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.1);
    font-size: 14px;
    line-height: 40px;
    border-radius: 10px;
    border: 2px dotted #fff;
  }
  /deep/.van-grid-item {
    .van-icon__image {
      border-radius: 10px;
      width: 100%;
    }
    .van-grid-item__content {
      border: 0.1333rem solid transparent;
      border-radius: 10px;
      box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.2);
      padding: 0;
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
    margin-top: 10px;
    .vancell {
      margin-bottom: 10px;
      backdrop-filter: blur(5px);
    }
  }
  .singers-container {
    margin-top: 10px;
  }
  .singer-item {
    position: relative;
    width: 100%;
    height: 7.68rem;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: rgba(130, 130, 130, 0.7);
    .singer-ranking {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 87px;
      line-height: 87px;
      padding: 0 20px;
      border-bottom: 5px dotted pink;
      border-radius: 10px 10px 10px 0;
      font-size: 50px;
      backdrop-filter: blur(5px);
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      text-align: center;
    }
    .singer-name {
      position: absolute;
      top: 92px;
      left: 0px;
      padding: 8px;
      border-radius: 0 0 10px 10px;
      backdrop-filter: blur(5px);
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      font-size: 16px;
      text-align: center;
      writing-mode: vertical-lr;
    }
    .singer-img {
      width: 100%;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
