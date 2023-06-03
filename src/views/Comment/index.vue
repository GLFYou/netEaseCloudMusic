<template>
  <div class="comment">comment</div>
</template>

<script>
import { getCommentAPI } from '@/api/index'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      commentList: []
    }
  },
  computed: {
    ...mapState(['id'])
  },
  async created() {
    const res = await getCommentAPI()
  }
}
</script>

<style lang="less" scoped>
.comment {
  z-index: 9999999;
}
</style>
