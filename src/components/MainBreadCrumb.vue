<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="main-bread-crumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ currentRoute }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    currentRoute: {
      type: String,
      requried: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.main-bread-crumb{
  margin-bottom: 18px;
}
</style>

<style>
</style>