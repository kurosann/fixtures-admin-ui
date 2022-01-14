
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="用户Id" prop="userId"><el-input v-model="queryParams.userId" placeholder="请输入用户Id" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="订单Id/工程单Id" prop="orderNo"><el-input v-model="queryParams.orderNo" placeholder="请输入订单Id/工程单Id" clearable
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
                                v-permisaction="['admin:appWorkCashBack:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:appWorkCashBack:edit']"
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
                                v-permisaction="['admin:appWorkCashBack:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="appWorkCashBackList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="用户Id" align="center" prop="userId"
                                                 :show-overflow-tooltip="true"/><el-table-column label="订单Id/工程单Id" align="center" prop="orderNo"
                                                 :show-overflow-tooltip="true"/><el-table-column label="返现金额" align="center" prop="money"
                                                 :show-overflow-tooltip="true"/><el-table-column label="原因" align="center" prop="reason"
                                                 :show-overflow-tooltip="true"/><el-table-column label="返利状态" align="center" prop="state"
                                                 :show-overflow-tooltip="true"/><el-table-column label="支付凭据" align="center" prop="plainUrl"
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
                             v-permisaction="['admin:appWorkCashBack:edit']"
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
                              v-permisaction="['admin:appWorkCashBack:remove']"
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
                <el-dialog :title="title" :visible.sync="open" width="700px">
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">

                                    <el-form-item label="用户Id" prop="userId">
                                        <el-input v-model="form.userId" placeholder="用户Id"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="订单Id" prop="orderNo">
                                        <el-input v-model="form.orderNo" placeholder="订单Id/工程单Id"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="返现金额" prop="money">
                                        <el-input v-model="form.money" placeholder="返现金额"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="原因" prop="reason">
                                        <el-input v-model="form.reason" placeholder="原因"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="返利状态" prop="state">
                                        <el-input v-model="form.state" placeholder="返利状态"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="支付凭据" prop="plainUrl">
                                        <el-input v-model="form.plainUrl" placeholder="支付凭据"
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
    import {addAppWorkCashBack, delAppWorkCashBack, getAppWorkCashBack, listAppWorkCashBack, updateAppWorkCashBack} from '@/api/admin/app-work-cash-back'

    export default {
        name: 'AppWorkCashBack',
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
                appWorkCashBackList: [],

                // 关系表类型

                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    userId:undefined,
                    orderNo:undefined,

                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {userId:  [ {required: true, message: '用户Id不能为空', trigger: 'blur'} ],
                orderNo:  [ {required: true, message: '订单Id/工程单Id不能为空', trigger: 'blur'} ],
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
                listAppWorkCashBack(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.appWorkCashBackList = response.data.list
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
                userId: undefined,
                orderNo: undefined,
                money: undefined,
                reason: undefined,
                state: undefined,
                plainUrl: undefined,
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
                this.title = '添加工程返利'
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
                getAppWorkCashBack(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改工程返利'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateAppWorkCashBack(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addAppWorkCashBack(this.form).then(response => {
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
                      return delAppWorkCashBack( { 'ids': Ids })
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
