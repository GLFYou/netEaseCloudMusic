import request from '@/utils/request.js'

export const getComment = (id, offset, before) =>
  request({
    url: '/comment/music',
    params: {
      id: id,
      offset: offset,
      before: before
    }
  })
