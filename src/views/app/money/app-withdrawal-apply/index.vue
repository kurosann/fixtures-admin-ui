<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="申请单号" prop="applyNo">
            <el-input v-model="queryParams.applyNo" placeholder="请输入申请单号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="用户Id" prop="userId">
            <el-input v-model="queryParams.userId" placeholder="请输入用户Id" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="收款方式" prop="receiverWay">
            <el-select v-model="queryParams.receiverWay"
                       placeholder="用户提现申请收款方式" clearable size="small">
              <el-option
                v-for="dict in receiverWayOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="收款账户" prop="receiverAccount">
            <el-input v-model="queryParams.receiverAccount" placeholder="请输入收款账户" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="审核状态" prop="state">
            <el-select v-model="queryParams.state"
                       placeholder="用户提现申请审核状态" clearable size="small">
              <el-option
                v-for="dict in stateOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="交易凭据" prop="txProofUrl">
            <el-input v-model="queryParams.txProofUrl" placeholder="请输入交易凭据" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item
            label="完成时间"
            prop="completeTime"
            label-width="150"
          >
            <el-date-picker
              v-model="queryParams.cTime"
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
        <el-table v-loading="loading" :data="appWithdrawalApplyList" @selection-change="handleSelectionChange">
          <el-table-column label="申请单号" align="center" prop="applyNo"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="用户Id" align="center" prop="userId"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="收款方式" align="center" prop="receiverWay"
                           :formatter="receiverWayFormat" width="100">
            <template slot-scope="scope">
              {{ receiverWayFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="收款账户" align="center" prop="receiverAccount"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="平台承担" align="center" prop="platformBear"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="第三方承担" align="center" prop="otherBear"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="金额" align="center" prop="amount"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="完成时间" align="center" prop="completeTime"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.completeTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" align="center" prop="state"
                           :formatter="stateFormat" width="100">
            <template slot-scope="scope">
              {{ stateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="交易凭据" align="center" prop="txProofUrl"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="120">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:appWithdrawalApply:edit']"
                size="mini"
                type="text"
                icon="el-icon-check"
                @click="handleUpdate(scope.row,2)"
                v-if="scope.row.state===1"
              >通过
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:appWithdrawalApply:edit']"
                size="mini"
                type="text"
                icon="el-icon-close"
                @click="handleUpdate(scope.row,3)"
                v-if="scope.row.state===1"
              >拒绝
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:appWithdrawalApply:edit']"
                size="mini"
                type="text"
                icon="el-icon-s-promotion"
                @click="handleUpdate(scope.row,4)"
                v-if=" scope.row.state === 2 "
              >上传凭证
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:appWithdrawalApply:edit']"
                size="mini"
                type="text"
                icon="el-icon-s-promotion"
                @click="handleUpdate(scope.row,5)"
                v-if="(scope.row.state === 3 && scope.row.state !== 4)"
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
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-upload
            class="avatar-uploader"
            :data="{type:'1'}"
            name="file"
            :headers="{Authorization:authorization}"
            :action="url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">

            <img v-if="imageUrl!== ''" :src="baseUrl + imageUrl" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="open = false">取 消</el-button>
            <el-button type="primary" @click="open = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addAppWithdrawalApply,
  delAppWithdrawalApply,
  getAppWithdrawalApply,
  listAppWithdrawalApply,
  updateAppWithdrawalApply
} from '@/api/admin/app-withdrawal-apply'
import {appWalletWithdrawSuccess, appWalletWithdrawFail} from '@/api/admin/app-wallet'
import {getToken} from '@/utils/auth'

export default {
  name: 'AppWithdrawalApply',
  components: {},
  data() {
    return {
      baseUrl:process.env.VUE_APP_BASE_API,
      url: process.env.VUE_APP_BASE_API + "/api/v1/public/uploadFile",
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 遮罩层
      loading: true,
      imageUrl: "",
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '上传交易凭据',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      appWithdrawalApplyList: [],
      receiverWayOptions: [], stateOptions: [],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        applyNo: undefined,
        userId: undefined,
        receiverWay: undefined,
        receiverAccount: undefined,
        platformBear: undefined,
        amount: undefined,
        completeTime: undefined,
        state: undefined,
        cTime: undefined,
        txProofUrl: undefined,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        applyNo: [{required: true, message: '申请单号不能为空', trigger: 'blur'}],
        userId: [{required: true, message: '用户Id不能为空', trigger: 'blur'}],
        receiverWay: [{required: true, message: '收款方式不能为空', trigger: 'blur'}],
        receiverAccount: [{required: true, message: '收款账户不能为空', trigger: 'blur'}],
        completeTime: [{required: true, message: '完成时间不能为空', trigger: 'blur'}],
        state: [{required: true, message: '审核状态不能为空', trigger: 'blur'}],
        txProofUrl: [{required: true, message: '交易凭据不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.authorization = 'Bearer ' + getToken()
    this.getList()
    this.getDicts('pay_way').then(response => {
      this.receiverWayOptions = response.data
    })
    this.getDicts('app_is_examine').then(response => {
      this.stateOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppWithdrawalApply(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appWithdrawalApplyList = response.data.list
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
        applyNo: undefined,
        userId: undefined,
        receiverWay: undefined,
        receiverAccount: undefined,
        platformBear: undefined,
        otherBear: undefined,
        amount: undefined,
        state: undefined,
        txProofUrl: undefined,
      }
      this.resetForm('form')
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        // process.env.VUE_APP_BASE_API +
        // var imgPath =  "/" + res.data.full_path
        this.imageUrl = res.data.full_path
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        // 更新请求
        this.open = false
        this.imageUrl = ''
      } else {
        this.imageUrl = ''
        this.$message.error('上传失败');
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    getImgList: function () {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
      this.fileOpen = false
    },
    receiverWayFormat(row) {
      return this.selectDictLabel(this.receiverWayOptions, row.receiverWay)
    },
    stateFormat(row) {
      return this.selectDictLabel(this.stateOptions, row.state)
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
      this.title = '添加用户提现申请'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset()
    //   const id =
    //     row.id || this.ids
    //   getAppWithdrawalApply(id).then(response => {
    //     this.form = response.data
    //     this.open = true
    //     this.title = '修改用户提现申请'
    //     this.isEdit = true
    //   })
    // },
    handleUpdate(row, tag) {
      //this.reset()
      //const id = row.id
      // 通过
      if (tag === 2) {
        appWalletWithdrawSuccess(row).then(response => {
          if (response.code===200) {
            this.$message({
              showClose: true,
              message: '已经通过',
              type: 'success'
            });
            this.getList()
          }else {
            this.$message({
              showClose: true,
              message: response.msg,
              type: 'error'
            });
          }
        })
      }
      // 拒绝
      if (tag === 3) {
        appWalletWithdrawFail(row).then(response => {
          if (response.code===200){
            this.$message({
              showClose: true,
              message: '已经拒绝',
              type: 'success'
            });
            this.getList()
          }else {
            this.$message({
              showClose: true,
              message: response.msg,
              type: 'error'
            });
          }
        })
      }
      // 上传交易凭据
      if (tag === 4) {
        this.open = true
        this.isEdit = true
      }
      // 发送
      if (tag === 5) {
        this.getList()
      }

    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppWithdrawalApply(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppWithdrawalApply(this.form).then(response => {
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
        return delAppWithdrawalApply({'ids': Ids})
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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
