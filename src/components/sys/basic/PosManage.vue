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
        title="新增职位"
        :visible.sync="addDialogVisible"
        @close="cancel('addPositionForm')"
      >
        <el-form
          ref="addPositionForm"
          :model="addPosition"
          :rules="positionRules"
          label-position="top"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="职位代码" prop="code">
                <el-input
                  v-model="addPosition.code"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位名称" prop="name">
                <el-input
                  v-model="addPosition.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否启用" prop="enabled">
                <el-switch v-model="addPosition.enabled"> </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('addPositionForm')">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="position-table">
      <el-table
        :data="positions"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="55" :selectable="isSelectable">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="code" label="职位代码" width="180">
        </el-table-column>
        <el-table-column prop="name" label="职位名称" width="180">
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
        class="position-pagination"
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
          ref="editPositionForm"
          label-position="top"
          :model="editPosition"
          :rules="positionRules"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="ID" prop="id">
                <el-input
                  v-model="editPosition.id"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位代码" prop="code">
                <el-input
                  v-model="editPosition.code"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位名称" prop="name">
                <el-input
                  v-model="editPosition.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否启用" prop="enabled">
                <el-switch v-model="editPosition.enabled"> </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('editPositionForm')">取消</el-button>
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
import { position } from "../../../api/path";
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
      addPosition: {
        code: "",
        name: "",
        enabled: true,
      },
      editPosition: {
        id: "",
        code: "",
        name: "",
        enabled: false,
      },
      positionRules: {
        code: [
          { required: true, message: "请输入职位代码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          { min: 0, max: 30, message: "最大长度为 30 个字符", trigger: "blur" },
        ],
      },
      positions: [],
      multipleSelection: [],
      pagaIndex: 1,
      pageSize: 10,
      count: 0,
      loadingInstance: {},
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
  mounted() {
    this.initData();
  },
  watch: {
    activeTab(newVal, oldVal) {
      if (newVal !== oldVal && newVal === "posManage") {
        this.initData();
      }
    },
  },
  methods: {
    isSelectable(row) {
      return row.deletable;
    },
    initData() {
      if (this.activeTab == "posManage") {
        this.loadingInstance = this.$loading();
        this.$axios({
          url: position.page,
          params: {
            pagaIndex: this.pagaIndex,
            pageSize: this.pageSize,
          },
        }).then((res) => {
          this.loadingInstance.close();
          this.count = res.obj.count;
          this.positions = res.obj.list;
        });
      }
    },
    cancel(formName) {
      switch (formName) {
        case "addPositionForm":
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          break;
        case "editPositionForm":
          this.$refs[formName].resetFields();
          this.editDialogVisible = false;
          break;
        default:
          break;
      }
    },
    confirmAdd() {
      this.$refs["addPositionForm"].validate((valid) => {
        if (valid) {
          this.loadingInstance = this.$loading();
          this.$axios({
            url: position.add,
            method: "post",
            data: this.addPosition,
          }).then((res) => {
            this.$refs["addPositionForm"].resetFields();
            this.addDialogVisible = false;
            this.initData();
          });
        } else {
          this.$message.error("请按要求输入所有必填字段");
          return false;
        }
      });
    },
    confirmEdit() {
      this.$refs["editPositionForm"].validate((valid) => {
        if (valid) {
          this.loadingInstance = this.$loading();
          this.$axios({
            url: position.edit,
            method: "post",
            data: this.editPosition,
          }).then((res) => {
            this.$refs["editPositionForm"].resetFields();
            this.editDialogVisible = false;
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
          this.$axios({
            url: position.del,
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
    handleEdit(index, data) {
      Object.assign(this.editPosition, data);
      this.editDialogVisible = true;
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
          this.$axios({
            url: position.del,
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
.position-pagination {
  margin-top: 6px;
  display: flex;
  justify-content: center;
}
</style>

<style>
</style>