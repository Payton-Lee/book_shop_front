<template>
  <div class="w-63 h-85 bg-white opacity-100 rounded-lg p-2">
    <div class="h-50 w-full rounded-lg overflow-hidden">
      <el-image :src="'localhost:9001/bookshop/api/v1/' + image"></el-image>
    </div>
    <div class="w-full h-30 p-4 space-y-2">
      <div class="w-full h-4 text-gray-500 text-sm leading-4">图书名称： {{ bookName }}</div>
      <div class="w-full h-4 text-gray-500 text-sm leading-4">作者： {{ author }}</div>
      <div class="text-orange-500 w-full h-4 leading-4 text-sm">价格: {{ price }} 元</div>
      <div>
        <el-button type="primary" size="meidum" class="!m-0">购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//   props: {
//     id: {
//       type: Number,
//       require: true
//     },
//     bookName: {
//       type: String,
//       require: true
//     },
//     price: {
//       type: Number,
//       require: true
//     },
//     ISBN: {
//       type: String,
//       require: true
//     },
//     publisher: {
//       type: String,
//       require: true
//     },
//     inStock: {
//       type: Number,
//       require: true
//     },
//     image: {
//       type: String,
//       require: true
//     },
//   },
//   setup() {
//     return { props }
//   }
// }
</script>

<style>
</style>