<template>
  <div class="bgc" :style="`background-image:url(${listImg});`">
    <div class="limit"></div>
    <div class="container" v-if="songList.length">
      <div class="title">
        {{ listName }}
      </div>
      <div class="musicList">
        <SongItem v-for="item in songList" :key="item.id" :songName="item.name" :id_="item.id" :author="item.ar[0].name" :idArr="ids" class="vancell song-item"></SongItem>
      </div>
    </div>
    <div class="loading" v-else><img src="@/assets/images/loading.gif" /></div>
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue'
import { getListMusicIdAPI, getSongByIdAPI } from '@/api/index.js'
export default {
  name: 'PlayList',
  components: {
    SongItem
  },
  // props: {
  //   listInfo: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  data() {
    return { songList: [], songIdList: [], listName: '', listDesc: '', listImg: '', ids: [] }
  },
  methods: {
    // 获取歌单所有歌曲id
    async getListMusic() {
      this.songList = []
      this.listImg = ''
      this.listName = ''
      this.ids = []
      const res = await getListMusicIdAPI(this.$route.params.id)
      this.listName = res.data.playlist.name
      this.listImg = this.$route.query.listImg
      // this.songList = res.data.playlist.tracks
      this.songIdList = res.data.playlist.trackIds
      this.songIdList.forEach((item) => {
        this.ids.push(item.id)
      })
      // 通过ids获取歌曲详情
      if (this.ids.length) {
        const songRes = await getSongByIdAPI(this.ids.join())
        this.songList = songRes.data.songs
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === `/layout/playlist/${to.params.id}`) {
        this.getListMusic()
      }
    }
  },
  created() {
    this.getListMusic()
  }
}
</script>

<style lang="less" scoped>
.bgc {
  position: relative;
  margin-bottom: 0;
  padding-bottom: 35px;
  // background-repeat: no-repeat;
  background-size: auto;
  background-position-x: 50%;
  min-height: 100vh;
  .limit {
    height: 50px;
  }
}
.container {
  margin: 0 0.2667rem;
}
.title {
  height:50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0 0.2667rem;
  padding: 0 0.2667rem;
  border-radius: 0 0 10px 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(239, 161, 161, 0.6);
  box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.1);
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height:50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.musicList {
  margin: 10px 0;
  .song-item {
    margin-bottom: 10px;
    backdrop-filter: blur(5px);
  }
}
.loading {
  position: absolute;
  top: 50vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 100%;
  img {
    width: 100%;
    transform: scale(4.2);
  }
}
</style>
