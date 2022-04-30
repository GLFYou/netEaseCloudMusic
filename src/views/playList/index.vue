<template>
  <div class="bgc" :style="`background-image:url(${listImg});`">
    <div class="limit"></div>
    <div class="container">
      <div class="title">
        {{ listName }}
      </div>
      <div class="musicList">
        <SongItem v-for="item in songList" :key="item.id" :songName="item.name" :id_="item.id" :author="item.ar[0].name" class="vancell song-item"></SongItem>
      </div>
    </div>
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue'
import { getListMusicAPI } from '@/api/index.js'
export default {
  name: 'PlayList',
  components: {
    SongItem
  },
  props: {
    listInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return { songList: [], listName: '', listDesc: '', listImg: '' }
  },
  methods: {
    async getListMusic() {
      const res = await getListMusicAPI(this.$route.params.id)
      this.listName = res.data.playlist.name
      this.songList = res.data.playlist.tracks
      this.listImg = this.$route.query.listImg
      console.log(this.listImg)
      console.log(res)
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
  margin-bottom: 0;
  padding-bottom: 35px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  .limit {
    height: 0.2667rem;
  }
}
.container {
  margin: 0 0.2667rem;
}
.title {
  height: 1.0667rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0 0.2667rem;
  padding: 0 0.2667rem;
  border-radius: 0 0 0.4rem 0.4rem;
  backdrop-filter: blur(5px);
  background-color: rgba(239, 161, 161, 0.6);
  box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.1);
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.0667rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.musicList {
  margin: 1.0667rem 0;
  .song-item {
    margin-bottom: 0.2667rem;
    backdrop-filter: blur(5px);
  }
}
</style>
