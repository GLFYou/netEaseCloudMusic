import request from '@/utils/request.js'

export const getComment = (id, offset, before) =>
  request({
    url: '/comment/new',
    params: {
      id: id,
      pageNo: offset, // 分页参数
      cursor: before, // 值为上一条数据的 time
      type: 0, // 歌曲的评论
      sortType: 2 // 按热度排序
    }
  })
