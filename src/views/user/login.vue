<template>
  <div class="login">
    <el-form :model="loginForm" ref="loginForm" :rules="rules" label-width="100px" class="demo-dynamic">
        <el-form-item prop="account" label="账号" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
            <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
export default {
  name: "login",
  data: function() {
    var verificationPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "admin",
        password: "11111"
      },
      rules: {
        password: [{ validator: verificationPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .get(baseConfig.server + "/api/login/Login", {
              params: this.loginForm
            })
            .then(res => {
              baseConfig.currentUser = res.d;
              this.$router.push({ name: "home" });
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
