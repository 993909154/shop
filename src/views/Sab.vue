<template>
  <el-card>
    <el-input v-model="form.username"></el-input>
    <el-input v-model="form.passsword"></el-input>
    <el-button @click="login">登录</el-button>
  </el-card>
</template>

<script>
import testService from "../global/service/testService";

export default {
  name: "Sab",
  created() {
  },
  data() {
    return {
      form: {
        username: 'admin',
        passsword: '123456',
      }
    }
  },
  methods: {
    login() {
      testService.login(this.form).then((res) => {
        this.$message.success('登录成功')
        localStorage.setItem("token", res.token)
        console.log(res.token)
      })
    }
  }
}
</script>

<style scoped>

</style>