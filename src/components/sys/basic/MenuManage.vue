<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <el-card class="box-card">
          <div slot="header" class="tool-bar">
            <span class="operate-icon-button" @click="refreshWholeTree"
              ><i class="fa fa-refresh"></i
            ></span>
            <span class="operate-icon-button" @click="foldTree"
              ><i class="fa fa-folder-o"></i
            ></span>
            <span class="operate-icon-button" @click="unfoldTree"
              ><i class="fa fa-folder-open-o"></i
            ></span>
          </div>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-aside>
      <el-main class="menu-content">
        <el-form
          ref="menu"
          :model="menu"
          :rules="rules"
          label-width="100px"
          class="menu-form"
        >
          <el-form-item label="ID">
            <el-input v-model="menu.menuId" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="menu.name"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="url">
            <el-input v-model="menu.url"></el-input>
          </el-form-item>
          <el-form-item label="前端路由" prop="path">
            <el-input v-model="menu.path"></el-input>
          </el-form-item>
          <el-form-item label="组件路径" prop="src">
            <el-input v-model="menu.src"></el-input>
          </el-form-item>
          <el-form-item label="组件名称" prop="component">
            <el-input v-model="menu.component"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="iconCls">
            <el-input v-model="menu.iconCls"></el-input>
          </el-form-item>
          <el-form-item label="保持激活" prop="keepAlive">
            <el-switch v-model="menu.keepAlive"></el-switch>
          </el-form-item>
          <el-form-item label="需要授权" prop="requireAuth">
            <el-switch v-model="menu.requireAuth"></el-switch>
          </el-form-item>
          <el-form-item label="启用" prop="enabled">
            <el-switch v-model="menu.enabled"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { menu } from "../../../http/path";

export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      menu: {
        menuId: 0,
        name: "",
        url: "",
        path: "",
        src: "",
        component: "",
        iconCls: "",
        keepAlive: false,
        requireAuth: true,
        parentId: 1,
        enabled: true,
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 300, message: "长度不允许超过 300 字符", trigger: "blur" },
        ],
        url: [
          { max: 300, message: "长度不允许超过 300 字符", trigger: "blur" },
        ],
        path: [
          { required: true, message: "请输入前端路由", trigger: "blur" },
          { max: 300, message: "长度不允许超过 300 字符", trigger: "blur" },
        ],
        src: [
          { required: true, message: "请输入组件路径", trigger: "blur" },
          { max: 300, message: "长度不允许超过 300 字符", trigger: "blur" },
        ],
        component: [
          { required: true, message: "请输入组件名称", trigger: "blur" },
          { max: 300, message: "长度不允许超过 300 字符", trigger: "blur" },
        ],
        iconCls: [
          { required: true, message: "请输入图标", trigger: "blur" },
          { max: 300, message: "长度不允许超过 300 字符", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.$http({
      ...menu.listMenu,
    }).then((res) => {
      this.treeData = res.obj.menuTree;
    });
  },

  methods: {
    // 刷新全树
    refreshWholeTree() {
      console.log("refresh whole tree");
    },
    // 折叠树节点
    foldTree() {
      console.log("fold tree");
    },
    // 展开树节点
    unfoldTree() {
      console.log("unfold tree");
    },
    // 树节点点击事件
    handleNodeClick(node) {
      this.menu = { ...node };
    },
    handleSave() {
      console.log(this.menu);
    },
  },
};
</script>

<style lang="scss" scoped>
.tool-bar {
  text-align: right;
}

.operate-icon-button {
  margin: 0 6px;
  cursor: pointer;
}

.menu-content {
  margin-left: 20px;

  .menu-form {
    width: 600px;
  }
}
</style>

<style>
</style>