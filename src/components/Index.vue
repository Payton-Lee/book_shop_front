<template>
  <div class="common-layout">
    <el-container>
      <el-header class="!p-0 !h-18 !bg-white !opacity-70 ">
        <div class="px-50 w-full h-full opacity-100 flex justify-between items-center">
          <div class="text-3xl !text-black">
            <i class="iconfont icon-tushu !text-3xl"></i>慢慢书城
          </div>
          <div class="w-40 flex justify-between items-center">
            <router-link to="booklist">
              <div class="w-16 h-10 text-center leading-10 rounded-md bg-stone-300 hover:bg-stone-400">
                图书
              </div>
            </router-link>
            <router-link to="/orderlist">
              <div class="w-16 h-10 text-center leading-10 rounded-md bg-stone-300 hover:bg-stone-400">
                订单
              </div>
            </router-link>
          </div>
          <div class="w-40"></div>
          <div class="w-70 flex justify-between items-center">
            <div v-if="username !== null">欢迎您！ {{ username }}</div>
            <div>
              <el-button v-if="username !== null" class="!bg-stone-400 !text-black" @click="logout">注销登录</el-button>
              <el-button v-else type="primary"  class="!bg-stone-400 !text-black" @click="login">登录</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="!px-50">
        <div class="w-full min-h-50 bg-stone-300 opacity-70 rounded-lg">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer class="!px-50">Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from 'vue-router'

const username = ref(window.sessionStorage.getItem("username"))
const bookList = reactive([])
const route = useRouter()


const login = () => {
  route.push("/login")
}

const logout = () => {
  window.sessionStorage.removeItem("username")
  window.sessionStorage.removeItem("token")
  route.push("/booklist")
  username = null
}
</script>

<style scoped>
</style>