<template>
  <el-container>
    <el-aside width="170px">
      <el-menu
          router
          :default-active="apiActiveMenu"
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
    <el-main>
      <div style="padding: 0px 0px 5px 0px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="{path:item.path}">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "AsideNavigation",
  data() {
    return {
      List: [
        {icon: 'box', path: '/item/list', name: '商品管理'},
        {icon: 'document', path: '/order/list', name: '订单管理'},
      ],
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter((item) => {
            return item.meta.showInBreadcrumb
          }
      );
    },
    breadcrumb() {
      let mataChedArr = this.$route.matched.filter((item) => {
        return item.meta.showInBreadcrumb
      });
      return mataChedArr
    },
    apiActiveMenu() {
      const route = this.$route
      const { meta, path} = route
      if(meta.apiActiveMenu){
        return meta.apiActiveMenu
      }
      return path
    }
  }
}
</script>

<style scoped>

</style>