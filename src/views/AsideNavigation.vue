<template>
  <el-container>
    <el-aside width="170px">
      <el-menu
          router
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item v-for="(item, i) in List" :key="i" :index="item.path">
          <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
export default {
  name: "AsideNavigation",
  data() {
    return {
      List: [
        {icon: 'box', path: '/item/list', name: '商品管理'},
        {icon: 'document', path: '/item/list', name: '订单管理'},
      ]
    }
  }
}
</script>

<style scoped>

</style>