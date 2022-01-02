
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="用户id" prop="userId"><el-input v-model="queryParams.userId" placeholder="请输入用户id" clearable
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
                                v-permisaction="['admin:appMasterApply:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:appMasterApply:edit']"
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
                                v-permisaction="['admin:appMasterApply:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="appMasterApplyList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="用户id" align="center" prop="userId"
                                                 :show-overflow-tooltip="true"/><el-table-column label="身份证Id_A" align="center" prop="idCardAUrl"
                                                 :show-overflow-tooltip="true"/><el-table-column label="身份证Id_B" align="center" prop="idCardBUrl"
                                                 :show-overflow-tooltip="true"/><el-table-column label="实名者照片" align="center" prop="realImgUrl"
                                                 :show-overflow-tooltip="true"/><el-table-column label="原因" align="center" prop="reason"
                                                 :show-overflow-tooltip="true"/><el-table-column label="审核状态" align="center" prop="pass"
                                                 :formatter="passFormat" width="100">
                                    <template slot-scope="scope">
                                        {{ passFormat(scope.row) }}
                                    </template>
                                </el-table-column>
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
                             v-permisaction="['admin:appMasterApply:edit']"
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
                              v-permisaction="['admin:appMasterApply:remove']"
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
                        
                                    <el-form-item label="身份证Id_A" prop="idCardAUrl">
                                        <el-input v-model="form.idCardAUrl" placeholder="身份证Id_A"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="身份证Id_B" prop="idCardBUrl">
                                        <el-input v-model="form.idCardBUrl" placeholder="身份证Id_B"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="实名者照片" prop="realImgUrl">
                                        <el-input v-model="form.realImgUrl" placeholder="实名者照片"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="原因" prop="reason">
                                        <el-input v-model="form.reason" placeholder="原因"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="审核状态" prop="pass">
                                        <el-select v-model="form.pass"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in passOptions"
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
    import {addAppMasterApply, delAppMasterApply, getAppMasterApply, listAppMasterApply, updateAppMasterApply} from '@/api/admin/app-master-apply'
    
    export default {
        name: 'AppMasterApply',
        components: {
        },
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
                appMasterApplyList: [],
                passOptions: [],
                // 关系表类型
                
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    userId:undefined,
                    pass:undefined,
                    
                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {userId:  [ {required: true, message: '用户id不能为空', trigger: 'blur'} ],
                }
        }
        },
        created() {
            this.getList()
            this.getDicts('app_is_examine').then(response => {
                this.passOptions = response.data
            })
            },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
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
            getImgList: function() {
              this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
            },
            fileClose: function() {
              this.fileOpen = false
            },
            passFormat(row) {
                return this.selectDictLabel(this.passOptions, row.pass)
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
                      return delAppMasterApply( { 'ids': Ids })
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
