<template>
  <div class="select-none flex justify-center items-center h-100vh bg-cover bg-gray-600">
    <div class="w-113 h-80 rounded-lg bg-white">
      <div class="w-full h-25 text-2xl leading-25 font-bold text-center">
        <i class="iconfont icon-tushu !text-3xl "></i> 慢慢书城
      </div>
      <el-form ref="loginFormRef" label-width="65px" :rules="loginFormRules" class="w-full px-7.5 pb-6"
        :model="loginForm">
        <!-- 用戶名 -->
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <template #prefix>
              <i class="iconfont icon-yonghu"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密碼 -->
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
            <template #prefix>
              <i class="iconfont icon-mima"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex items-center px-5 justify-center">
        <el-button type="primary" size="medium" @click="userLogin()">登录</el-button>
        <el-button type="info" size="medium" @click="resetLoginForm()">重置</el-button>
      </div>
      <div class="text-xs text-gray-600 pt-5 pl-10 hover:text-black" @click="register">
        没有账号？点击注册！
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '../../axios.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()
const loginFormRef = ref(null)
const loginForm = reactive({
  username: 'xiaoxiao',
  password: '12345678'
})

const loginFormRules = reactive({
  // 驗證用戶名是否合法
  username: [
    { required: true, message: "请输入登录名", trigger: "blur" },
    {
      min: 3,
      max: 10,
      message: "长度在 3 到 10 个字符",
      trigger: "blur",
    },
  ],
  // 驗證密碼是否合法
  password: [
    { required: true, message: "请输入登录密码", trigger: "blur" },
    {
      min: 6,
      max: 15,
      message: "长度在 6 到 15 个字符",
      trigger: "blur",
    },
  ],
})

const resetLoginForm = () => {
  loginFormRef.value.resetFields()
}

const register = () => {
  route.push("/register")
}
const userLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    const res = await login(loginForm)
    console.log(res)
    if (res.status !== 200) {
      return ElMessage.error(res.message)
    }
    ElMessage.success(res.data.msg)
    window.sessionStorage.setItem("userId", res.data.userId)
    window.sessionStorage.setItem("username", res.data.username)
    window.sessionStorage.setItem("token", res.data.token)
    route.push("/booklist")
  })
}
</script>

<style>
</style>