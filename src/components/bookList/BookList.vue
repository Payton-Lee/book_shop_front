<template>
  <div></div>
  <div class="!opacity-100 p-5 flex justify-start flex-wrap">
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
    <goods-box class=" mx-2 my-2"></goods-box>
  </div>
</template>

<script>
import { bookList } from '../../axios.js'
import { reactive, ref } from "vue"
import { useRouter } from 'vue-router'
import GoodsBox from '../widget/GoodsBox.vue';

components: {
  GoodsBox
}

const queryVo = reactive({
  current: 1,
  size: 8,
  queryInfo: ''
})

let bookListData = reactive([])
let total = ref(0)

const getBookList = async (query) => {
  const res = await bookList(query)
  if(res.status !== 200) {
    return
  }
  console.log(res);
  bookListData = res.data.records
  total = res.data.total
  console.log(bookListData);
  console.log(total);
}

export default {
  setup() {
    getBookList(queryVo)
  }
}
</script>

<style>
</style>