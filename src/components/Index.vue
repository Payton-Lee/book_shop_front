<template>
  <div class="common-layout">
    <el-container>
      <el-header class="!p-0 !h-18 !bg-white !opacity-70 ">
        <div class="px-50 w-full h-full opacity-100 flex justify-between items-center">
          <div class="text-3xl !text-black">
            <i class="iconfont icon-tushu !text-3xl"></i>慢慢书城
          </div>
          <div class="w-80 flex justify-between items-center">
            <router-link to="booklist">
              <div class="px-3 h-10 text-center leading-10 rounded-md bg-stone-300 hover:bg-stone-400">
                图书
              </div>
            </router-link>
            <router-link to="/orderlist">
              <div class="px-3 h-10 text-center leading-10 rounded-md bg-stone-300 hover:bg-stone-400">
                订单
              </div>
            </router-link>
            <router-link to="/addresslist">
              <div class="px-3 h-10 text-center leading-10 rounded-md bg-stone-300 hover:bg-stone-400">
                收货地址
              </div>
            </router-link>
          </div>
          <div class="w-40"></div>
          <div class="w-70 flex justify-between items-center">
            <div v-if="username !== null">欢迎您！ {{ username }}</div>
            <div>
              <el-button v-if="username !== null" class="!bg-stone-300 !text-black" @click="logout">注销登录</el-button>
              <el-button v-else class="!bg-stone-300 !text-black" @click="login">登录</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="!px-50">
        <div class="w-full min-h-50 bg-stone-300 rounded-lg overflow-hidden">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer class="!px-50 !h-50 bg-white opacity-70 flex justify-center items-center text-center">
        <div>
          <p>慢慢书城</p>
          <p>Design By @赵娟</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username"),
    }
  },
  methods: {
    login() {
      this.$router.push("/login")
    },
    logout() {
      window.sessionStorage.removeItem("username")
      window.sessionStorage.removeItem("userId")
      window.sessionStorage.removeItem("token")
      this.$router.push("/booklist")
      this.username = null
    }
  }
}
</script>

<style lang="css" scoped>
</style>