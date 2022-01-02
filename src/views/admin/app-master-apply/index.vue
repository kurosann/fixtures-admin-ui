<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户编号">
            <el-input v-model="queryParams.userId" placeholder="请输入用户id" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="queryParams.uName" placeholder="请输入用户id" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="queryParams.phone" placeholder="请输入手机号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="queryParams.nickName" placeholder="请输入昵称" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="微信名">
            <el-input v-model="queryParams.weixinname" placeholder="请输入微信名" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="queryParams.pass" placeholder="请输入审核状态">
              <el-option
                v-for="dict in passOptions"
                :key="parseInt(dict.value)"
                :label="dict.label"
                :value="parseInt(dict.value)"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="注册时间"
            prop="lastLoginTime"
            label-width="150"
          >
            <el-date-picker
              v-model="creatTime"
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
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="appMasterApplyList" @selection-change="handleSelectionChange">
          <el-table-column label="用户id" align="center" prop="userId"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="用户名" align="center" prop="uName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="昵称" align="center" prop="nickName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="微信名" align="center" prop="weixinname"
                           :show-overflow-tooltip="true"/>
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
          <el-table-column label="手机号" align="center" prop="phone"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="身份证A" align="center" prop="idCardAUrl"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="setImg(scope.row.idCardAUrl,'身份证A')"
              >查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="身份证B" align="center" prop="idCardBUrl"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="setImg(scope.row.idCardBUrl,'身份证B')"
              >查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="实名照片" align="center" prop="realImgUrl"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="setImg(scope.row.realImgUrl,'实名照片')"
              >查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" align="center" prop="pass"
                           :formatter="passFormat" width="100">
            <template slot-scope="scope">
              {{ passFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="注册时间" align="center" prop="createdAt"
                           :formatter="passFormat" width="100">
            <template slot-scope="scope">
              {{ timeFormat(scope.row.createdAt) }}
            </template>
          </el-table-column>

          <el-table-column label="原因" align="center" prop="reason"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="120">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:appMasterApply:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                v-if="scope.row.pass===1"
                @click="changeState(scope.row.id,2)"
              >通过
              </el-button>
              <el-button
                v-if="scope.row.pass===1"
                slot="reference"
                v-permisaction="['admin:appMasterApply:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="changeState(scope.row.id,3)"
              >否决
              </el-button>
              <el-button
                v-if="scope.row.pass!==1"
                slot="reference"
                size="mini"
                type="text"
                icon="el-icon-s-promotion"
                @click="sendMsg(scope.row.id)"
              >发送
              </el-button>

            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <img :src="img" width="100%" height="100%"/>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addAppMasterApply, auditAppMasterApply,
  delAppMasterApply,
  getAppMasterApply,
  listAppMasterApply, sendAppMasterApply,
  updateAppMasterApply
} from '@/api/admin/app-master-apply'
import moment from 'moment'
export default {
  name: 'AppMasterApply',
  components: {},
  data() {
    return {
      img: "",
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
      appMasterApplyList: [],
      passOptions: [],
      // 关系表类型
      sexOptions: [],
      creatTime:undefined,
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        uName: undefined,
        nickName: undefined,
        weixinname: undefined,
        pass: undefined,
        startTime:undefined,
      },
      // lastTime: undefined,
      // lStartTime:undefined,
      // lEndTime:undefined,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [{required: true, message: '用户id不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('app_is_examine').then(response => {
      this.passOptions = response.data
    })
    this.getDicts('sys_user_sex').then((response) => {
      this.sexOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      console.log(this.creatTime)
      if(this.creatTime!==undefined&&this.creatTime.length > 0){
        this.queryParams.startTime = moment(this.creatTime[0]).format('YYYY-MM-DD')
        this.dateRange = []
        this.dateRange.push(moment(this.creatTime[0]).format('YYYY-MM-DD'))
        this.dateRange.push(moment(this.creatTime[1]).format('YYYY-MM-DD'))
      }
      listAppMasterApply(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appMasterApplyList = response.data.list
          this.total = response.data.count
          this.loading = false
        }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        idCardAUrl: undefined,
        idCardBUrl: undefined,
        realImgUrl: undefined,
        reason: undefined,
        pass: undefined,
      }
      this.resetForm('form')
    },
    getImgList: function () {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
      this.fileOpen = false
    },
    passFormat(row) {
      return this.selectDictLabel(this.passOptions, row.pass)
    },
    timeFormat(times) {
      return moment(times).format('YYYY-MM-DD HH:mm:ss')
    },
    sexFormat(row) {
      return this.selectDictLabel(this.sexOptions, row.sex)
    },
    setImg(url, title) {
      this.img = url
      this.title = title
      this.open = true
    },
    // 关系
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
      this.title = '添加师傅实名申请'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
        row.id || this.ids
      getAppMasterApply(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改师傅实名申请'
        this.isEdit = true
      })
    },
    changeState(id, state) {
      auditAppMasterApply({id: id, state: state}).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      })
    },
    sendMsg(id) {
      sendAppMasterApply({id: id}).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppMasterApply(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppMasterApply(this.form).then(response => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delAppMasterApply({'ids': Ids})
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function () {
      })
    }
  }
}
</script>
