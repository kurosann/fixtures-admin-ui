<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="用户名" prop="uName">
            <el-input
              style="width: 180px"
              v-model="queryParams.uName"
              placeholder="请输入用户名"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              style="width: 180px"
              v-model="queryParams.phone"
              placeholder="请输入手机号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item label="邀请码" prop="invitationCode">
            <el-input
              style="width: 180px"
              v-model="queryParams.invitationCode"
              placeholder="输入邀请码"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="注册设备" prop="regDevice">
            <el-input
              style="width: 180px"
              v-model="queryParams.regDevice"
              placeholder="注册设备"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select
              style="width: 180px"
              v-model="queryParams.sex"
              placeholder="用户性别"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in sexOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否实名" prop="isReal">
            <el-select
              style="width: 180px"
              v-model="queryParams.isReal"
              placeholder="是否实名"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in isRealOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型" prop="rid">
            <el-select
              style="width: 180px"
              v-model="queryParams.rid"
              placeholder="请选择"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in ridOptions"
                :key="dict.value"
                :label="dict.key"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="vip类型" prop="vid">
            <el-select
              style="width: 180px"
              v-model="queryParams.vid"
              placeholder="请选择"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in vidOptions"
                :key="dict.value"
                :label="dict.key"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态" prop="state">
            <el-select
              style="width: 180px"
              v-model="queryParams.state"
              placeholder="请选择"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in stateOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="最后登录时间"
            prop="lastLoginTime"
            label-width="150"
          >
            <el-date-picker
              v-model="queryParams.lastLoginTime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '80%' }"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="至"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
            >搜索
            </el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
            >重置
            </el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appUser:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appUserList">
          <el-table-column
            label="编号"
            align="center"
            prop="id"
            :show-overflow-tooltip="true"
          />
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
            label="微信名称"
            align="center"
            prop="weixinName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="微信号"
            align="center"
            prop="weixin"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="手机号"
            align="center"
            prop="phone"
            :show-overflow-tooltip="true"
          />
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
            label="身份证号"
            align="center"
            prop="idNumber"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="邀请码"
            align="center"
            prop="invitationCode"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="终端ip"
            align="center"
            prop="ipAddr"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="注册设备"
            align="center"
            prop="regDevice"
            :show-overflow-tooltip="true"
          />
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
            label="生日"
            align="center"
            prop="birthday"
            :show-overflow-tooltip="true"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.birthday) }}</span>
            </template>
          </el-table-column>
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
            label="vip到期时间"
            align="center"
            prop="vipEndTime"
            :show-overflow-tooltip="true"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.vipEndTime) }}</span>
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
          <el-table-column
            label="最后登录时间"
            align="center"
            prop="lastLoginTime"
            :show-overflow-tooltip="true"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.lastLoginTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最后登录IP"
            align="center"
            prop="lastLoginIp"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            class-name="small-padding fixed-width"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:appUser:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:appUser:edit']"
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="openDetail(scope.row)"
              >查看详情
              </el-button>
              <el-button
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-tickets"
                @click="openSub(scope.row)"
              >子用户
              </el-button>
              <el-popconfirm
                v-if="scope.row.state === 1"
                class="delete-popconfirm"
                title="确认要拉黑吗?"
                confirm-button-text="拉黑"
                @onConfirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:appUser:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-user-solid"
                >拉黑
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                v-if="scope.row.state === 2"
                class="delete-popconfirm"
                title="确认要洗白吗?"
                confirm-button-text="洗白"
                @onConfirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:appUser:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-user"
                >洗白
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="80%">

          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :inline="true"
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :span="2">
                <el-avatar v-if="form.id !== undefined" :size="60" :src="form.headPortrait===''? initUrl:form.headPortrait"/>
                  <el-avatar :size="60" src="https://empty" @error="true" v-else>
                    <img :src="initUrl"/>
                  </el-avatar>
              </el-col>
              <el-col :span="22">
                <el-form-item label="用户名" prop="uName">
                  <el-input v-model="form.uName" placeholder="用户名"/>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="form.nickName" placeholder="昵称"/>
                </el-form-item>
                <el-form-item label="微信名称" prop="weixinName">
                  <el-input v-model="form.weixinName" placeholder="微信名称"/>
                </el-form-item>
                <el-form-item label="微信号" prop="weixin">
                  <el-input v-model="form.weixin" placeholder="微信号"/>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" placeholder="手机号"/>
                </el-form-item>
                <el-form-item label="身份证号" prop="idNumber">
                  <el-input v-model="form.idNumber" placeholder="身份证号"/>
                </el-form-item>
                <el-form-item v-if="form.id !== undefined" label="邀请码" prop="invitationCode">
                  <el-input v-model="form.invitationCode" placeholder="邀请码"/>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="form.sex" placeholder="请选择" style="width: 183px">
                    <el-option
                      v-for="dict in sexOptions"
                      :key="parseInt(dict.value)"
                      :label="dict.label"
                      :value="parseInt(dict.value)"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="是否实名" prop="isReal">
                  <el-select v-model="form.isReal" placeholder="请选择" style="width: 183px">
                    <el-option
                      v-for="dict in isRealOptions"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="用户类型" prop="rid">
                  <el-select v-model="form.rid" placeholder="请选择" style="width: 183px">
                    <el-option
                      v-for="dict in ridOptions"
                      :key="parseInt(dict.value)"
                      :label="dict.key"
                      :value="parseInt(dict.value)"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="VIP类型" prop="vid">
                  <el-select v-model="form.vid" placeholder="请选择" style="width: 183px">
                    <el-option
                      v-for="dict in vidOptions"
                      :key="parseInt(dict.value)"
                      :label="dict.key"
                      :value="parseInt(dict.value)"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    style="width: 185px"
                    v-model="form.birthday"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
                <el-form-item label="账号状态" prop="state">
                  <el-select v-model="form.state" placeholder="请选择" style="width: 185px">
                    <el-option
                      v-for="dict in stateOptions"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="注册设备" prop="regDevice">
                  <el-input v-model="form.regDevice" placeholder="注册设备" disabled="disabled"/>
                </el-form-item>
                <el-form-item
                  v-if="form.id !== undefined"
                  label="VIP到期时间"
                  prop="vipEndTime"
                >
                  <el-date-picker
                    v-model="form.vipEndTime"
                    style="width: 185px"
                    type="date"
                    placeholder="选择日期"
                    disabled="disabled"
                  />
                </el-form-item>
                <el-form-item label="是否虚拟用户" prop="isVirtual">
                  <el-select v-model="form.isVirtual" placeholder="请选择" style="width: 185px">
                    <el-option
                      v-for="dict in isVirtualOptions"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.id !== undefined"
                  label="最后登录IP"
                  prop="lastLoginIp"
                >
                  <el-input
                    v-model="form.lastLoginIp"
                    placeholder="最后登录IP"
                    disabled="disabled"
                  />
                </el-form-item>
                <el-form-item
                  v-if="form.id !== undefined"
                  label="最后登录时间"
                  prop="lastLoginTime"
                >
                  <el-date-picker
                    v-model="form.lastLoginTime"
                    disabled="disabled"
                    style="width: 185px"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
                <el-form-item label="终端ip" prop="ipAddr">
                  <el-input v-model="form.ipAddr" placeholder="终端ip" disabled="disabled"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="用户详情" :visible.sync="isDetails" width="90%">
          <div>
            <userDetail :form="objDetails" :list="orderList"/>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">返回</el-button>
          </div>
        </el-dialog>

        <el-dialog title="子用户" :visible.sync="isSub" width="90%">
          <div>
            <accounts :list="subUserList"/>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">返回</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addAppUser,
  getAppUser,
  listAppUser,
  updateAppUser,
  updateAppUserState,
  findSubUser,
  GetByOrder
} from '@/api/admin/app-user'

import {listAppRole} from '@/api/admin/app-role'
import {listAppVip} from '@/api/admin/app-vip'
import userDetail from './user_detail.vue'
import accounts from './accounts.vue'

export default {
  name: 'AppUser',
  components: {
    userDetail,
    accounts
  },
  data() {
    return {
      initUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      appUserList: [],
      subUserList: [],
      sexOptions: [],
      isRealOptions: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      stateOptions: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '拉黑'
        }
      ],
      isVirtualOptions: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      isDetails: false,
      isSub: false,
      objDetails: {},
      // 关系表类型
      ridOptions: [],
      vidOptions: [],
      orderList:[],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
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
        rid: undefined,
        vid: undefined,
        state: undefined,
        lastLoginTime: undefined,
        lastLoginIp: undefined,
        isVirtual: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        uName: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '手机号不能为空', trigger: 'blur'}],
        sex: [{required: true, message: '性别不能为空', trigger: 'blur'}],
        regDevice: [
          {required: true, message: '注册设备不能为空', trigger: 'blur'}
        ],
        isReal: [
          {required: true, message: '是否实名不能为空', trigger: 'blur'}
        ],
        rid: [{required: true, message: '用户类型不能为空', trigger: 'blur'}],
        vid: [{required: true, message: 'vip类型不能为空', trigger: 'blur'}],
        state: [
          {required: true, message: '账号状态不能为空', trigger: 'blur'}
        ],
        isVirtualOptions: [
          {required: true, message: '账号状态不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('sys_user_sex').then((response) => {
      this.sexOptions = response.data
    })
    this.getAppRoleItems()
    this.getAppVipItems()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.appUserList = response.data.list
          this.total = response.data.count
          this.loading = false
        }
      )
    },
    getSubList(id) {
      findSubUser({id: id}).then(
        (response) => {
          this.subUserList = response.data
          this.isSub = true
        }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.isDetails = false
      this.isSub = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.objDetails = {}
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
    getItem(data, value) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === value + '') {
          return data[i].key
        }
      }
      return ''
    },
    getImgList: function () {
      this.form[this.fileIndex] =
        this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
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
      this.getItems(listAppRole, undefined).then((res) => {
        this.ridOptions = this.setItems(res, 'rName', 'id')
      })
    },
    getAppVipItems() {
      this.getItems(listAppVip, undefined).then((res) => {
        this.vidOptions = this.setItems(res, 'vName', 'id')
      })
    },
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加用户信息表'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    openDetail(row) {
      this.getOrderList(row.id)
      this.objDetails = row
    },
    openSub(row) {
      this.getSubList(row.id)
    },
    getOrderList(id){
      GetByOrder({id:id}).then((response) => {
        this.isDetails = true
        this.orderList = response.data
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getAppUser(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改用户信息表'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate((valid) => {
        const obj = JSON.parse(JSON.stringify(this.form))
        obj.rid = parseInt(this.form.rid)
        obj.sex = parseInt(this.form.sex)
        obj.vid = parseInt(this.form.vid)
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppUser(obj).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppUser(obj).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 拉黑按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认更改编号为"' + row.id + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          return updateAppUserState({id: row.id})
        })
        .then((response) => {
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            this.open = false
            this.getList()
          } else {
            this.msgError(response.msg)
          }
        })
        .catch(function () {
        })
    }
  }
}
</script>
