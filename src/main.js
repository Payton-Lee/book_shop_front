import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
// 导入全局样式表
import './assets/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入路由
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
