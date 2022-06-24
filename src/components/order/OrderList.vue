<template>
  <div class="w-full p-5">
    <el-form :model="queryVo">
      <el-row>
        <el-col :span="10">
          <el-form-item>
            <el-input v-model="queryVo.queryInfo" placeholder="搜索订单" size="large" clearable @clear="getOrderList">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button size="large" class="!m-0 !bg-stone-400 !text-black" @click="getOrderList"><i
                class="iconfont icon-sousuo"></i></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="orderList" class="rounded-lg" @expand-change="showAddress">
      <el-table-column type="expand">
        <template #default="{}">
          <el-empty v-if="isEmpty" description="地址获取失败，请重新刷新一下" :image-size="50"></el-empty>
          <el-row :gutter="17">
            <el-col :span="2" style="width:100px; min-height: 50px"></el-col>
            <el-col :span="10">
              <p>收货人： {{ currentAddress.name }}</p>
              <p>收货地址： {{ currentAddress.province + currentAddress.city + currentAddress.area + currentAddress.address
              }}</p>
              <p>电话号码： {{ currentAddress.telephone }}</p>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="图片" prop="image" align="center" width="200px">
        <template #default="scope">
          <el-image :src="'http://localhost:9001/bookshop/api/v1/image/' + scope.row.image">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="图书" prop="bookName" align="center" width="80px"></el-table-column>
      <el-table-column label="订单编号" prop="orderNumber" align="center"></el-table-column>
      <el-table-column label="账单编号" prop="payNumber" align="center"></el-table-column>
      <el-table-column label="订单价格" prop="orderPrice" align="center">
        <template #default="scope">
          {{ scope.row.orderPrice }}.00 元
        </template>
      </el-table-column>
      <el-table-column label="支付方式" prop="orderPay" align="center">
        <template #default="scope">
          <el-tag type="primary" v-if="scope.row.orderPay === 0">支付宝</el-tag>
          <el-tag type="success" v-else-if="scope.row.orderPay === 1">微信</el-tag>
          <el-tag type="danger" v-else>微信</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" prop="payStatus" align="center">
        <template #default="scope">
          <el-tag type="danger" v-if="scope.row.payStatus === 0">未付款</el-tag>
          <el-tag type="success" v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="isSend" align="center">
        <template #default="scope">
          <el-tag type="danger" v-if="scope.row.isSend === 0">未发货</el-tag>
          <el-tag type="success" v-else>已发货</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserOrderList, getCurrentAddress } from '../../axios'

export default {
  data() {
    return {
      orderList: [],
      queryVo: {
        current: 1,
        size: 1000,
        queryInfo: ''
      },
      currentAddress: {},
      isEmpty: true
    }
  },
  methods: {
    async getOrderList() {
      const res = await getUserOrderList(window.sessionStorage.getItem("userId"), this.queryVo)
      console.log(res);
      if (res.status !== 200) {
        return this.$router.push("/booklist")
      }
      this.orderList = res.data.records
    },
    async showAddress(row, expandRows) {
      console.log(row)
      // return 
      const res = await getCurrentAddress(row.userId)
      if (res.status !== 200) {
        return
      }
      console.log(res);
      this.currentAddress = res.data
      this.isEmpty = false
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style>
</style>