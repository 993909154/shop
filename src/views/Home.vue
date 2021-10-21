<template>
  <el-container>
    <el-header style="padding: 0px">
      <el-menu
          router
          :default-active="activeIndex2"
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
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
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
        {path: '/about', name: '收银台'}
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
