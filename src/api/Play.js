import request from '@/utils/request.js'

// 获取歌曲详情
export const getSongById = (ids) =>
  request({
    url: '/song/detail',
    params: {
      ids
    }
  })

// 获取歌词
export const getLyricById = (id) =>
  request({
    url: `/lyric?id=${id}`
  })
