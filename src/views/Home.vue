<template>
  <el-container>
    <el-header style="padding: 0px">
      <el-menu
          :default-active='$route.path'
          router
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-col :span="3">
          <img class="header-logo" src="@/assets/logo.png">
        </el-col>
        <el-menu-item v-for="(item, i) in List" :key="i" :index="item.path">
          <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="padding: 3px 0px 0px 0px">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      List: [
        {icon: 'user', path: '/cart', name: '收银台'},
        {icon: 'tickets', path: '/aside', name: '工作台'},
        {icon: 'pie-chart',path: '/111', name: '订单详情'}
      ]
    }
  }
}
</script>
<style>
.header-logo {
  margin: 10px 10px 2px 5px;
  height: 42px;
}


</style>
