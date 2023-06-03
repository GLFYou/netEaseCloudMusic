// 封装发起的请求方法
import request from '@/utils/request.js' // 导入网络请求工具request
// 推荐音乐
export const recommendMusic = (params) =>
  request({
    url: '/personalized',
    params: {
      limit: params
    }
  })
// 最新音乐
export const newMusic = (params) =>
  request({
    url: '/personalized/newsong',
    params: {
      limit: params
    }
  })
// 热门歌手
export const hotSingers = () =>
  request({
    url: '/top/artists',
    params: {
      limit: 30
    }
  })
