<template>
  <div class="w-full min-h-100 p-5">
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryVo.queryInfo" clearable @clear="getOrderList">
          <template #append>
            <el-button @click="getOrderList" icon="el-icon-search"/>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="orderList">
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
import { getUserOrderList } from '../../axios'

export default {
  data() {
    return {
      orderList: [],
      queryVo: {
        current: 1,
        size: 5,
        queryInfo: ''
      },
      total: 0,
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
      this.total = res.total
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style>
</style>