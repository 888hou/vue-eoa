<template>
  <div>
    <el-tabs v-model="activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane label="部门管理" name="depManage">
        <dep-manage></dep-manage>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="posManage">
        <pos-manage :active-tab="activeTab"></pos-manage>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="jobLevelManage">
        <job-level-manage :active-tab="activeTab"></job-level-manage>
      </el-tab-pane>
      <el-tab-pane label="奖惩规则" name="ecManage">
        <ec-manage></ec-manage>
      </el-tab-pane>
      <el-tab-pane label="权限菜单管理" name="menuManage">
        <menu-manage></menu-manage>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="roleManage">
        <role-manage></role-manage>
      </el-tab-pane>
      <el-tab-pane label="权限管理" name="permissManage">
        <permiss-manage></permiss-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepManage from "../../components/sys/basic/DepManage";
import PosManage from "../../components/sys/basic/PosManage";
import JobLevelManage from "../../components/sys/basic/JobLevelManage";
import EcManage from "../../components/sys/basic/EcManage";
import PermissManage from "../../components/sys/basic/PermissManage";
import MenuManage from "../../components/sys/basic/MenuManage";
import RoleManage from "../../components/sys/basic/RoleManage";

export default {
  components: {
    DepManage,
    PosManage,
    JobLevelManage,
    EcManage,
    MenuManage,
    RoleManage,
    PermissManage,
  },
  data() {
    return {
      activeTab: "menuManage",
    };
  },
  methods: {
    tabClick() {},
  },
};
</script>

<style>
.middle-action-area {
  margin-bottom: 10px;
}
.footer-action-area {
  margin-top: 10px;
}
</style>