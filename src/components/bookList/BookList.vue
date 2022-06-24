<template>
  <div></div>
  <div class="p-5">
    <div class="w-full !m-2">
      <el-form :model="queryVo">
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="queryVo.queryInfo" placeholder="搜你所想" size="large" clearable @clear="getBookList">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button size="large" class="!m-0 !bg-stone-400 !text-black" @click="getBookList"><i
                  class="iconfont icon-sousuo"></i></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="flex justify-start items-center flex-wrap">
      <div v-for="item in booklistdata" :key="item.id" class="w-63 h-90 bg-white opacity-100 rounded-lg p-2 m-2">
        <div class="h-50 w-full rounded-lg overflow-hidded flex justify-center">
          <el-image class="h-40 w-40" :src="'http://localhost:9001/bookshop/api/v1/image/' + item.image"></el-image>
        </div>
        <div class="w-full h-30 p-4 space-y-2">
          <div class="w-full h-8 text-gray-500 text-sm">图书名称： {{ item.bookName }}</div>
          <div class="w-full h-4 text-gray-500 text-sm leading-4">作者： {{ item.author }}</div>
          <div class="text-orange-500 w-full h-4 leading-4 text-sm">价格: {{ item.price }}.00 元</div>
          <div class="flex justify-end">
            <el-button class="!m-0 !bg-stone-300 !text-black" size="default" @click="buy(item.id)">购买</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-pagination v-model:currentPage="queryVo.current" v-model:page-size="queryVo.size" :page-sizes="[4, 8, 12, 16]"
        :small="small" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" class="mt-3" />
    </div>
  </div>
</template>

<script>
import { bookList } from '../../axios.js'

export default {
  data() {
    return {
      booklistdata: [],
      queryVo: {
        current: 1,
        size: 8,
        queryInfo: ''
      },
      total: 0
    }
  },
  methods: {
    async getBookList() {
      const res = await bookList(this.queryVo)
      console.log(this.queryVo);
      if (res.status !== 200) {
        return
      }
      this.booklistdata = res.data.records
      this.total = res.data.total
      console.log(res);
    },
    handleSizeChange(newSize) {
      this.queryVo.size = newSize
      this.getBookList()
    },
    handleCurrentChange(newCurrent) {
      this.queryVo.current = newCurrent
      this.getBookList()
    },
    buy(id) {
      let userId = window.sessionStorage.getItem("userId")
      if (userId === null) {
        return this.$router.push("/login")
      }
      this.$router.push({
        path: "/orderconfirm",
        query: {
          bookId: id
        }
      })
    },
  },
  created() {
    this.getBookList()
  }
}


</script>

<style>
</style>