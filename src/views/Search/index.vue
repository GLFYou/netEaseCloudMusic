<template>
  <div class="bgc" :style="`background-image:url(${firstImg});`">
    <!-- 搜索框 -->
    <div class="search-container">
      <van-search v-model.trim="searchValue" placeholder="请输入搜索关键词" shape="round" :autofocus="true" show-action @search="onSearch" @blur="onBlur" @focus="onFocus">
        <template #action>
          <div @click="onSearch" class="search-btn">搜索</div>
        </template>
      </van-search>
      <!-- 搜索建议 -->

      <ul class="suggest-container" v-if="suggestvisible">
        <li class="suggest-items" v-for="item in searchSuggest" :key="item.id" @click="sugValToSearch(item.name, item.artists[0].name)">
          <span>{{ item.name }}</span
          ><span>{{ item.artists[0].name }}</span>
        </li>
      </ul>
    </div>
    <div class="limit"></div>
    <div class="box-container">
      <p class="hot-title">{{ searchTitle }}</p>
      <!-- 热词 -->
      <ul class="hot-container" v-if="hotVisible">
        <li class="hot-word" v-for="(item, index) in hotWords" :key="index" @click="valToInput(item.first)">{{ item.first }}</li>
      </ul>
      <!-- 搜索结果 -->
      <van-list v-model="loading" :finished="finished" finished-text="老板,网抑云没有存货了╮(╯﹏╰）╭" :immediate-check="false" @load="onLoad">
        <SongItem class="vancell" v-for="(item, index) in searchList" :key="index" :songName="item.name" :author="item.ar[0].name" :id_="item.id"></SongItem>
        <!-- <van-cell class="vancell" center v-for="(item, index) in searchList" :key="index" :title="item.name" :label="item.ar[0].name" icon="play-circle-o" /> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotWordsAPI, searchSuggestAPI, searchResultAPI } from '@/api/index'
export default {
  data() {
    return {
      searchValue: '',
      resHot: {},
      hotWords: [],
      // autoFocus: false,
      resSug: {},
      searchSuggest: [],
      suggestvisible: false,
      searchTitle: '热门搜索',
      hotVisible: true,
      resSearch: {},
      resSearchTemp: {},
      searchList: [],
      searchListTemp: [],
      keywords: '',
      firstImg: '',
      loading: false,
      finished: false,
      offSet: 1
    }
  },
  async created() {
    // 请求热词
    this.resHot = await hotWordsAPI()
    this.hotWords = this.resHot.data.result.hots
  },
  methods: {
    // 点击后热词进入搜索框，并搜索
    valToInput(val) {
      this.searchValue = val
      this.onSearch()
    },
    // 搜索
    async onSearch() {
      if (this.searchValue !== '') {
        this.resSearch = {} // 重置获取内容
        this.searchList = []
        this.keywords = this.searchValue // 转存，为onLoad做准备
        this.offSet = 1 // 重置页数
        this.searchTitle = '最佳匹配'
        this.hotVisible = false
        this.resSearch = await searchResultAPI(this.searchValue, 15, this.offSet)
        this.searchList = this.resSearch.data.result.songs
        this.firstImg = this.searchList[0].al.picUrl
        this.offSet = 2
      } else {
        return true
      }
      // 下拉加载更多
    },
    async onLoad() {
      if (this.searchList === []) {
        return true
      }
      // 获取第n+1页数据
      if (this.searchListTemp.length === 0) {
        this.finished = true
      }
      this.resSearchTemp = await searchResultAPI(this.keywords, 15, this.offSet)
      this.searchListTemp = this.resSearchTemp.data.result.songs

      // 与第前n页数据合并
      this.searchList = this.searchList.concat(this.searchListTemp)
      this.loading = false
      this.offSet++
    },
    // 搜索框失焦
    onBlur() {
      setTimeout(() => (this.suggestvisible = false), 100)
    },
    // 搜索框对焦
    onFocus() {
      this.suggestvisible = true
    },
    // 点击搜索建议，将值传给搜索框，并搜索
    sugValToSearch(songName, artist) {
      this.keywords = [songName, artist]
      this.searchValue = this.keywords.join(' ')
      this.onSearch()
    }
  },
  watch: {
    // 侦听搜索框数据变化
    async searchValue() {
      // 请求搜索建议
      if (this.searchValue !== '') {
        this.resSug = await searchSuggestAPI(this.searchValue)
        this.searchSuggest = this.resSug.data.result.songs
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bgc {
  position: relative;
  background-position-x: 50%;
  padding-bottom: 0.6667rem;
  background-color: rgba(255, 192, 203, 0.321);
  .limit {
    height: 1px;
  }
  // & ::after {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: -999;
  //   width: 100%;
  //   height: 100vh;
  //   background-image: -webkit-linear-gradient(top, rgb(209, 114, 130), rgb(236, 213, 255));
  //   filter: blur(10px);
  // }
}
.search-container {
  width: 92%;
  z-index: 666;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /deep/.van-search {
    background-color: rgba(236, 202, 216, 0.8);
    border-radius: 0 0 20px 20px;
    margin: 0;
    // padding: 0;
  }
  .search-btn {
    padding: 0 0.2667rem;
    border-radius: 0.2667rem;
    border: 2px solid pink;
  }
  .van-search__action:active {
    background-color: transparent;
  }
  .suggest-container {
    position: absolute;
    top: 50px;
    left: 15px;
    overflow: hidden;
    // height: 300px;
    width: 8.5333rem;
    // background-color: pink;
    border-radius: 0.2667rem;
    z-index: 99999;
    & li:last-child {
      border-bottom: 0;
    }
    .suggest-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2667rem 0;
      border-bottom: 1px dotted rgb(169, 169, 169);
      background-color: rgba(242, 242, 242, 0.9);

      & :nth-child(1) {
        margin-left: 0.8rem;
        font-size: 14px;
        width: 4.5333rem;
      }
      & :nth-child(2) {
        margin-right: 0.8rem;
        font-size: 14px;
        width: 1.8667rem;
      }
    }
  }
}
.box-container {
  .vancell {
    margin-bottom: 0.2667rem;
    backdrop-filter: blur(5px);
  }
  margin: 0 0.2667rem;

  .hot-title {
    height: 0.6667rem;
    line-height: 0.6667rem;
    margin-left: 0.1867rem;
    margin-right: 0.1867rem;
    margin-top: 70px;
    margin-bottom: 0.2667rem;
    padding-left: 0.2667rem;
    font-size: 14px;
    color: #666;
    background-image: -webkit-linear-gradient(left, pink, rgba(158, 250, 250, 0.962));
    border-radius: 10px;
  }
  .hot-container {
    display: flex !important;
    justify-content: left;
    flex-wrap: wrap;

    margin-top: 0.2667rem;

    .hot-word {
      margin: 0.1333rem 0.1333rem;
      padding: 0.1333rem 0.2667rem;
      font-size: 10px;
      color: #666;
      background-color: rgba(255, 192, 203, 0.4);
      border-radius: 30px;
      box-shadow: 0.0533rem 0.0533rem 0.1333rem 0.0267rem rgba(0, 0, 0, 0.1);
    }
  }
  /deep/.van-list__finished-text {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
}
</style>
