// 引入axios
import axios from "axios"
// 导入NPregress 包对应的JS 和 CSS, NProgress 实现进度条效果
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

const instance = axios.create({
  // 配置请求根路径
  baseURL: 'http://localhost:9001/bookshop/api/v1/',
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

export async function login(loginForm) {
  const { data: res } = await instance.post('login', loginForm)
  return res
}

export async function register(registerForm) {
  const { data: res } = await instance.post('register', registerForm)
  return res
}

export async function bookList(queryVo) {
  const { data: res } = await instance.get('booklist', { params: queryVo })
  return res
}

export async function bookListOne(bookId) {
  const { data: res } = await instance.get(`/${bookId}/booklist`)
  return res
}

export async function userAddressList(userId) {
  const { data: res } = await instance.get(`/order/${userId}/addresslist`)
  return res
}

export async function buyBook(order) {
  const { data: res } = await instance.post('/order/neworder', order)
  return res
}

export async function getUserOrderList(userId, queryVo) {
  const { data: res } = await instance.get(`/order/${userId}/orderlist`, { params: queryVo })
  return res
}

export async function getCurrentAddress(addressId) {
  const { data: res } = await instance.get(`/order/${addressId}/address`)
  return res
}

export async function getAddressListByuserId(userId) {
  const { data: res } = await instance.get(`/order/${userId}/addresslist`)
  return res
} 

export async function deleteAddressByAddressId(addressId) {
  const { data: res } = await instance.delete(`/address/${addressId}/deleteaddress`)
  return res
}

export async function saveAddressWithUserId(address) {
  const { data: res } = await instance.post("address/newaddress", address)
  return res
}

export async function editAddressWithUserId(address) {
  const { data: res } = await instance.put("address/editaddress", address)
  return res
}