<template>
  <div>
    <div class="middle-action-area">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="medium"
        v-show="!readOnly"
        @click="addDialogVisible = true"
        >新增</el-button
      >
      <el-dialog
        title="新增职称"
        :visible.sync="addDialogVisible"
        @close="cancel('addJobLevelForm')"
      >
        <el-form
          ref="addJobLevelForm"
          :model="addJobLevel"
          :rules="JobLevelRules"
          label-position="top"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="职称代码" prop="code">
                <el-select
                  v-model="addJobLevel.code"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in jobLevelCodes"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位名称" prop="name">
                <el-input
                  v-model="addJobLevel.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否启用" prop="enabled">
                <el-switch v-model="addJobLevel.enabled"> </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('addJobLevelForm')">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="job-level-table">
      <el-table
        :data="jobLevels"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="55" :selectable="isSelectable">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="code" label="职称代码" width="180">
        </el-table-column>
        <el-table-column prop="name" label="职称名称" width="180">
        </el-table-column>
        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="modifyBy" label="修改人" width="180">
        </el-table-column>
        <el-table-column prop="modifyDate" label="修改时间" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              v-show="!readOnly"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="!scope.row.deletable"
              v-show="!readOnly"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="job-level-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagaIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="prev, pager, next, sizes, total"
        :total="count"
      >
      </el-pagination>
      <el-dialog
        title="编辑职位"
        :visible.sync="editDialogVisible"
        @close="cancel('editPositionForm')"
      >
        <el-form
          ref="editJobLevelForm"
          label-position="top"
          :model="editJobLevel"
          :rules="JobLevelRules"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="ID" prop="id">
                <el-input
                  v-model="editJobLevel.id"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职称代码" prop="code">
                <el-select
                  v-model="editJobLevel.code"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in jobLevelCodes"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职称名称" prop="name">
                <el-input
                  v-model="editJobLevel.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否启用" prop="enabled">
                <el-switch v-model="editJobLevel.enabled"> </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('editJobLevelForm')">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="footer-action-area">
      <el-button
        size="medium"
        type="danger"
        :disabled="canDelRange"
        v-show="!readOnly"
        @click="delRange"
        >批量删除</el-button
      >
    </div>
  </div>
</template>

<script>
import { value, jobLevel } from "../../../http/path";
import { findRoute } from "../../../utils/route";
export default {
  props: {
    activeTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      loadingInstance: {},
      jobLevelCodes: [],
      multipleSelection: [],
      addJobLevel: {
        code: "",
        name: "",
        enabled: true,
      },
      editJobLevel: {
        id: "",
        code: "",
        name: "",
        enabled: true,
      },
      JobLevelRules: {
        code: [{ required: true, message: "请选择职称代码", trigger: "blur" }],
        name: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          { min: 0, max: 30, message: "最大长度为 30 个字符", trigger: "blur" },
        ],
      },
      jobLevels: [],
      pagaIndex: 1,
      pageSize: 10,
      count: 0,
    };
  },
  computed: {
    canDelRange() {
      return this.multipleSelection.length == 0;
    },
    readOnly() {
      const route = findRoute(this.$store.state.routes, (node) => {
        return node.path === this.$route.path;
      });
      return route.readOnly;
    },
  },
  watch: {
    activeTab(newVal, oldVal) {
      if (newVal !== oldVal && newVal === "jobLevelManage") {
        this.initData();
      }
    },
    addDialogVisible(newVal, oldVal) {
      if (newVal) {
        this.$http({
          url: value.listJobLevelCode,
        }).then((res) => {
          this.jobLevelCodes = res.obj.jobLevelCodes;
        });
      }
    },
    editDialogVisible(newVal, oldVal) {
      if (newVal) {
        this.$http({
          url: value.listJobLevelCode,
        }).then((res) => {
          this.jobLevelCodes = res.obj.jobLevelCodes;
        });
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.activeTab == "jobLevelManage") {
        this.loadingInstance = this.$loading();
        this.$http({
          url: jobLevel.page,
          params: {
            pagaIndex: this.pagaIndex,
            pageSize: this.pageSize,
          },
        }).then((res) => {
          this.loadingInstance.close();
          this.count = res.obj.count;
          this.jobLevels = res.obj.list;
        });
      }
    },
    cancel(formName) {
      switch (formName) {
        case "addJobLevelForm":
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          break;
        case "editJobLevelForm":
          this.$refs[formName].resetFields();
          this.editDialogVisible = false;
          break;
        default:
          break;
      }
    },
    confirmAdd() {
      this.$refs["addJobLevelForm"].validate((valid) => {
        if (valid) {
          this.loadingInstance = this.$loading();
          this.$http({
            url: jobLevel.add,
            method: "post",
            data: this.addJobLevel,
          }).then((res) => {
            this.$refs["addJobLevelForm"].resetFields();
            this.addDialogVisible = false;
            this.initData();
          });
        } else {
          this.$message.error("请按要求输入所有必填字段");
          return false;
        }
      });
    },
    handleDelete(index, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadingInstance = this.$loading();
          this.$http({
            url: jobLevel.del,
            params: {
              id: data.id,
            },
          }).then((res) => {
            if (res.code == 200) {
              this.initData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delRange() {
      this.$confirm(
        `此操作将永久删除${this.multipleSelection.length}条数据, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loadingInstance = this.$loading();
          let ids = "";
          this.multipleSelection.forEach((item) => {
            ids = ids + item.id + ",";
          });
          this.$http({
            url: jobLevel.del,
            params: {
              id: ids,
            },
          }).then((res) => {
            if (res.code == 200) {
              this.initData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(index, data) {
      Object.assign(this.editJobLevel, data);
      this.editDialogVisible = true;
    },
    confirmEdit() {
      this.$refs["editJobLevelForm"].validate((valid) => {
        if (valid) {
          this.loadingInstance = this.$loading();
          this.$http({
            url: jobLevel.edit,
            method: "post",
            data: this.editJobLevel,
          }).then((res) => {
            this.$refs["editJobLevelForm"].resetFields();
            this.editDialogVisible = false;
            this.initData();
          });
        } else {
          this.$message.error("请按要求输入所有必填字段");
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    isSelectable(row) {
      return row.deletable;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pagaIndex = val;
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.job-level-pagination {
  margin-top: 6px;
  display: flex;
  justify-content: center;
}
</style>

<style>
</style>