<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="名称" prop="vName">
            <el-input
              v-model="queryParams.vName"
              placeholder="请输入名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
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
              v-permisaction="['admin:appVip:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appVip:edit']"
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
              v-permisaction="['admin:appVip:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appVipList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="名称"
            align="center"
            prop="vName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="排序"
            align="center"
            prop="sort"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="手续费"
            align="center"
            prop="fee"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="有效月数"
            align="center"
            prop="month"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="备注"
            align="center"
            prop="remark"
            :show-overflow-tooltip="true"
          />
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
                  v-permisaction="['admin:appVip:edit']"
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
                  v-permisaction="['admin:appVip:remove']"
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

            <el-form-item label="名称" prop="vName">
              <el-input
                v-model="form.vName"
                placeholder="名称"
              />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input
                v-model="form.sort"
                placeholder="排序"
              />
            </el-form-item>
            <el-form-item label="手续费" prop="fee">
              <el-input
                v-model="form.fee"
                placeholder="手续费"
              />
            </el-form-item>
            <el-form-item label="有效月数" prop="month">
              <el-input
                v-model="form.month"
                placeholder="有效月数"
              />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                placeholder="备注"
              />
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
import { addAppVip, delAppVip, getAppVip, listAppVip, updateAppVip } from '@/api/admin/app-vip'

export default {
  name: 'AppVip',
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
      appVipList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        vName: undefined,
        month: undefined

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        vName: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
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
      listAppVip(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.appVipList = response.data.list
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
        vName: undefined,
        sort: undefined,
        fee: undefined,
        month: undefined,
        remark: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
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
      this.title = '添加AppVip'
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
      getAppVip(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改AppVip'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        const obj = JSON.parse(JSON.stringify(this.form))
        obj.sort = parseInt(this.form.sort)
        obj.month = parseInt(this.form.month)
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppVip(obj).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppVip(obj).then(response => {
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
      }).then(function() {
        return delAppVip({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
