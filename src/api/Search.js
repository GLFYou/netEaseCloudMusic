// 封装发起的请求方法
import request from '@/utils/request.js' // 导入网络请求工具request
//
export const hotWords = () =>
  request({
    url: '/search/hot',
    params: {}
  })
export const searchSuggest = (keywords) =>
  request({
    url: '/search/suggest',
    params: { keywords: keywords }
  })
export const searchResult = (keywords, limit, offset) =>
  request({
    url: '/cloudsearch',
    params: {
      keywords: keywords,
      limit: limit,
      offset: offset
    }
  })
