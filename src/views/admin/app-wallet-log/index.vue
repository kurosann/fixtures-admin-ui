
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="账单号" prop="payNo"
            ><el-input
              v-model="queryParams.payNo"
              placeholder="请输入平台支付账单号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="钱包Id" prop="walletId"
            ><el-input
              v-model="queryParams.walletId"
              placeholder="请输入钱包Id"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="流水号" prop="serialNo"
            ><el-input
              v-model="queryParams.serialNo"
              placeholder="请输入支付流水号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="完成时间" prop="completeTime"
            ><el-input
              v-model="queryParams.completeTime"
              placeholder="请输入完成时间"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="appWalletLogList">
          <el-table-column
            label="平台支付账单号"
            align="center"
            prop="payNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="交易类型"
            align="center"
            prop="txType"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="金额"
            align="center"
            prop="amount"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="支付方式"
            align="center"
            prop="wayName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="支付流水号"
            align="center"
            prop="serialNo"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="完成时间"
            align="center"
            prop="completeTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.completeTime) }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
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
  addAppWalletLog,
  delAppWalletLog,
  getAppWalletLog,
  listAppWalletLog,
  updateAppWalletLog,
} from "@/api/admin/app-wallet-log";

export default {
  name: "AppWalletLog",
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
      title: "",
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      appWalletLogList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        payNo: undefined,
        walletId: undefined,
        serialNo: undefined,
        completeTime: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        payNo: [
          {
            required: true,
            message: "平台支付账单号不能为空",
            trigger: "blur",
          },
        ],
        walletId: [
          { required: true, message: "钱包Id不能为空", trigger: "blur" },
        ],
        serialNo: [
          { required: true, message: "支付流水号不能为空", trigger: "blur" },
        ],
        completeTime: [
          { required: true, message: "完成时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true;
      listAppWalletLog(
        this.addDateRange(this.queryParams, this.dateRange)
      ).then((response) => {
        this.appWalletLogList = response.data.list;
        this.total = response.data.count;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
      };
      this.resetForm("form");
    },
    getImgList: function () {
      this.form[this.fileIndex] =
        this.$refs["fileChoose"].resultList[0].fullUrl;
    },
    fileClose: function () {
      this.fileOpen = false;
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加钱包管理";
      this.isEdit = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getAppWalletLog(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改钱包管理";
        this.isEdit = true;
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAppWalletLog(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg);
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addAppWalletLog(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg);
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids;

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delAppWalletLog({ ids: Ids });
        })
        .then((response) => {
          if (response.code === 200) {
            this.msgSuccess(response.msg);
            this.open = false;
            this.getList();
          } else {
            this.msgError(response.msg);
          }
        })
        .catch(function () {});
    },
  },
};
</script>
