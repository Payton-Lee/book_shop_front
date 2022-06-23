<template>
  <div class="w-full min-h-100 p-5">
    <el-table :data="bookList" border stripe>
      <el-table-column label="图片" prop="image" align="center" width="200px">
        <template #default="scope">
          <el-image :src="'http://localhost:9001/bookshop/api/v1/image/' + scope.row.image">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="图书" prop="bookName" align="center" width="80px"></el-table-column>
      <el-table-column label="作者" prop="author" align="center" width="80px"></el-table-column>
      <el-table-column label="ISBN" prop="isbn" align="center"></el-table-column>
      <el-table-column label="价格" prop="price" align="center">
        <template #default="scope"> {{ scope.row.price }}.00元</template>
      </el-table-column>
      <el-table-column label="出版社" prop="publisher" align="center"></el-table-column>
      <el-table-column label="购买数量" align="center">
        <template #default="{}">
          <el-input v-model="order.count" type="number" :min="1">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="总价" align="center">
        <template #default="scope">
          {{ scope.row.price * order.count }}.00 元
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4">
      <el-form :model="order">
        <el-form-item label="选择支付方式">
          <el-radio v-model="order.orderPay" :label="0">支付宝</el-radio>
          <el-radio v-model="order.orderPay" :label="1">微信</el-radio>
          <el-radio v-model="order.orderPay" :label="2">银行卡</el-radio>
        </el-form-item>
        <el-form-item label="选择收货地址" class="!space-x-5">
          <el-select v-model="order" placeholder="请选择">
            <el-option v-for="item in addressList" :key="item.id"></el-option>
          </el-select>
          <div class="w-20"></div>
          <el-button @click="comfirmOrder" class="!bg-stone-400 !text-black">提交订单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { bookListOne, userAddressList, buyBook } from '../../axios.js'
import { toRaw } from 'vue'
export default {
  data() {
    return {
      order: {
        bookId: 0,
        userId: 0,
        addressId: 1,
        count: 1,
        orderPrice: 0,
        orderPay: 0
      },
      bookList: [],
      addressList: [],
      disable: true
    }
  },
  methods: {
    getParams() {
      this.order.bookId = this.$route.query.bookId
      this.order.userId = window.sessionStorage.getItem("userId")
    },
    async getBook() {
      const res = await bookListOne(this.order.bookId)
      console.log(res.data);
      if (res.status !== 200) {
        this.$router.push("/booklist")
        return ElMessage.error("图书无法购买！")
      }
      this.bookList.push(res.data)
      console.log(this.bookList);
    },
    async getAddressListByUserId() {
      console.log(this.addressList);
      const res = await userAddressList(this.order.userId)
      console.log(res);
      this.addressList = res.data
    },
    async comfirmOrder() {
      console.log(this.order);
      this.order.orderPrice = this.bookList[0].price * this.order.count
      const res = await buyBook(this.order)
      if(res.status !== 201) {
        return ElMessage.error("哪里填错了哦，请检查！")
      }
      ElMessage.success("恭喜你，买到心仪的宝贝！")
      this.$router.push("/orderlist")
    }
  },
  created() {
    this.getParams()
    this.getBook()
    this.getAddressListByUserId()
  }
}
</script>

<style>
</style>