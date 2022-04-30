import request from '@/utils/request.js'
export const getListMusic = (id) =>
  request({
    url: '/playlist/detail',
    params: { id: id }
  })
