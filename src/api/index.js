// 统一的出口
import { recommendMusic, newMusic } from '@/api/Home.js'
import { hotWords, searchSuggest, searchResult } from '@/api/Search.js'
import { getSongById, getLyricById } from '@/api/Play.js'
import { getComment } from '@/api/Comment.js'
import { getListMusic } from '@/api/list.js'

export const recommendMusicAPI = recommendMusic // 推荐歌单
export const newMusicAPI = newMusic // 最新音乐

export const hotWordsAPI = hotWords // 热搜词
export const searchSuggestAPI = searchSuggest // 搜索建议
export const searchResultAPI = searchResult // 搜索结果

export const getSongByIdAPI = getSongById // 歌曲详情
export const getLyricByIdAPI = getLyricById // 歌词
export const getCommentAPI = getComment // 评论

export const getListMusicAPI = getListMusic // 歌单的所有音乐
