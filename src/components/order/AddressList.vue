<template>
  <div class="w-full min-h-100 p-5">
    <el-table :data="addressList" stripe border class="rounded-lg" height="300px">
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="详细地址" align="center">
        <template #default="scope">
          {{ scope.row.province + scope.row.city + scope.row.area + scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="电话号码" prop="telephone" align="center"></el-table-column>
      <el-table-column label="修改" align="center" width="100px">
        <template #default="scope">
          <el-button type="warning" @click="showEditAddress(scope.row)">
            <i class="iconfont icon-bianji"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center" width="100px">
        <template #default="scope">
          <el-popconfirm title="确定删除这个地址嘛？" @confirm="deleteById(scope.row.id)">
            <template #reference>
              <el-button type="danger">
                <i class="iconfont icon-shanchu"></i>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="my-4" type="success" @click="addAddressDlogvisible = true">添加新地址</el-button>
    <el-dialog v-model="addAddressDlogvisible" :show-close="true" title="添加新地址" width="40%" @close="handleClose">
      <el-form :model="address" label-width="80px" ref="addressRef" :rules="addressRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="address.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="address.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="area">
          <el-cascader :options="options" placeholder="请选择" v-model="selectedOptions" @change="handldchange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="address.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="saveAddress">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editAddressDlogvisible" :show-close="true" title="修改地址" width="40%" @close="handleEditClose">
      <el-form :model="editAddress" label-width="80px" ref="editAddressRef" :rules="addressRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editAddress.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="editAddress.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="area">
          <el-cascader :options="options" placeholder="请选择" v-model="editSelectedOptions" @change="handldEditChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="editAddress.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleEditClose">取消</el-button>
          <el-button type="primary" @click="editAddressById">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import { ElMessage } from 'element-plus'
import { getAddressListByuserId, deleteAddressByAddressId, saveAddressWithUserId, editAddressWithUserId } from '../../axios.js'
export default {
  data() {
    return {
      addressList: [],
      addAddressDlogvisible: false,
      editAddressDlogvisible: false,
      address: {
        userId: window.sessionStorage.getItem("userId"),
        province: '',
        city: '',
        area: '',
        address: '',
        name: '',
        telephone: ''
      },
      editAddress: {
        userId: window.sessionStorage.getItem("userId"),
        province: '',
        city: '',
        area: '',
        address: '',
        name: '',
        telephone: ''
      },
      options: regionData,
      selectedOptions: [],
      editSelectedOptions: [],
      addressRules: {
        name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        // 驗證密碼是否合法
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            , message: "手机号输入错误，请检查手机号"
          }
        ],
        address: [
          { required: true, message: "请输入收货详细地址", trigger: "blur" }
        ],
        area: [
          { required: true, message: "请输入选择城市", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    async getUserAddressList() {
      const res = await getAddressListByuserId(window.sessionStorage.getItem("userId"))
      if (res.status !== 200) {
        return this.$router.push("/booklist")
      }
      this.addressList = res.data
      console.log(this.addressList);
    },
    async deleteById(id) {
      const res = await deleteAddressByAddressId(id)
      if (res.status !== 201) {
        return
      }
      ElMessage.success("地址删除成功！")
      this.getUserAddressList()
    },
    handldchange() {
      this.address.province = CodeToText[this.selectedOptions[0]]
      this.address.city = CodeToText[this.selectedOptions[1]]
      this.address.area = CodeToText[this.selectedOptions[2]]
      console.log(this.address);
    },
    handleClose() {
      this.$refs.addressRef.resetFields()
      this.selectedOptions = []
      this.addAddressDlogvisible = false
    },
    saveAddress() {
      this.$refs.addressRef.validate(async (valid) => {
        if (!valid) return
        console.log(this.address);
        const res = await saveAddressWithUserId(this.address)
        if (res.status !== 201) {
          this.addAddressDlogvisible = false
          ElMessage.error("保存地址失败！")
          this.$refs.addressRef.resetFields()
          this.selectedOptions = []
          return
        }
        ElMessage.success("保存地址成功")
        this.$refs.addressRef.resetFields()
        this.selectedOptions = []
        this.addAddressDlogvisible = false
        this.getUserAddressList()
      })
    },
    showEditAddress(address) {
      this.editAddress = address
      console.log(address);
      let cities = [TextToCode[address.province].code, TextToCode[address.province][address.city].code, TextToCode[address.province][address.city][address.area].code]
      this.editSelectedOptions = [...cities]
      this.editAddressDlogvisible = true
    },
    handleEditClose() {
      this.$refs.editAddressRef.resetFields()
      this.editSelectedOptions = []
      this.editAddressDlogvisible = false
    },
    handldEditChange() {
      this.editAddress.province = CodeToText[this.editSelectedOptions[0]]
      this.editAddress.city = CodeToText[this.editSelectedOptions[1]]
      this.editAddress.area = CodeToText[this.editSelectedOptions[2]]
      console.log(this.editAddress);
    },
    editAddressById() {
      this.$refs.editAddressRef.validate(async (valid) => {
        if (!valid) return
        console.log(this.editAddress);
        const res = await editAddressWithUserId(this.editAddress)
        if (res.status !== 201) {
          this.editAddressDlogvisible = false
          ElMessage.error("修改地址失败！")
          this.$refs.editAddressRef.resetFields()
          this.editSelectedOptions = []
          return
        }
        console.log(res);
        ElMessage.success("修改地址成功")
        this.$refs.editAddressRef.resetFields()
        this.editSelectedOptions = []
        this.editAddressDlogvisible = false
        this.getUserAddressList()
      })
    }
  },
  created() {
    this.getUserAddressList()
  }
}
</script>

<style>
</style>