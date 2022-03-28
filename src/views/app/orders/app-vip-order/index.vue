<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="queryParams.orderNo" placeholder="请输入订单号" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="VIP名称" prop="vipName">
            <el-input v-model="queryParams.vipName" placeholder="请输入VIP名称" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="queryParams.userId" placeholder="请输入用户ID" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="支付平台" prop="payPlatform">
            <el-input v-model="queryParams.payPlatform" placeholder="请输入支付平台" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appVipOrder:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appVipOrder:edit']"
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
              v-permisaction="['admin:appVipOrder:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appVipOrderList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="订单号" align="center" prop="orderNo"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="VIP-ID" align="center" prop="vipId"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="VIP名称" align="center" prop="vipName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="VIP价格" align="center" prop="vipPrice"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="支付流水号" align="center" prop="orderFlow"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="支付状态" align="center" prop="orderState"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ SwitchOrderState(scope.row.orderState)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="平台" align="center" prop="payPlatform"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="vip到期时间" align="center" prop="vipEndTime"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.vipEndTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户ID" align="center" prop="userId"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="用户名称" align="center" prop="userName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="支付平台" align="center" prop="payPlatform"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @onConfirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:appVipOrder:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @onConfirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:appVipOrder:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
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
  addAppVipOrder,
  delAppVipOrder,
  getAppVipOrder,
  listAppVipOrder,
  updateAppVipOrder
} from '@/api/admin/app-vip-order'

export default {
  name: 'AppVipOrder',
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
      appVipOrderList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        orderNo: undefined,
        vipName: undefined,
        userId: undefined,
        userName: undefined,
        payPlatform: undefined,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderNo: [{required: true, message: '订单号不能为空', trigger: 'blur'}],
        vipName: [{required: true, message: 'VIP名称不能为空', trigger: 'blur'}],
        userId: [{required: true, message: '用户ID不能为空', trigger: 'blur'}],
        userName: [{required: true, message: '用户名称不能为空', trigger: 'blur'}],
        payPlatform: [{required: true, message: '支付平台不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppVipOrder(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appVipOrderList = response.data.list
          this.total = response.data.count
          this.loading = false
        }
      )
    },
    SwitchOrderState(state){
      switch (state) {
        case 1:
          return "待支付"
        case 2:
          return "已支付"
        case 3:
          return "未支付"
      }
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
      }
      this.resetForm('form')
    },
    getImgList: function () {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
      this.fileOpen = false
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
      this.title = '添加AppVipOrder'
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
      getAppVipOrder(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改AppVipOrder'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppVipOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppVipOrder(this.form).then(response => {
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
        return delAppVipOrder({'ids': Ids})
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
