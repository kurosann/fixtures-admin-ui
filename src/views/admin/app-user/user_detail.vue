<template>

  <div>
    <el-card>
      <el-descriptions title="基本信息" class="margin-top" :column="5" border>
        <el-descriptions-item label="头像">
          <el-avatar shape="square" :size="50" :src="form.headPortrait===''?initUrl:form.headPortrait" />
        </el-descriptions-item>
        <el-descriptions-item label="用户名">
          {{ form.uName }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">{{ form.phone }}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ form.nickName }}</el-descriptions-item>
        <el-descriptions-item label="微信名称">{{ form.weinxinName }}</el-descriptions-item>
        <el-descriptions-item label="微信号">{{ form.weixin }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ form.idNumber }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ this.sexFormat(form) }}</el-descriptions-item>
        <el-descriptions-item label="邀请码"><el-tag size="small">{{ form.invitationCode }}</el-tag></el-descriptions-item>
        <el-descriptions-item label="终端ip"> {{ form.ipAddr }}</el-descriptions-item>
        <el-descriptions-item label="注册设备">{{ form.regDevice }}</el-descriptions-item>
        <el-descriptions-item label="是否实名">{{ this.isRealFormat(form) }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{ this.getTimes(form.birthday) }}</el-descriptions-item>
        <el-descriptions-item label="用户类型">{{ this.ridFormat(form) }}</el-descriptions-item>
        <el-descriptions-item label="vip类型">{{ this.vidFormat(form) }}</el-descriptions-item>
        <el-descriptions-item label="vip到期时间">{{ this.getTimes(form.vipEndTime) }}</el-descriptions-item>
        <el-descriptions-item label="账号状态"><el-tag>{{ this.stateFormat(form) }}</el-tag></el-descriptions-item>
        <el-descriptions-item label="最后登录IP">{{ form.lastLoginIp }}</el-descriptions-item>
        <el-descriptions-item label="最后登录时间">{{ this.getTimes(form.lastLoginTime) }}</el-descriptions-item>
        <el-descriptions-item label="是否虚拟用户"><el-tag>{{ this.isVirtualFormat(form) }}</el-tag></el-descriptions-item>
      </el-descriptions>
    </el-card>

  </div>
</template>

<script>
import { listAppRole } from '@/api/admin/app-role'
import { listAppVip } from '@/api/admin/app-vip'
import moment from 'moment'
export default {
  name: 'UserDetail',
  // 方式2 :
  props: {
    form: {}, // 这样可以指定传入的类型，如果类型不对，会警告
    list: {}
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
      this.form = {
        id: undefined,
        pid: undefined,
        uName: undefined,
        nickName: undefined,
        weinxinName: undefined,
        weixin: undefined,
        phone: undefined,
        sex: undefined,
        idNumber: undefined,
        invitationCode: undefined,
        ipAddr: undefined,
        regDevice: undefined,
        isReal: undefined,
        birthday: undefined,
        headPortrait: undefined,
        rid: undefined,
        vid: undefined,
        vipEndTime: undefined,
        state: undefined,
        lastLoginTime: undefined,
        lastLoginIp: undefined,
        isVirtual: undefined
      }
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
