<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
          <el-form-item label="售后单号" prop="afterNo">
            <el-input v-model="queryParams.afterNo" placeholder="请输入售后单号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="处理订单号" prop="orderNo">
            <el-input v-model="queryParams.orderNo" placeholder="请输入处理订单号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="支付流水号" prop="payNo">
            <el-input v-model="queryParams.payNo" placeholder="请输入支付流水号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="售后类型" prop="afterType">
            <el-input v-model="queryParams.afterType" placeholder="请输入售后类型" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="提交人" prop="dealByUser">
            <el-input v-model="queryParams.dealByUser" placeholder="请输入提交人" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="处理时间" prop="dealTime">
            <el-input v-model="queryParams.dealTime" placeholder="请输入处理时间" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="审核时间" prop="auditTime">
            <el-input v-model="queryParams.auditTime" placeholder="请输入审核时间" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="售后状态" prop="state">
            <el-select v-model="queryParams.state"
                       placeholder="售后订单售后状态" clearable size="small">
              <el-option
                v-for="dict in stateOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <br>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appAfterOrder:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appAfterOrder:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appAfterOrder:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appAfterOrderList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="售后单号" align="center" prop="afterNo" width="120"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="处理订单号" align="center" prop="orderNo" width="120"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="支付流水号" align="center" prop="payNo" width="120"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="售后类型" align="center" prop="afterType" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="售后原因" align="center" prop="reasion" width="150"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="处理类型" align="center" prop="dealType"
                           :formatter="dealTypeFormat" width="100">
            <template slot-scope="scope">
              {{ dealTypeFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="提交人" align="center" prop="dealByUser" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="标的款" align="center" prop="tagPrice" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="补贴" align="center" prop="subsidy" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="实付款" align="center" prop="realPrice" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="处理时间" align="center" prop="dealTime" width="150"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.dealTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付进度" align="center" prop="planNums"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="进程天数" align="center" prop="planDay" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="进程总天数" align="center" prop="totalDay" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="工程天数" align="center" prop="workDay" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="处理备注" align="center" prop="dealRemark" width="120"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="审核人" align="center" prop="auditByUser" width="100"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="审核时间" align="center" prop="auditTime" width="150"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.auditTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="售后状态" align="center" prop="state"
                           :formatter="stateFormat" width="100">
            <template slot-scope="scope">
              {{ stateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="120">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:appItem:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:appItem:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除
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
        <el-dialog :title="title" :visible.sync="open" width="90%">
          <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="100px">

            <el-form-item label="售后单号" prop="afterNo">
              <el-input v-model="form.afterNo" placeholder="售后单号"
              />
            </el-form-item>
            <el-form-item label="处理订单号" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="处理订单号"
              />
            </el-form-item>
            <el-form-item label="支付流水号" prop="payNo">
              <el-input v-model="form.payNo" placeholder="支付流水号"
              />
            </el-form-item>

            <el-form-item label="售后类型" prop="afterType">
              <el-input v-model="form.afterType" placeholder="售后类型"
              />
            </el-form-item>
            <el-form-item label="售后原因" prop="reasion">
              <el-input v-model="form.reasion" placeholder="售后原因"
              />
            </el-form-item>

            <el-form-item label="提交人" prop="dealByUser">
              <el-input v-model="form.dealByUser" placeholder="提交人"
              />
            </el-form-item>
            <el-form-item label="标的款" prop="tagPrice">
              <el-input v-model="form.tagPrice" placeholder="标的款"
              />
            </el-form-item>
            <el-form-item label="补贴" prop="subsidy">
              <el-input v-model="form.subsidy" placeholder="补贴"
              />
            </el-form-item>
            <el-form-item label="实付款" prop="realPrice">
              <el-input v-model="form.realPrice" placeholder="实付款"
              />
            </el-form-item>

            <el-form-item label="支付进度" prop="planNums">
              <el-input v-model="form.planNums" placeholder="支付进度"
              />
            </el-form-item>
            <el-form-item label="进程天数" prop="planDay">
              <el-input v-model="form.planDay" placeholder="进程天数"
              />
            </el-form-item>
            <el-form-item label="进程总天数" prop="totalDay">
              <el-input v-model="form.totalDay" placeholder="进程总天数"
              />
            </el-form-item>
            <el-form-item label="工程天数" prop="workDay">
              <el-input v-model="form.workDay" placeholder="工程天数"
              />
            </el-form-item>
            <el-form-item label="处理备注" prop="dealRemark">
              <el-input v-model="form.dealRemark" placeholder="处理备注"
              />
            </el-form-item>
            <el-form-item label="审核人" prop="auditByUser">
              <el-input v-model="form.auditByUser" placeholder="审核人"
              />
            </el-form-item>

            <el-form-item label="处理时间" prop="dealTime">
              <el-date-picker
                v-model="form.dealTime"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="审核时间" prop="auditTime">
              <el-date-picker
                v-model="form.auditTime"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="form.dealType"
                         placeholder="请选择">
                <el-option
                  v-for="dict in dealTypeOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="售后状态" prop="state">
              <el-select v-model="form.state"
                         placeholder="请选择">
                <el-option
                  v-for="dict in stateOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addAppAfterOrder,
  delAppAfterOrder,
  getAppAfterOrder,
  listAppAfterOrder,
  updateAppAfterOrder
} from '@/api/admin/app-after-order'

export default {
  name: 'AppAfterOrder',
  components: {},
  data() {
    return {
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
      appAfterOrderList: [],
      dealTypeOptions: [], stateOptions: [],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        afterNo: undefined,
        orderNo: undefined,
        payNo: undefined,
        afterType: undefined,
        dealByUser: undefined,
        dealTime: undefined,
        auditTime: undefined,
        state: undefined,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        afterNo: [{required: true, message: '售后单号不能为空', trigger: 'blur'}],
        orderNo: [{required: true, message: '处理订单号不能为空', trigger: 'blur'}],
        payNo: [{required: true, message: '支付流水号不能为空', trigger: 'blur'}],
        afterType: [{required: true, message: '售后类型不能为空', trigger: 'blur'}],
        dealByUser: [{required: true, message: '提交人不能为空', trigger: 'blur'}],
        dealTime: [{required: true, message: '处理时间不能为空', trigger: 'blur'}],
        auditTime: [{required: true, message: '审核时间不能为空', trigger: 'blur'}],
        state: [{required: true, message: '售后状态不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('app_pro_type').then(response => {
      this.dealTypeOptions = response.data
    })
    this.getDicts('app_order_after_state').then(response => {
      this.stateOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppAfterOrder(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appAfterOrderList = response.data.list
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
        afterNo: undefined,
        orderNo: undefined,
        payNo: undefined,
        afterType: undefined,
        reasion: undefined,
        dealType: undefined,
        dealByUser: undefined,
        tagPrice: undefined,
        subsidy: undefined,
        realPrice: undefined,
        dealTime: undefined,
        planNums: undefined,
        planDay: undefined,
        totalDay: undefined,
        workDay: undefined,
        dealRemark: undefined,
        auditByUser: undefined,
        auditTime: undefined,
        state: undefined,
      }
      this.resetForm('form')
    },
    getImgList: function () {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
      this.fileOpen = false
    },
    dealTypeFormat(row) {
      return this.selectDictLabel(this.dealTypeOptions, row.dealType)
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
      this.title = '添加售后订单'
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
      getAppAfterOrder(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改售后订单'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppAfterOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppAfterOrder(this.form).then(response => {
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
        return delAppAfterOrder({'ids': Ids})
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
