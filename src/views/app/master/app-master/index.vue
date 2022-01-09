<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="师傅ID" prop="userId">
            <el-input v-model="queryParams.userId" placeholder="请输入师傅ID" clearable
                      size="small" @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="服务分数" prop="services">
            <el-input v-model="queryParams.services" placeholder="请输入服务分数" clearable
                      size="small" @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手艺分数" prop="crafts">
            <el-input v-model="queryParams.crafts" placeholder="请输入手艺分数" clearable
                      size="small" @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="是否实名" prop="realState">
            <el-select v-model="queryParams.realState"
                       placeholder="师傅详情是否实名" clearable size="small"
            >
              <el-option
                v-for="dict in realStateOptions"
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
              v-permisaction="['admin:appMaster:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appMasterList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="会员ID" align="center" prop="userId"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="用户名" align="center" prop="uName"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="手机号" align="center" prop="phone"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="微信" align="center" prop="weixinName"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="服务分数" align="center" prop="services"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="手艺分数" align="center" prop="crafts"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="优惠力度" align="center" prop="discount"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="工程类数" align="center" prop="workTypeNums"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="是否实名" align="center" prop="realState"
                           :formatter="realStateFormat" width="100"
          >
            <template slot-scope="scope">
              {{ realStateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="注册时间" align="center" prop="registerTime"
                           :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.registerTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册设备" align="center" prop="registerFacility"
                           :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                v-permisaction="['admin:appMaster:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="editUpdate(scope.row)"
              >修改
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

            <el-form-item label="服务分数" prop="services">
              <el-input v-model="form.services" placeholder="服务分数"
              />
            </el-form-item>
            <el-form-item label="手艺分数" prop="crafts">
              <el-input v-model="form.crafts" placeholder="手艺分数"
              />
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="form.state">
                <el-radio
                  v-for="dict in stateOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优惠力度" prop="discount">
              <el-input v-model="form.discount" placeholder="优惠力度"
              />
            </el-form-item>
            <el-form-item label="注册设备" prop="registerFacility">
              <el-input v-model="form.registerFacility" placeholder="注册设备"
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
import { addAppMaster, delAppMaster, getAppMaster, listAppMaster, updateAppMaster } from '@/api/admin/app-master'

export default {
  name: 'AppMaster',
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
      appMasterList: [],
      stateOptions: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '停用'
        }
      ],
      realStateOptions: [{
        value: 1,
        label: '是'
      },
        {
          value: 2,
          label: '否'
        }],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        services: undefined,
        crafts: undefined,
        realState: undefined

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [{ required: true, message: '师傅ID不能为空', trigger: 'blur' }],
        services: [{ required: true, message: '服务分数不能为空', trigger: 'blur' }],
        crafts: [{ required: true, message: '手艺分数不能为空', trigger: 'blur' }],
        realState: [{ required: true, message: '是否实名不能为空', trigger: 'blur' }]
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
      listAppMaster(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appMasterList = response.data.list
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
        services: undefined,
        crafts: undefined,
        state: undefined,
        discount: undefined,
        registerFacility: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    stateFormat(row) {
      for (let i = 0; i < this.stateOptions.length; i++) {
        if (this.stateOptions[i].value === row.state) {
          return this.stateOptions[i].label
        }
      }
      return ''
    },
    realStateFormat(row) {
      for (let i = 0; i < this.realStateOptions.length; i++) {
        if (this.realStateOptions[i].value === row.realState) {
          return this.realStateOptions[i].label
        }
      }
      return ''
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
      this.title = '添加师傅详情'
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
      console.log(row)
      this.reset()
      const id = row.id || this.ids
      console.log(id)
      getAppMaster(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改师傅详情'
        this.isEdit = true
      })
    },

    /** 修改按钮操作 */
    editUpdate(row) {
      console.log(row)
      this.reset()
      getAppMaster(row.id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改师傅详情'
        this.isEdit = true
      })
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        const obj = JSON.parse(JSON.stringify(this.form))
        obj.state = parseInt(this.form.state)
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppMaster(obj).then(response => {
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
        return delAppMaster({ 'ids': Ids })
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
