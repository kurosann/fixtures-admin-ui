<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="平台名称" prop="itemName">
            <el-input v-model="queryParams.itemName" placeholder="请输入平台名称" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="简略标" prop="itemSimple">
            <el-input v-model="queryParams.itemSimple" placeholder="请输入简略标" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="平台补贴" prop="platformDiscount">
            <el-input v-model="queryParams.platformDiscount" placeholder="请输入平台补贴" clearable
                      size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="部件类型" prop="itemType">
            <el-select v-model="queryParams.itemType"
                       placeholder="材料管理部件类型" clearable size="small">
              <el-option
                v-for="dict in itemTypeOptions"
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
              v-permisaction="['admin:appItem:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:appItem:edit']"
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
              v-permisaction="['admin:appItem:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="appItemList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="平台名称" align="center" prop="itemName"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="简略标" align="center" prop="itemSimple"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="平台补贴状态" align="center" prop="isPlatState"
                           :formatter="isPlatStateFormat" width="100">
            <template slot-scope="scope">
              {{ isPlatStateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="平台补贴" align="center" prop="platformDiscount"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="项目返利状态" align="center" prop="isRebateState"
                           :formatter="isRebateStateFormat" width="100">
            <template slot-scope="scope">
              {{ isRebateStateFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="项目返利" align="center" prop="itemRebate"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="部件类型" align="center" prop="itemType"
                           :formatter="itemTypeFormat" width="100">
            <template slot-scope="scope">
              {{ itemTypeFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="项目城市" align="center" prop="itemCity"
                           :show-overflow-tooltip="true" width="100"/>
          <el-table-column label="备注" align="center" prop="remake"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right"  width="120">
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @onConfirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:appItem:edit']"
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
                  v-permisaction="['admin:appItem:remove']"
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
        <el-dialog :title="title" :visible.sync="open" width="99%">

          <el-row>
            <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="80px">
              <el-col :span="6">
                <el-form-item label="平台名称" prop="itemName">
                  <el-input v-model="form.itemName" placeholder="平台名称"
                  />
                </el-form-item>
                <el-form-item label="简略标" prop="itemSimple">
                  <el-input v-model="form.itemSimple" placeholder="简略标"
                  />
                </el-form-item>
                <el-form-item label="项目城市" prop="itemCity">
                  <el-input v-model="form.itemCity" placeholder="项目城市"
                  />
                </el-form-item>
                <el-form-item label="部件类型" prop="itemType">
                  <el-select v-model="form.itemType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="dict in itemTypeOptions"
                      :key="parseInt(dict.value)"
                      :label="dict.label"
                      :value="parseInt(dict.value)"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="平台补贴" prop="platformDiscount">
                  <el-input v-model="form.platformDiscount" placeholder="平台补贴"
                  />
                </el-form-item>
                <el-form-item label="补贴状态" prop="isPlatState">
                  <el-radio-group v-model="form.isPlatState">
                    <el-radio
                      v-for="dict in isPlatStateOptions"
                      :key="parseInt(dict.value)"
                      :label="parseInt(dict.value)"
                    >{{ dict.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="项目返利" prop="itemRebate">
                  <el-input v-model="form.itemRebate" placeholder="项目返利"
                  />
                </el-form-item>
                <el-form-item label="返利状态" prop="isRebateState">
                  <el-radio-group v-model="form.isRebateState">
                    <el-radio
                      v-for="dict in isRebateStateOptions"
                      :key="parseInt(dict.value)"
                      :label="parseInt(dict.value)"
                    >{{ dict.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remake">
                  <el-input type="textarea" v-model="form.remake" placeholder="备注" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="项目状态" prop="isRebateState">
                  <el-radio-group v-model="form.state">
                    <el-radio
                      v-for="dict in isRebateStateOptions"
                      :key="parseInt(dict.value)"
                      :label="parseInt(dict.value)"
                    >{{ dict.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-col :span="12" v-for="(col, i) in [0,1,2,3]">
                  <el-col :span="6">
                    <el-form-item>
                      <el-input v-model="item_material['name'+i]" placeholder="材质名"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <div v-for="(item, j)  in [0,1,2,3,4,5]">
                      <el-input v-model="item_material['format_name'+i+j]" placeholder="规格"/>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div v-for="(item, j)  in [0,1,2,3,4,5]">
                      <el-input v-model="item_material['price'+i+j]" placeholder="价格"/>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div v-for="(item, j)  in [0,1,2,3,4,5]">
                      <el-upload
                        class="avatar-uploader"
                        :data="{type:'1',f_name:'format_url'+i+j}"
                        name="file"
                        :headers="{Authorization:authorization}"
                        :action="url"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="item_material['format_url'+i+j]!==''" :src="item_material['format_url'+i+j]"
                             class="avatar" alt="">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                  </el-col>
                </el-col>
              </el-col>
            </el-form>
          </el-row>
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
import {addAppItem, delAppItem, getAppItem, listAppItem, updateAppItem} from '@/api/admin/app-item'
import {getToken} from '@/utils/auth'
import {item_material} from '@/dict/dict'

export default {
  name: 'AppItem',
  components: {},
  data() {
    return {
      url: process.env.VUE_APP_BASE_API + "/api/v1/public/uploadFile",
      authorization: "",
      // 遮罩层
      loading: true,
      mids: [],
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
      imageUrl: "",
      material_price: {
        format_name: "",
        price: "",
        format_url: "",
      },
      material: {
        material_name: "",
      },
      item_material: {},
      // 类型数据字典
      typeOptions: [],
      appItemList: [],
      isPlatStateOptions: [], isRebateStateOptions: [], itemTypeOptions: [], itemCityOptions: [],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        itemName: undefined,
        itemSimple: undefined,
        isPlatState: undefined,
        platformDiscount: undefined,
        isRebateState: undefined,
        itemRebate: undefined,
        itemType: undefined,
        itemCity: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        itemName: [{required: true, message: '平台名称不能为空', trigger: 'blur'}],
        itemSimple: [{required: true, message: '简略标不能为空', trigger: 'blur'}],
        platformDiscount: [{required: true, message: '平台补贴不能为空', trigger: 'blur'}],
        itemType: [{required: true, message: '部件类型不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.item_material = JSON.parse(JSON.stringify(item_material))
    this.authorization = 'Bearer ' + getToken()
    this.getList()
    this.getDicts('sys_common_status').then(response => {
      this.isPlatStateOptions = response.data
    })
    this.getDicts('sys_common_status').then(response => {
      this.isRebateStateOptions = response.data
    })
    this.getDicts('item_type').then(response => {
      this.itemTypeOptions = response.data
    })
    this.getDicts('item_type').then(response => {
      this.itemCityOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listAppItem(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.appItemList = response.data.list
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
      this.item_material = JSON.parse(JSON.stringify(item_material))
      this.form = {
        id: undefined,
        itemName: undefined,
        itemSimple: undefined,
        isPlatState: undefined,
        platformDiscount: undefined,
        isRebateState: undefined,
        itemRebate: undefined,
        state: undefined,
        itemType: undefined,
        itemCity: undefined,
        remake: undefined,
        item_material: [],
      }
      this.resetForm('form')
    },
    getImgList: function () {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function () {
      this.fileOpen = false
    },
    isPlatStateFormat(row) {
      return this.selectDictLabel(this.isPlatStateOptions, row.isPlatState)
    },
    isRebateStateFormat(row) {
      return this.selectDictLabel(this.isRebateStateOptions, row.isRebateState)
    },
    itemTypeFormat(row) {
      return this.selectDictLabel(this.itemTypeOptions, row.itemType)
    },
    itemCityFormat(row) {
      return this.selectDictLabel(this.itemCityOptions, row.itemCity)
    },
    itemMaterialList(row) {
      var formItem_material = []
      for (let i = 0; i < 4; i++) {
        var item = {
          id:0,
          material_name: "",
          item_material_price: []
        }
        if(row["name" + i]!==""){
          item.id = row["id" + i]
          item.material_name = row["name" + i]
          for (let k = 0; k < 6; k++) {
            if (row["format_name" + i + k]!==""){
              item.item_material_price.push({
                id:row["id" + i + k],
                format_name: row["format_name" + i + k],
                price: row["price" + i + k],
                format_url: row["format_url" + i + k],
              })
            }
          }
          formItem_material.push(item)
        }
      }
      return formItem_material
    },
    setItemMaterialList(row) {
      this.item_material = JSON.parse(JSON.stringify(item_material))
      if (row !== null){
        for (let i = 0; i < row.length; i++) {
          this.item_material["id" + i] = row[i].id
          this.item_material["name" + i] = row[i].material_name
          for (let j = 0; j < row[i].item_material_price.length; j++) {
            this.item_material["id" + i + j] = row[i].item_material_price[j].id
            this.item_material["format_name" + i + j] = row[i].item_material_price[j].format_name
            this.item_material["price" + i + j] = row[i].item_material_price[j].price
            this.item_material["format_url" + i + j] = row[i].item_material_price[j].format_url
          }
        }
      }

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
      this.title = '添加材料管理'
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
      getAppItem(id).then(response => {
        this.form = response.data
        console.log(this.form.item_material)
        this.setItemMaterialList(this.form.item_material)
        this.open = true
        this.title = '修改材料管理'
        this.isEdit = true
      })

    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.item_material = this.itemMaterialList(this.item_material)
          console.log(this.form.id)
          if (this.form.id !== undefined) {
            updateAppItem(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAppItem(this.form).then(response => {
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
        return delAppItem({'ids': Ids})
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
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.item_material[res.data.f_name] = process.env.VUE_APP_BASE_API + "/" + res.data.full_path
        console.log(this.item_material[res.data.f_name])
        console.log(this.item_material)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}

.avatar {
  width: 32px;
  height: 32px;
  display: block;
}
</style>
