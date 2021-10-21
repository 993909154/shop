<template>
  <div style="text-align: center; width: 500px; margin: 220px auto">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><h2>登录</h2></span>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type: show-password placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import loginService from "../global/service/loginService";

export default {
  name: "Login",
  created() {
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      loginService.login(this.form).then((res) => {
        this.$message.success('登录成功')
        localStorage.setItem("token", res.token)
        this.$router.push(
            {name: 'Home'}
        )
      })
    }
  }
}
</script>

<style scoped>

</style>