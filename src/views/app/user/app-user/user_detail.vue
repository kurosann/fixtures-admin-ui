<template>

  <div>
    <el-card>
        <div>
          <el-avatar shape="square" :size="50" :src="form.headPortrait===''? initUrl:form.headPortrait" />
          <el-divider></el-divider>
          <span>用户名：{{ form.uName }} </span>
          <el-divider direction="vertical"></el-divider>
          <span>手机号：{{ form.phone }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>身份证号：{{ form.idNumber }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>性别：{{  this.sexFormat(form) }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>生日：{{ this.getTimes(form.birthday) }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>邀请码：<el-tag size="small">{{ form.invitationCode }}</el-tag></span>
          <el-divider></el-divider>

          <span>昵称：{{ form.nickName }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>微信名称：{{ form.weixinName }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>微信号：{{ form.weixin }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>用户类型：{{  this.ridFormat(form) }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>vip：{{ this.vidFormat(form)}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>vip到期时间：{{ this.getTimes(form.vipEndTime)}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>是否实名：{{ this.isRealFormat(form) }}</span>
          <el-divider></el-divider>
          <span>终端ip：{{ form.ipAddr }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>注册设备：{{ form.regDevice }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>账号状态：
            <el-tag type="success" v-if="form.state===1">{{ this.stateFormat(form) }}</el-tag>
            <el-tag type="danger" v-else>{{ this.stateFormat(form) }}</el-tag>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span>最后登录IP：{{ form.lastLoginIp }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>最后登录时间：{{ this.getTimes(form.lastLoginTime) }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>是否虚拟用户：
            <el-tag type="warning" v-if="form.isVirtual === 1">{{ this.isVirtualFormat(form) }}</el-tag>
            <el-tag v-else >{{ this.isVirtualFormat(form) }}</el-tag>
          </span>
          <el-divider></el-divider>
          <span>工程订单数：
            <el-tag type="success"">{{ this.list.length }}</el-tag>
          </span>
        </div>
    </el-card>

    <el-card>
      <el-table
        :data="list"
        height="400"
        stripe
        style="width: 100%"
      >
        <el-table-column
          label="订单号"
          align="center"
          prop="orderNo"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="下单手机"
          align="center"
          prop="orderPhone"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="下单用户"
          align="center"
          prop="userId"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="工程人员"
          align="center"
          prop="masterId"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="付款金额"
          align="center"
          prop="payAmount"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="处理时间"
          align="center"
          prop="handle_time"
          :formatter="ridFormat"
          width="150"
        >
          <template slot-scope="scope">
            {{ getTimes(scope.row.handle_time) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { listAppRole } from '@/api/admin/app-role'
import { listAppVip } from '@/api/admin/app-vip'
import moment from 'moment'
import { listAppUser } from '@/api/admin/app-user'
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
        weixinName: undefined,
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
      const time = moment(str).format('YYYY-MM-DD HH:mm:ss')
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
