<template>
  <el-menu router unique-opened>
    <el-submenu
      :index="index + ''"
      :key="index"
      v-for="(item, index) in routes"
      v-show="!item.hidden"
    >
      <template slot="title">
        <i :class="item.iconCls + ' fa-fw'"></i>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item
        :key="indexj"
        :index="children.path"
        v-for="(children, indexj) in item.children"
      >
        <i :class="children.iconCls + ' fa-fw'"></i>
        <span>{{ children.name }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$store.state.routes;
    },
  },
};
</script>

<style lang="scss" scoped>
.fa {
  font-size: 16px;
  margin-right: 5px;
}
</style>