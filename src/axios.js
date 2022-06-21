// 引入axios
import axios from "axios"
// 导入NPregress 包对应的JS 和 CSS, NProgress 实现进度条效果
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

const instance = axios.create({
  // 配置请求根路径
  baseURL: 'http://localhost:9002/bookshop/api/v1',
  // 请求超时时间
  timeout: 10000
})

instance.interceptors.request.use(config => {
  // 发起请求时进度条开始
  nProgress.start()
  // 获取token添加到请求头
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})

instance.interceptors.response.use(config => {
  // 请求返回的时候进度条消失
  nProgress.done()
  return config
})