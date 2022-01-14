
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
                    <el-form-item label="订单Id" prop="orderNo"><el-input v-model="queryParams.orderNo" placeholder="请输入订单Id" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="平台承担" prop="platformBear"><el-input v-model="queryParams.platformBear" placeholder="请输入平台承担" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="合作公司单号" prop="cooperativeNo"><el-input v-model="queryParams.cooperativeNo" placeholder="请输入合作公司单号" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="退款流水单号" prop="refundSerialNo"><el-input v-model="queryParams.refundSerialNo" placeholder="请输入退款流水单号" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="完成时间" prop="completeTime"><el-input v-model="queryParams.completeTime" placeholder="请输入完成时间" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="退款时间" prop="refundTime"><el-input v-model="queryParams.refundTime" placeholder="请输入退款时间" clearable
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
                                v-permisaction="['admin:appRefundOrder:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:appRefundOrder:edit']"
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
                                v-permisaction="['admin:appRefundOrder:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="appRefundOrderList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="订单Id" align="center" prop="orderNo" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="平台承担" align="center" prop="platformBear" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="第三方承担" align="center" prop="otherBear" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="含退款结算金" align="center" prop="refundBalance" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="不含退款结算金" align="center" prop="onRefundBalance" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="合作公司单号" align="center" prop="cooperativeNo" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="退款流水单号" align="center" prop="refundSerialNo" width="120"
                                                 :show-overflow-tooltip="true"/><el-table-column label="完成时间" align="center" prop="completeTime"
                                                 :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span>{{ parseTime(scope.row.completeTime) }}</span>
                                    </template>
                                </el-table-column><el-table-column label="退款时间" align="center" prop="refundTime"
                                                 :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span>{{ parseTime(scope.row.refundTime) }}</span>
                                    </template>
                                </el-table-column>
                    <el-table-column label="操作" align="center"  fixed="right" class-name="small-padding fixed-width" width="120">
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
                <el-dialog :title="title" :visible.sync="open" width="600px">
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">

                                    <el-form-item label="订单Id" prop="orderNo">
                                        <el-input v-model="form.orderNo" placeholder="订单Id"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="平台承担" prop="platformBear">
                                        <el-input v-model="form.platformBear" placeholder="平台承担"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="第三方承担" prop="otherBear">
                                        <el-input v-model="form.otherBear" placeholder="第三方承担"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="含退款结算金" prop="refundBalance">
                                        <el-input v-model="form.refundBalance" placeholder="含退款结算金"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="不含退款结算金" prop="onRefundBalance">
                                        <el-input v-model="form.onRefundBalance" placeholder="不含退款结算金"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="合作公司单号" prop="cooperativeNo">
                                        <el-input v-model="form.cooperativeNo" placeholder="合作公司单号"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="退款流水单号" prop="refundSerialNo">
                                        <el-input v-model="form.refundSerialNo" placeholder="退款流水单号"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="完成时间" prop="completeTime">
                                        <el-date-picker
                                                    v-model="form.completeTime"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="退款时间" prop="refundTime">
                                        <el-date-picker
                                                    v-model="form.refundTime"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
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
    import {addAppRefundOrder, delAppRefundOrder, getAppRefundOrder, listAppRefundOrder, updateAppRefundOrder} from '@/api/admin/app-refund-order'

    export default {
        name: 'AppRefundOrder',
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
                appRefundOrderList: [],

                // 关系表类型

                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    orderNo:undefined,
                    platformBear:undefined,
                    cooperativeNo:undefined,
                    refundSerialNo:undefined,
                    completeTime:undefined,
                    refundTime:undefined,

                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {orderNo:  [ {required: true, message: '订单Id不能为空', trigger: 'blur'} ],
                platformBear:  [ {required: true, message: '平台承担不能为空', trigger: 'blur'} ],
                cooperativeNo:  [ {required: true, message: '合作公司单号不能为空', trigger: 'blur'} ],
                refundSerialNo:  [ {required: true, message: '退款流水单号不能为空', trigger: 'blur'} ],
                completeTime:  [ {required: true, message: '完成时间不能为空', trigger: 'blur'} ],
                refundTime:  [ {required: true, message: '退款时间不能为空', trigger: 'blur'} ],
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
                listAppRefundOrder(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.appRefundOrderList = response.data.list
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
                orderNo: undefined,
                platformBear: undefined,
                otherBear: undefined,
                refundBalance: undefined,
                onRefundBalance: undefined,
                cooperativeNo: undefined,
                refundSerialNo: undefined,
                completeTime: undefined,
                refundTime: undefined,
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
                this.title = '添加结算退款订单'
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
                getAppRefundOrder(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改结算退款订单'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateAppRefundOrder(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addAppRefundOrder(this.form).then(response => {
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
                      return delAppRefundOrder( { 'ids': Ids })
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
