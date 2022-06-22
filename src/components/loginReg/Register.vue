<template>
  <div class="select-none flex justify-center items-center h-100vh bg-cover bg-gray-600">
    <div class="w-140 h-132 rounded-lg bg-white">
      <div class="w-full h-25 text-2xl leading-25 font-bold text-center">
        <i class="iconfont icon-tushu !text-3xl "></i> 慢慢书城
      </div>
      <el-form ref="registerFormRef" label-width="85px" :rules="registerFormRules" class="w-full px-7.5 pb-6"
        :model="registerForm">
        <!-- 用戶名 -->
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="请输入用户名">
            <template #prefix>
              <i class="iconfont icon-yonghu"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密碼 -->
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <i class="iconfont icon-mima"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="密码">
          <el-input v-model="registerForm.repassword" type="password" show-password placeholder="请重复密码">
            <template #prefix>
              <i class="iconfont icon-mima"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio v-model="registerForm.sex" label="男">男</el-radio>
          <el-radio v-model="registerForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱">
            <template #prefix>
              <i class="iconfont icon-youxiang"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="telephone" label="电话号码">
          <el-input v-model="registerForm.telephone" placeholder="请输入电话号码">
            <template #prefix>
              <i class="iconfont icon-dianhuahaoma"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex items-center px-5 justify-center">
        <el-button type="primary" size="medium" @click="userRegister">登录</el-button>
        <el-button type="info" size="medium" @click="resetRegisterForm">重置</el-button>
      </div>
      <div class="text-xs text-gray-600 pt-5 pl-10 hover:text-black" @click="login">
        已有账号？点击登录！
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from '../../axios.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()
const registerFormRef = ref(null)
const registerForm = reactive({
  username: '',
  password: '',
  repassword: '',
  sex: '',
  email: '',
  telephone: ''
})

var validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback()
  }
};

const registerFormRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 10,
      message: "长度在 3 到 10 个字符",
      trigger: "blur",
    },
  ],
  // 驗證密碼是否合法
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 15,
      message: "长度在 6 到 15 个字符",
      trigger: "blur",
    },
  ],
  // 验证两次密码是否一致
  repassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ],
  // 验证性别是否选择
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  // 验证邮箱
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: "邮箱格式不对，请检查邮箱格式" }
  ],
  // 验证手机号
  telephone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      , message: "手机号输入错误，请检查手机号"
    }
  ],
})

const resetRegisterForm = () => {
  registerFormRef.value.resetFields()
}

const login = () => {
  route.push("/login")
}

const userRegister = () => {
  registerFormRef.value.validate(async (valid) => {
    if (!valid) return
    const res = await register(registerForm)
    console.log(res)
    if(res.status !== 201) {
      return ElMessage.error(res.message)
    }
    ElMessage.success(res.data.msg)
    route.push("/login")
  })
}

</script>

<style>
</style>