<template>
  <div class="bgc" :style="`background-image:url(${singerImg});`">
    <div class="limit"></div>
    <div class="container" v-if="songList.length">
      <div class="title">
        {{ singerName }}
      </div>
      <div class="singerDesc">{{ singerDesc }}</div>
      <div class="musicList">
        <SongItem v-for="item in songList" :key="item.id" :songName="item.name" :id_="item.id" :author="item.ar[0].name" :idArr="songIdArr" class="vancell song-item"></SongItem>
      </div>
    </div>
    <div class="loading" v-else><img src="@/assets/images/loading.gif" /></div>
  </div>
</template>

<script>
import { getSingerSongsAPI } from '@/api/index.js'
import SongItem from '@/components/SongItem.vue'

export default {
  name: 'SingerSongsList',
  components: {
    SongItem
  },
  data() {
    return { songList: [], singerName: '', singerDesc: '', singerImg: '', songIdArr: [] }
  },
  methods: {
    async getSingerSongs() {
      this.songList = []
      this.singerImg = ''
      this.singerName = ''
      this.singerDesc = ''
      const res = await getSingerSongsAPI(this.$route.params.id)
      this.songList = res.data.hotSongs
      this.songList.forEach((item) => {
        this.songIdArr.push(item.id)
      })
      this.singerName = res.data.artist.name
      this.singerDesc = res.data.artist.briefDesc
      this.singerImg = this.$route.query.singerImg
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === `/layout/singersongslist/${to.params.id}`) {
        this.getSingerSongs()
      }
    }
  },
  created() {
    this.getSingerSongs()
  }
}
</script>

<style lang="less" scoped>
.bgc {
  position: relative;
  margin-bottom: 0;
  padding-bottom: 35px;
  background-size: auto;
  background-position-x: 50%;
  min-height: 100vh;
  .limit {
    height: 50px;
  }
}
.container {
  overflow: hidden;
  margin: 0 0.2667rem;
}
.title {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0 0.2667rem;
  padding: 0 0.2667rem;
  border-radius: 0 0 10px 10px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.singerDesc {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  border-radius:10px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}
.musicList {
  margin-bottom: 1.0667rem;
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
