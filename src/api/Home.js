// 封装发起的请求方法
import request from '@/utils/request.js' // 导入网络请求工具request
//
export const recommendMusic = (params) =>
  request({
    url: '/personalized',
    params: {
      limit: params
    }
  })
export const newMusic = (params) =>
  request({
    url: '/personalized/newsong',
    params: {
      limit: params
    }
  })
