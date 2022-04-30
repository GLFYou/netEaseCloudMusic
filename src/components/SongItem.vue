<template>
  <div>
    <van-cell class="vancell" center :title="songName" :label="author" icon="play-circle-o" @click="playFn(id_)" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    songName: String, // 歌名
    author: String, // 作者
    id_: Number // id
  },
  // computed: {
  //   ...mapState(['songId'])
  // },
  methods: {
    ...mapMutations(['getId']),
    playFn(id_) {
      // this.$router.push({ path: '/play', query: { id: this.id } })
      // console.log(this.id)
      this.getId(id_)
    }
  }
}
</script>

<style></style>
