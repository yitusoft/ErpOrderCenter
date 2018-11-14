<template>
<body class="page-login layout-full page-dark" style="background-color: transparent;" >
    <div class="page vertical-align text-center">>
      <div class="page-content vertical-align-middle">
        <div class="brand">
           <img class="brand-img" src="/img/logo.png" alt="..."> 
          <h2 class="brand-text">Remark</h2>
        </div>
        <p>欢迎使用订单管理系统</p>
        <form>
          <div class="form-group form-material floating">
            <input type="text" class="form-control empty" v-on:blur="isEmpty" v-model="loginForm.account" name="账号">
            <label :style="isAccountEmpty" class="floating-label">账号</label>
          </div>
          <div class="form-group form-material floating">
            <input type="password" class="form-control empty" v-on:blur="isEmpty" v-model="loginForm.password" name="密码">
            <label :style="isPasswordEmpty" class="floating-label">密码</label>
          </div>
          <button type="button" @click="submitForm()" class="btn btn-primary btn-block">登录</button>
        </form>
        <div class="page-copyright page-copyright-inverse">
          <p style="color: #fff;">DEB WEBSITE BY Creation Studio</p>
          <p style="color: #fff;">© 2018. All RIGHT RESERVED.</p>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
import "@/css/bootstrap.less";
import "@/css/bootstrap-extend.less";
import "@/css/site.less";
import "@/css/login.less";
export default {
  name: "login",
  created: function() {
    this.isEmpty();
  },
  data: function() {
    return {
      isAccountEmpty: "",
      isPasswordEmpty: "",
      loginForm: {
        account: "admin",
        password: "11111"
      }
    };
  },
  methods: {
    submitForm: function() {
      var bl =true;
      if(!this.loginForm.account)
      {
        this.$message({message: '账号不能为空！',type: 'warning'});
        bl=false;
      }
      else if(!this.loginForm.password)
      {
        this.$message({message: '密码不能为空！',type: 'warning'});
        bl=false;
      }
      if(bl)
      {
        request.get(baseConfig.server + "/api/login/Login", {params: this.loginForm}).then(res => {
          baseConfig.currentUser = res.d;
          this.$router.push({ name: "home" });
        });
      }
      return bl;
    },
    isEmpty: function() {
      if (this.loginForm.account) {
        this.isAccountEmpty = "top:-.8em;font-size: .8rem;";
      } else {
        this.isAccountEmpty = "";
      }
      if (this.loginForm.password) {
        this.isPasswordEmpty = "top:-.8em;font-size: .8rem;";
      } else {
        this.isPasswordEmpty = "";
      }
    }
  }
};
</script>
