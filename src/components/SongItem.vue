<template>
  <div>
    <van-cell class="vancell" center :title="songName" :label="author" icon="play-circle-o" @click="playFn(id_, idArr)" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    songName: String, // 歌名
    author: String, // 作者
    id_: Number, // id
    idArr: Array // 播放列表id
  },
  methods: {
    ...mapMutations(['getId', 'getIdArr']),
    playFn(id_, idArr) {
      this.getId(id_)
      this.getIdArr(idArr)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .vancell {
  border-radius: 10px !important;
}
</style>
