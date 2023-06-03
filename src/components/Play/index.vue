<template>
  <div>
    <transition name="play-tran">
      <div class="play" v-show="showPlay">
        <!-- 模糊背景(靠样式设置), 固定定位 -->
        <div class="song-bg" :style="`background-image: url(${songInfo && songInfo.al && songInfo.al.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0);`"></div>
        <!-- <div class="song-bg" :style="`background-image: url(${songInfo.al.picUrl});`"></div> -->
        <!-- 播放页头部导航 -->
        <!-- <div class="header">
      <van-icon name="arrow-left" size="20" class="left-incon" @click="$router.back()" />
    </div> -->
        <!-- 歌曲名 -->
        <h2 class="m-song-h2">
          <span class="m-song-sname">{{ songInfo.name }}-{{ songInfo && songInfo.ar && songInfo.ar[0].name }}</span>
        </h2>
        <!-- 留声机 - 容器 -->
        <div class="song-wrapper">
          <!-- 留声机本身(靠css动画做旋转) -->
          <div class="song-turn ani" :style="`animation-play-state:${playState ? 'running' : 'paused'}`">
            <div class="song-img">
              <!-- &&写法是为了防止报错, 有字段再继续往下访问属性 -->
              <img style="width: 100%" :src="`${songInfo && songInfo.al && songInfo.al.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`" alt="" />
              <!-- <img style="width: 100%" :src="songInfo.al.picUrl" alt="" /> -->
            </div>
          </div>
          <!-- 播放按钮 -->
          <div class="start-box" @click="audioStart">
            <span class="song-start" v-show="!playState"></span>
            <span class="song-stop" v-show="playState"></span>
          </div>
          <!--上一首 -->
          <div class="pre-song" @click="playPrevious">
            <svg t="1651474558237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4715" width="200" height="200">
              <path
                d="M224.8 907.5c0 9.5-3.8 18.6-10.5 25.4-6.7 6.7-15.9 10.5-25.4 10.5h-71.7c-9.5 0-18.6-3.8-25.4-10.5-6.7-6.7-10.5-15.9-10.5-25.4v-789c0-9.5 3.8-18.6 10.5-25.4 6.7-6.7 15.8-10.5 25.4-10.5h71.7c19.8 0 35.9 16.1 35.9 35.9v789z m717.2-784c-0.2-19.1-10.2-36.7-26.5-46.6l-8.6-4.3c-17.4-11.4-40-11.4-57.4 0L320.9 446.3c-14.3 10-22.8 26.3-23 43.8v44.5c0.1 17.4 8.7 33.8 23 43.8l528.6 371.5c17.4 11.4 40 11.4 57.4 0l8.6-4.3c16.4-9.8 26.5-27.5 26.5-46.6V123.5z m0 0"
                fill="#ffffff"
                p-id="4716"
              ></path>
            </svg>
          </div>
          <!-- 下一首 -->
          <div class="next-song" @click="playNext">
            <svg t="1651473182445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3696" width="200" height="200">
              <path
                d="M941.9 116v788.8c0 9.5-3.8 18.6-10.5 25.4-6.7 6.7-15.8 10.5-25.4 10.5h-71.7c-9.5 0-18.6-3.8-25.3-10.5-6.7-6.7-10.5-15.8-10.5-25.4V116c0-9.5 3.8-18.6 10.5-25.4 6.7-6.7 15.8-10.5 25.3-10.5H906c9.5 0 18.6 3.8 25.4 10.5 6.7 6.7 10.5 15.9 10.5 25.4z m-768-43.1c-17.4-11.4-39.9-11.4-57.4 0l-8.6 4.3c-15.6 9.3-25.5 25.7-26.5 43.7v778c0.2 19.1 10.2 36.7 26.5 46.6l8.6 4.3c17.5 11.1 39.8 11.1 57.4 0l528.5-371.4c14.3-10 22.8-26.3 22.9-43.7v-44.5c-0.1-17.4-8.7-33.7-22.9-43.7L173.9 72.9z m0 0"
                fill="#ffffff"
                p-id="3697"
              ></path>
            </svg>
          </div>

          <!-- 播放歌词容器 -->
          <div class="song-msg">
            <!-- 歌词部分-随着时间切换展示一句歌词 -->
            <div class="lrcContent">
              <p class="lrc0">{{ preLyric }}</p>
              <p class="lrc">{{ curLyric }}</p>
              <p class="lrc0">{{ nextLyric }}</p>
            </div>
          </div>
          <!-- 留声机 - 唱臂 -->
          <div class="needle" :style="`transform: rotate(${needleDeg};`"></div>
        </div>
        <!-- 播放音乐真正的标签
      看接口文档: 音乐地址需要带id去获取(但是有的歌曲可能404)
      https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
    -->
        <audio class="controls" ref="audio" preload="true" :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`" controls autoplay></audio>
        <!-- 评论 -->
        <!-- 评论按钮 -->
        <div class="commentBtn" @click="getComment">评论</div>
        <!-- 评论页面 -->
        <transition name="comment-tran">
          <div class="comment-container" v-show="showComment">
            <van-list v-if="commentList.length" v-model="loading" :finished="finished" finished-text="老板,暂时没有更多评论了喔 ლ(╹ε╹ლ)" :immediate-check="false" @load="onLoad">
              <!-- <div class="noCommentTip" v-if="!commentList.length">老板,暂时没有评论哦~</div> -->
              <div class="comment-item" v-for="(item, index) in commentList" :key="index">
                <div class="commentBgc" :style="`background-image: url(${item.user.avatarUrl});`"></div>
                <span class="commentUser">{{ item.user.nickname }}</span
                ><span class="commentDate">{{ item.timeStr }}</span>
                <div class="commentContent">
                  {{ item.content }}
                </div>
                <div class="loveCount">
                  <svg t="1649872604115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3263" width="200" height="200">
                    <path
                      d="M913.92 208.384c-98.816-98.816-258.56-98.816-357.376 0l-41.984 41.984-41.984-41.984c-98.816-98.816-258.56-98.816-357.376 0-98.304 98.816-98.304 258.56 0.512 357.376l52.224 52.224 337.408 337.408c5.632 5.632 14.336 5.632 19.968 0l337.408-337.408 52.224-52.224c97.792-98.816 97.792-258.56-1.024-357.376z"
                      fill="#FC053B"
                      p-id="3264"
                    ></path></svg
                  >{{ item.likedCount }}
                </div>
              </div>
            </van-list>
            <div class="loading" v-if="!commentList.length && idArr.length"><img src="@/assets/images/loading.gif" /></div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- 切换界面大小 -->
    <div class="toggle" :style="`transform: translateX(-50%)  rotate(${arrowDeg})`" @click="toggle"><van-icon name="arrow-up" /></div>
  </div>
</template>

<script>
// 获取歌曲详情和 歌曲的歌词接口
import { getSongByIdAPI, getLyricByIdAPI, getCommentAPI } from '@/api/index.js'
import { mapState } from 'vuex'
// import { Icon } from 'vant'
export default {
  // components: {
  //   [Icon.name]: Icon
  // },
  name: 'play',
  data() {
    return {
      playState: false, // 音乐播放状态(true暂停, false播放)
      songInfo: {}, // 歌曲信息
      lyric: {}, // 歌词枚举对象(需要在js拿到歌词写代码处理后, 按照格式保存到这个对象)
      curLyric: '', // 当前显示哪句歌词
      lastLy: '', // 记录当前播放歌词
      lyricIndexArr: [],
      lyricArr: [],
      preLyric: '',
      nextLyric: '',
      timeIndex: 0,
      // show: true,
      commentList: [],
      showComment: false,
      commentOffset: 1,
      loading: false,
      resTemp: {},
      commentListTemp: [],
      flag: false
      // finished: false
    }
  },
  computed: {
    ...mapState(['id', 'idArr', 'showPlay']),
    needleDeg() {
      // 留声机-唱臂的位置属性
      return this.playState ? '-7deg' : '-38deg'
    },
    arrowDeg() {
      return this.showPlay ? '180deg' : '0'
    },
    finished() {
      if (this.commentList === []) {
        return true
      } else if (this.flag && this.commentListTemp === []) {
        return true
      } else {
        return false
      }
    },
    nextId() {
      const currIdIndex = this.idArr.indexOf(this.id)
      if (currIdIndex === this.idArr.length - 1) {
        return this.idArr[0]
      } else {
        return this.idArr[currIdIndex + 1]
      }
    },
    preId() {
      const currIdIndex = this.idArr.indexOf(this.id)
      if (currIdIndex === 0) {
        return this.idArr[this.idArr.length - 1]
      } else {
        return this.idArr[currIdIndex - 1]
      }
    }
  },
  methods: {
    // 播放上一首
    playPrevious() {
      this.$store.commit('getId', this.preId)
    },
    // 播放下一首
    playNext() {
      this.$store.commit('getId', this.nextId)
    },
    // 获取歌曲详情
    async getSong() {
      // 获取歌曲详情, 和歌词方法
      const res = await getSongByIdAPI(this.id)
      this.songInfo = res.data.songs[0]
      // 获取-并调用_formatLyr方法, 处理歌词
      const lyrContent = await getLyricByIdAPI(this.id)
      const lyricStr = lyrContent.data.lrc.lyric
      this.lyric = this._formatLyr(lyricStr)
      // 初始化完毕先显示零秒歌词
      this.curLyric = this.lyric[0]
    },
    // 格式化歌词
    _formatLyr(lyricStr) {
      // 可以看network观察歌词数据是一个大字符串, 进行拆分.
      const reg = /\[.+?\]/g //
      const timeArr = lyricStr.match(reg) // 匹配所有[]字符串以及里面的一切内容, 返回数组
      // console.log(timeArr) // ["[00:00.000]", "[00:01.000]", ......]
      const contentArr = lyricStr.split(/\[.+?\]/).slice(1) // 按照[]拆分歌词字符串, 返回一个数组(下标为0位置元素不要,后面的留下所以截取)
      // console.log(contentArr)
      const lyricObj = {} // 保存歌词的对象, key是秒, value是显示的歌词
      timeArr.forEach((item, index) => {
        // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
        const ms = item.split(':')[0].split('')[2] * 60
        // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
        const ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        // 秒数作为key, 对应歌词作为value
        lyricObj[ms + Number(ss)] = contentArr[index]
      })
      // 返回得到的歌词对象(可以打印看看)
      // console.log(lyricObj)
      for (const key in lyricObj) {
        this.lyricIndexArr.push(Number(key))
        this.lyricArr.push(lyricObj[key])
      }
      // console.log(this.lyricArr)

      return lyricObj
    },
    // 播放音乐
    audioStart() {
      // 播放按钮 - 点击事件
      if (!this.playState) {
        // 如果状态为false

        this.$refs.audio.play() // 调用audio标签的内置方法play可以继续播放声音
        this.playState = true
      } else {
        this.$refs.audio.pause() // 暂停audio的播放
        this.playState = false
      }

      // this.playState = !this.playState // 点击设置对立状态
      // this.playState = !this.$refs.audio.paused // 点击设置对立状态
    },
    // 显示歌词
    showLyric() {
      // 监听播放audio进度, 切换歌词显示
      this.$refs.audio.addEventListener('timeupdate', () => {
        const curTime = Math.floor(this.$refs.audio.currentTime)
        // 避免空白出现
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime]
          this.timeIndex = this.lyricIndexArr.indexOf(curTime)
          // console.log(this.timeIndex)
          // console.log('id是' + this.id)
          if (this.timeIndex - 1 < 0) {
            this.preLyric = ''
          } else {
            this.preLyric = this.lyricArr[this.timeIndex - 1]
          }
          if (this.timeIndex + 1 > this.lyricArr.length - 1) {
            this.nextLyric = ''
          } else {
            this.nextLyric = this.lyricArr[this.timeIndex + 1]
          }
        }
        // 改变播放状态
        if (this.$refs.audio.paused) {
          this.playState = false
        } else {
          this.playState = true
        }
        //   this.lastLy = this.curLyric
        // }
        // else {
        //   this.curLyric = this.lastLy
        // }
      })
    },
    // 是否显示播放界面
    toggle() {
      this.$store.commit('changeShowPlay', !this.showPlay)
    },
    // 播放、暂停、结束、出错
    playStatus() {
      // 开始播放
      this.$refs.audio.addEventListener('play', () => {
        this.playState = true
      })
      // 暂停播放
      this.$refs.audio.addEventListener('paused', () => {
        this.playState = false
      })
      // 结束播放，播放下一首
      this.$refs.audio.addEventListener('ended', () => {
        this.playState = false
        this.$store.commit('getId', this.nextId)
      })
      // 出错,播放下一首
      this.$refs.audio.addEventListener('error', () => {
        this.playState = false
        this.$notify({
          message: '此曲需要VIP\n为了您的钱包着想\n即将自动播放下一首~~~',
          color: 'pink',
          background: 'rgba(0,0,0,.8)',
          duration: '4000'
        })
        setTimeout(() => {
          this.$store.commit('getId', this.nextId)
        }, 2000)
      })
    },
    // 获取评论
    async getComment() {
      this.showComment = !this.showComment
      if (this.showComment && this.id) {
        const res = await getCommentAPI(this.id, this.commentOffset)
        this.commentList = res.data.data.comments
        this.commentOffset = 2
        // if (this.commentList === []) this.commentList = [{ content: '暂时没有评论哦,老板~' }]
      }
    },
    // 加载更多评论
    async onLoad() {
      this.resTemp = await getCommentAPI(this.id, this.commentOffset, this.commentList[this.commentList.length - 1].time)

      this.commentListTemp = this.resTemp.data.data.comments
      this.flag = true
      // if (this.commentListTemp === []) this.finished = true
      this.commentList = this.commentList.concat(this.commentListTemp)
      this.loading = false
      this.commentOffset++
    }
  },
  mounted() {
    if (!this.id) {
      return true
    } else {
      this.playState = true
      this.getSong()
      this.showLyric()
      this.playStatus()
    }
  }
}
</script>

<style lang="less" scoped>
.play {
  position: fixed;
  top: 0;
  /* bottom: 40px; */
  left: 0;
  right: 0;
  z-index: 9991;
  height: 100%;
  overflow: hidden;
  transform-origin: bottom center;
}
// 播放页面过渡动画
.play-tran-enter-active {
  transition: all 0.2s ease;
}
.play-tran-leave-active {
  transition: all 0.2s ease;
}
.play-tran-enter,
.play-tran-leave-to {
  transform: rotateZ(-30deg);
  opacity: 0;
  border-radius: 30px;
}
// 评论 过渡动画
.comment-tran-enter-active {
  transition: all 0.2s ease;
}
.comment-tran-leave-active {
  transition: all 0.2s ease;
}
.comment-tran-enter,
.comment-tran-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
.pre-song {
  z-index: 999999;
  position: absolute;
  top: 111px;
  left: -40px;
  width: 40px;
  height: 26px;
  .icon {
    width: 100%;
    height: 100%;
  }
}
.next-song {
  position: absolute;
  top: 111px;
  right: -40px;
  z-index: 999999;
  width: 40px;
  height: 26px;
  .icon {
    width: 100%;
    height: 100%;
  }
}
.commentBtn {
  position: absolute;
  bottom: 45px;
  left: 30px;
  width: 40px;
  height: 26px;
  color: rgb(246, 125, 179);
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  line-height: 26px;
  text-align: center;
  border-radius: 20px;
  z-index: 999999;
}
.comment-container {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-top: 10px;
  width: 90%;
  height: 75%;
  z-index: 99999;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  overflow-y: scroll;
  .comment-item {
    position: relative;
    margin: 0 10px;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(0, 0, 0, 0.5);

    // background-color: rgba(255, 255, 255, 0.8);
    background-size: cover;
    background-position-y: center;
    box-shadow: 1px 1px 1px 1px rgba(80, 80, 80, 0.2);
    border-radius: 10px;
    overflow: hidden;
    padding-bottom: 5px;
    .commentBgc {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background-size: cover;
      background-position-y: 50%;
      filter: blur(4px);
    }
    .commentContent {
      padding: 5px;
      padding: 10px 20px;
      margin: 25px 0;
      border-radius: 10px;
      font-size: 12px;
    }
    .loveCount {
      position: absolute;
      bottom: 10px;
      right: 10px;
      // left: 50%;
      // transform: translateX(-50%);
      font-size: 10px;
      .icon {
        height: 14px;
        width: 14px;
        vertical-align: bottom;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
    .commentUser {
      position: absolute;
      top: 10px;
      left: 0;
      margin-left: 10px;
      padding: 0 10px;
      border: 1px solid pink;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.8);

      border-radius: 10px;
    }
    .commentDate {
      position: absolute;
      top: 10px;
      right: 0;
      margin-right: 10px;
      border: 1px solid pink;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}
.loading {
  position: absolute;
  top: 30vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 100%;
  opacity: 0.5;
  img {
    width: 100%;
    transform: scale(4.2);
  }
}
/* 切换大小 */
.toggle {
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  left: 50%;
  width: 60px;
  height: 60px;
  line-height: 55px;
  background-color: rgba(255, 196, 206, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  color: #fefefe;
  text-align: center;
  z-index: 10000;
  transition: all 0.5s;
  border-top: 2px solid rgba(0, 255, 255, 0.501);
  border-bottom: 2px solid rgba(0, 255, 255, 0.501);
  box-shadow: -3px -3px 20px 1px rgba(255, 192, 203, 0.515), 3px 3px 20px 1px rgba(0, 255, 255, 0.212);
  .van-icon:before {
    font-size: 22px;
    color: white;
  }
}
.controls {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  height: 25px;
  width: 90%;
  opacity: 0.5;
  border: 3px solid rgba(255, 192, 203, 0);
  border-radius: 100px;
  box-shadow: inset 0 0 5px 2px pink;
  z-index: 99998;
}
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
  /* overflow: hidden; */
  z-index: -1;
  filter: blur(5px);
}
/*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
.song-bg::before {
  content: ' ';
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.song-wrapper {
  position: absolute;
  width: 247px;
  height: 247px;
  left: 50%;
  top: 90px;
  transform: translateX(-50%);
  z-index: 10001;
}
.song-turn {
  width: 100%;
  height: 100%;
  background: url('./img/bg.png') no-repeat;
  background-size: 100%;
}
.start-box {
  position: absolute;
  width: 156px;
  height: 156px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-start {
  width: 56px;
  height: 56px;
  background: url('./img/start.png');
  background-size: 100%;
}
.song-stop {
  width: 56px;
  height: 56px;
  background: url('./img/stop.png');
  background-size: 100%;
}
.needle {
  position: absolute;
  transform-origin: left top;
  background: url('./img/needle-ab.png') no-repeat;
  background-size: contain;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}
.song-img {
  width: 154px;
  height: 154px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.m-song-h2 {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lrcContent {
  margin-top: 30px;
}
.lrc {
  margin: 20px 0;
  font-size: 20px;
  color: rgb(255, 154, 193);
  text-align: center;
  padding: 0.32rem 0;
}
.lrc0 {
  font-size: 14px;
  color: rgb(198, 198, 198);
  text-align: center;
}
.left-incon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}
.ani {
  animation: turn 5s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
