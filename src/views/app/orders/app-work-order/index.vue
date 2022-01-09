<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="70px">
          <el-form-item label="订单ID" prop="orderNo">
            <el-input v-model="queryParams.orderNo" placeholder="请输入订单ID" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="顾客" prop="customer">
            <el-input v-model="queryParams.customer" placeholder="请输入顾客" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="师傅" prop="masterId">
            <el-input v-model="queryParams.masterId" placeholder="请输入师傅" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="处理时间" prop="dealTime">
            <el-input v-model="queryParams.dealTime" placeholder="请输入处理时间" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="估值" prop="valuation">
            <el-input v-model="queryParams.valuation" placeholder="请输入估值" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="流水号" prop="orderFlow">
            <el-input v-model="queryParams.orderFlow" placeholder="请输入单笔订单流水号" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="实际付款" prop="realPlay">
            <el-input v-model="queryParams.realPlay" placeholder="请输入实际付款" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="应付款" prop="shouldPlay">
            <el-input v-model="queryParams.shouldPlay" placeholder="请输入应付款" clearable style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="交易类型" prop="dealType">
            <el-select v-model="queryParams.dealType"  style="width: 180px"
                       placeholder="工程订单交易类型" clearable size="small">
              <el-option
                v-for="dict in dealTypeOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="付款凭据" prop="playProof">
            <el-input v-model="queryParams.playProof" placeholder="请输入付款凭据" clearable  style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="完成时间" prop="completeTime">
            <el-input v-model="queryParams.completeTime" placeholder="请输入完成时间" clearable  style="width: 180px"
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="订单状态" prop="state">
            <el-select v-model="queryParams.state"  style="width: 180px"
                       placeholder="工程订单订单状态" clearable size="small">
              <el-option
                v-for="dict in stateOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="售后状态" prop="afterState">
            <el-select v-model="queryParams.afterState"  style="width: 180px"
                       placeholder="工程订单售后状态" clearable size="small">
              <el-option
                v-for="dict in afterStateOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appWorkOrder:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appWorkOrder:edit']"
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
              v-permisaction="['admin:appWorkOrder:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appWorkOrderList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="订单ID" align="center" prop="orderNo"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="顾客" align="center" prop="customer"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="师傅" align="center" prop="masterId"
                           :show-overflow-tooltip="true"/>

          <el-table-column label="估值" align="center" prop="valuation"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="流水号" align="center" prop="orderFlow" width="150"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="实际付款" align="center" prop="realPlay"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="应付款" align="center" prop="shouldPlay"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="交易类型" align="center" prop="dealType"
                           :formatter="dealTypeFormat" width="100">
            <template slot-scope="scope">
              {{ dealTypeFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="订单状态" align="center" prop="state"
                           :formatter="stateFormat" width="100">
            <template slot-scope="scope">
              {{ stateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="售后状态" align="center" prop="afterState"
                           :formatter="afterStateFormat" width="100">
            <template slot-scope="scope">
              {{ afterStateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="付款凭据" align="center" prop="playProof"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="处理时间" align="center" prop="dealTime"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.dealTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="完成时间" align="center" prop="completeTime"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.completeTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right"  width="150">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:appWorkOrder:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                slot="reference"
                v-permisaction="['admin:appWorkOrder:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="处理时间" prop="dealTime">
              <el-date-picker
                v-model="form.dealTime"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="估值" prop="valuation">
              <el-input v-model="form.valuation" placeholder="估值"
              />
            </el-form-item>
            <el-form-item label="实际付款" prop="realPlay">
              <el-input v-model="form.realPlay" placeholder="实际付款"
              />
            </el-form-item>
            <el-form-item label="应付款" prop="shouldPlay">
              <el-input v-model="form.shouldPlay" placeholder="应付款"
              />
            </el-form-item>
            <el-form-item label="交易类型" prop="dealType">
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
            <el-form-item label="付款凭据" prop="playProof">
              <el-input v-model="form.playProof" placeholder="付款凭据"
              />
            </el-form-item>
            <el-form-item label="完成时间" prop="completeTime">
              <el-date-picker
                v-model="form.completeTime"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="订单状态" prop="state">
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
            <el-form-item label="售后状态" prop="afterState">
              <el-select v-model="form.afterState"
                         placeholder="请选择">
                <el-option
                  v-for="dict in afterStateOptions"
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
  addAppWorkOrder,
  delAppWorkOrder,
  getAppWorkOrder,
  listAppWorkOrder,
  updateAppWorkOrder
} from '@/api/admin/app-work-order'

export default {
  name: 'AppWorkOrder',
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
      appWorkOrderList: [],
      dealTypeOptions: [], stateOptions: [], afterStateOptions: [],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        orderNo: undefined,
        customer: undefined,
        masterId: undefined,
        dealTime: undefined,
        valuation: undefined,
        orderFlow: undefined,
        realPlay: undefined,
        shouldPlay: undefined,
        dealType: undefined,
        playProof: undefined,
        completeTime: undefined,
        state: undefined,
        afterState: undefined,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderNo: [{required: true, message: '订单ID不能为空', trigger: 'blur'}],
        customer: [{required: true, message: '顾客不能为空', trigger: 'blur'}],
        masterId: [{required: true, message: '师傅不能为空', trigger: 'blur'}],
        dealTime: [{required: true, message: '处理时间不能为空', trigger: 'blur'}],
        valuation: [{required: true, message: '估值不能为空', trigger: 'blur'}],
        orderFlow: [{required: true, message: '单笔订单流水号不能为空', trigger: 'blur'}],
        realPlay: [{required: true, message: '实际付款不能为空', trigger: 'blur'}],
        shouldPlay: [{required: true, message: '应付款不能为空', trigger: 'blur'}],
        dealType: [{required: true, message: '交易类型不能为空', trigger: 'blur'}],
        playProof: [{required: true, message: '付款凭据不能为空', trigger: 'blur'}],
        completeTime: [{required: true, message: '完成时间不能为空', trigger: 'blur'}],
        state: [{required: true, message: '订单状态不能为空', trigger: 'blur'}],
        afterState: [{required: true, message: '售后状态不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('app_deal_type').then(response => {
      this.dealTypeOptions = response.data
    })
    this.getDicts('app_order_state').then(response => {
      this.stateOptions = response.data
    })
    this.getDicts('app_order_after_state').then(response => {
      this.afterStateOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppWorkOrder(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appWorkOrderList = response.data.list
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
        dealTime: undefined,
        valuation: undefined,
        realPlay: undefined,
        shouldPlay: undefined,
        dealType: undefined,
        playProof: undefined,
        completeTime: undefined,
        state: undefined,
        afterState: undefined,
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
    afterStateFormat(row) {
      return this.selectDictLabel(this.afterStateOptions, row.afterState)
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
      this.title = '添加工程订单'
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
      getAppWorkOrder(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改工程订单'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppWorkOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppWorkOrder(this.form).then(response => {
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
        return delAppWorkOrder({'ids': Ids})
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
