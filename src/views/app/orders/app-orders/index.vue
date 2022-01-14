<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
          <el-form-item label="下单用户" prop="orderName">
            <el-input v-model="queryParams.orderName" placeholder="请输入下单用户名字" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="手机号" prop="orderUserPhone">
            <el-input v-model="queryParams.orderUserPhone" placeholder="请输入用户手机号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="下单手机" prop="orderPhone">
            <el-input v-model="queryParams.orderPhone" placeholder="请输入下单手机号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="订单类型" prop="orderType">
            <el-select v-model="queryParams.orderType"
                       placeholder="订单管理订单类型" clearable size="small">
              <el-option
                v-for="dict in orderTypeOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态" prop="orderState">
            <el-select v-model="queryParams.orderState"
                       placeholder="订单管理订单状态" clearable size="small">
              <el-option
                v-for="dict in orderStateOptions"
                :key="parseInt(dict.value)"
                :label="dict.label"
                :value="parseInt(dict.value)"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="订单截止时间"
            prop="lastLoginTime"
            label-width="150"
          >
            <el-date-picker
              v-model="queryParams.deadlineAtTime"
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

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appOrders:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appOrders:edit']"
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
              v-permisaction="['admin:appOrders:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appOrdersList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="订单评价" align="center" prop="comments"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="订单类型" align="center" prop="orderType"
                           :formatter="orderTypeFormat" width="100">
            <template slot-scope="scope">
              {{ orderTypeFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="支付凭证" align="center" prop="paymentVoucher"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="实付金额" align="center" prop="payAmount"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="应付金额" align="center" prop="shouldPay"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="预估价" align="center" prop="evaluation"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="标价" align="center" prop="tagPrice"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="下单用户名字" align="center" prop="orderName" width="150"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="用户手机号" align="center" prop="orderUserPhone" width="150"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="下单手机号" align="center" prop="orderPhone" width="150"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="订单号" align="center" prop="orderNo"  width="180"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="折扣" align="center" prop="discount"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="订单状态" align="center" prop="orderState"
                           :formatter="orderStateFormat" width="100">
            <template slot-scope="scope">
              {{ orderStateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="订单创建时间" align="center" prop="completeTime" width="160"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createdAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单完成时间" align="center" prop="completeTime" width="160"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.completeTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单截止时间" align="center" prop="deadlineAt" width="160"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.deadlineAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width"  fixed="right"  width="120">
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
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="订单评价" prop="comments">
              <el-input v-model="form.comments" placeholder="订单评价"
              />
            </el-form-item>
            <el-form-item label="订单状态" prop="orderState">
              <el-select v-model="form.orderState"
                         placeholder="请选择">
                <el-option
                  v-for="dict in orderStateOptions"
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
import {addAppOrders, delAppOrders, getAppOrders, listAppOrders, updateAppOrders} from '@/api/admin/app-orders'

export default {
  name: 'AppOrders',
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
      appOrdersList: [],
      orderTypeOptions: [], orderStateOptions: [], isVirtualOptions: [],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        comments: undefined,
        orderType: undefined,
        orderName: undefined,
        orderUserPhone: undefined,
        orderPhone: undefined,
        orderState: undefined,
        deadlineAt: undefined,
        deadlineAtTime:undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderType: [{required: true, message: '订单类型不能为空', trigger: 'blur'}],
        orderName: [{required: true, message: '下单用户名字不能为空', trigger: 'blur'}],
        orderUserPhone: [{required: true, message: '用户手机号不能为空', trigger: 'blur'}],
        orderPhone: [{required: true, message: '下单手机号不能为空', trigger: 'blur'}],
        orderState: [{required: true, message: '订单状态不能为空', trigger: 'blur'}],
        deadlineAt: [{required: true, message: '订单截止时间不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('item_type').then(response => {
      this.orderTypeOptions = response.data
    })
    this.getDicts('app_order_state').then(response => {
      this.orderStateOptions = response.data
    })
    this.getDicts('order_is_ok').then(response => {
      this.isVirtualOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppOrders(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appOrdersList = response.data.list
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
        comments: undefined,
        orderState: undefined,
      }
      this.resetForm('form')
    },
    getImgList: function () {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
      this.fileOpen = false
    },
    orderTypeFormat(row) {
      return this.selectDictLabel(this.orderTypeOptions, row.orderType)
    },
    orderStateFormat(row) {
      return this.selectDictLabel(this.orderStateOptions, row.orderState)
    },
    isVirtualFormat(row) {
      return this.selectDictLabel(this.isVirtualOptions, row.isVirtual)
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
      this.title = '添加订单管理'
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
      getAppOrders(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改订单管理'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppOrders(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppOrders(this.form).then(response => {
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
        return delAppOrders({'ids': Ids})
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
