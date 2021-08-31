<template>
  <div class="main-header">
    <div class="main-header-title">E-OA</div>
    <el-dropdown @command="dropDownCommand">
      <div class="head-user-portrait">
        <span class="head-username">{{ userInfo.username }}</span>
        <img :src="userInfo.portrait" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
        <el-dropdown-item command="setting">设置</el-dropdown-item>
        <el-dropdown-item command="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { user } from "../http/path";

export default {
  data() {
    return {
      userInfo: {
        username: "",
        portrait: "",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      let user = JSON.parse(window.sessionStorage.getItem("userInfo"));
      this.userInfo.username = user.username;
      this.userInfo.portrait = user.portrait;
    }, 600);
  },
  methods: {
    dropDownCommand(command) {
      switch (command) {
        case "userInfo":
          break;
        case "setting":
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      this.$confirm("此操作将登出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: user.logout,
            method: "post",
          });
          window.sessionStorage.removeItem("userInfo");
          window.sessionStorage.removeItem("authToken");
          this.$store.commit("initRoutes", []);
          this.$router.replace({
            path: "/",
            name: "Login",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;

  .main-header-title {
    font-size: 30px;
    font-family: 华文楷体;
    color: $button-text;
  }

  .head-user-portrait {
    display: flex;
    font-size: 18px;
    align-items: center;

    .head-username {
      margin-right: 10px;
      color: $button-text;
    }

    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>