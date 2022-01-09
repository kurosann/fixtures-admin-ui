<template>
  <el-table
    :data="list"
    height="200"
    stripe
    style="width: 100%"
  >
    <el-table-column
      label="用户名"
      align="center"
      prop="uName"
      :show-overflow-tooltip="true"
    />
    <el-table-column
      label="昵称"
      align="center"
      prop="nickName"
      :show-overflow-tooltip="true"
    />
    <el-table-column
      label="手机号"
      align="center"
      prop="phone"
      :show-overflow-tooltip="true"
    />
    <el-table-column
      label="用户类型"
      align="center"
      prop="rid"
      :formatter="ridFormat"
      width="100"
    >
      <template slot-scope="scope">
        {{ ridFormat(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column
      label="vip类型"
      align="center"
      prop="vid"
      :formatter="vidFormat"
      width="100"
    >
      <template slot-scope="scope">
        {{ vidFormat(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column
      label="性别"
      align="center"
      prop="sex"
      :formatter="sexFormat"
      width="100"
    >
      <template slot-scope="scope">
        {{ sexFormat(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column
      label="是否实名"
      align="center"
      prop="isReal"
      :formatter="isRealFormat"
      width="100"
    >
      <template slot-scope="scope">
        {{ isRealFormat(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column
      label="账号状态"
      align="center"
      prop="state"
      :formatter="stateFormat"
      width="100"
    >
      <template slot-scope="scope">
        {{ stateFormat(scope.row) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'
import { listAppRole } from '@/api/admin/app-role'
import { listAppVip } from '@/api/admin/app-vip'

export default {
  name: 'Accounts',
  props: {
    list: []
  },
  data() {
    return {
      initUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      // 类型数据字典
      typeOptions: [],
      appUserList: [],
      sexOptions: [],
      isRealOptions: [{
        value: 1,
        label: '是'
      },
      {
        value: 2,
        label: '否'
      }],
      stateOptions: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '拉黑'
        }],
      isVirtualOptions: [{
        value: 0,
        label: '未定义'
      }, {
        value: 1,
        label: '是'
      },
      {
        value: 2,
        label: '否'
      }],
      // 关系表类型
      ridOptions: [],
      vidOptions: []
    }
  },
  created() {
    this.getDicts('sys_user_sex').then(response => {
      this.sexOptions = response.data
    })
    this.getAppRoleItems()
    this.getAppVipItems()
  },
  methods: {
    getItem(data, value) {
      console.log(data, value)
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === value + '') {
          return data[i].key
        }
      }
      return ''
    },
    reset() {
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    getTimes(str) {
      const time = moment(str).format('YYYY-MM-DD')
      if (time === '0001-01-01') {
        return ''
      }
      return time
    },
    fileClose: function() {
      this.fileOpen = false
    },
    sexFormat(row) {
      return this.selectDictLabel(this.sexOptions, row.sex)
    },
    isRealFormat(row) {
      for (let i = 0; i < this.isRealOptions.length; i++) {
        if (this.isRealOptions[i].value === row.isReal) {
          return this.isRealOptions[i].label
        }
      }
      return ''
    },
    ridFormat(row) {
      return this.getItem(this.ridOptions, row.rid)
    },
    vidFormat(row) {
      return this.getItem(this.vidOptions, row.vid)
    },
    stateFormat(row) {
      for (let i = 0; i < this.stateOptions.length; i++) {
        if (this.stateOptions[i].value === row.state) {
          return this.stateOptions[i].label
        }
      }
      return ''
    },
    isVirtualFormat(row) {
      return this.isVirtualOptions[row.isVirtual].label
    },
    // 关系
    getAppRoleItems() {
      this.getItems(listAppRole, undefined).then(res => {
        this.ridOptions = this.setItems(res, 'rName', 'id')
      })
    },
    getAppVipItems() {
      this.getItems(listAppVip, undefined).then(res => {
        this.vidOptions = this.setItems(res, 'vName', 'id')
      })
    }
  }
}
</script>

<style scoped>

</style>
