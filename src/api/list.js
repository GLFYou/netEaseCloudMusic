import request from '@/utils/request.js'
// 获取歌单音乐
export const getListMusicId = (id) =>
  request({
    url: '/playlist/detail',
    params: { id: id }
  })
//  获取歌手的音乐
export const getSingerSongs = (id) =>
  request({
    url: '/artists',
    params: { id: id }
  })
