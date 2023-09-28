// 网络请求的工具axios
// 导入axios
import axios from 'axios'
// const axios = require('axios')
// 自定义axios对象
const ajax = axios.create({
  // baseURL: 'https://netease-cloud-music-api-red-one.vercel.app'
  // baseURL: 'http://114.132.57.35:3000'
  baseURL: 'http://139.199.210.172:3000'
})
export default ajax // 相当于导出axios函数
