<template>
  <el-container class="main-container">
    <el-header class="main-header-wrapper">
      <main-header></main-header>
    </el-header>
    <el-container>
      <el-aside width="280px" class="main-menu">
        <aside-main-menu></aside-main-menu>
      </el-aside>
      <el-main class="main-content">
        <main-bread-crumb
          v-if="$router.currentRoute.path != '/home'"
          :current-route="$router.currentRoute.name"
        ></main-bread-crumb>
        <home-content v-else></home-content>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
a
<script>
import AsideMainMenu from "../components/AsideMainMenu.vue";
import MainHeader from "../components/MainHeader.vue";
import MainBreadCrumb from "../components/MainBreadCrumb.vue";
import HomeContent from "../components/HomeContent.vue";
export default {
  components: { AsideMainMenu, MainHeader, MainBreadCrumb, HomeContent },
  data() {
    return {
      userInfo: {
        username: "",
        portrait: "",
      },
    };
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
  },
  mounted() {
    setTimeout(() => {
      let user = JSON.parse(window.sessionStorage.getItem("userInfo"));
      this.userInfo.username = user.username;
      this.userInfo.portrait = user.portrait;
    }, 600);
  },
};
</script>

<style lang="scss" scoped>
.main-menu {
  min-height: calc(100vh - 70px);
  background-color: #fff;
}

.main-content {
  background-color: #fff;
  margin: 0 10px;
  min-height: calc(100vh - 70px);
}

.main-header-wrapper {
  display: flex;
  margin-bottom: 10px;
  background-color: $button;
  align-items: center;
}
</style>

<style>
</style>