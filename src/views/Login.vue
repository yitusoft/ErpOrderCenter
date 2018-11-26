<template>
<div class="page-login layout-full page-dark" style="background-color: transparent;" >
    <div class="page vertical-align text-center">
      <div class="page-content vertical-align-middle" style="position:relative;">
       <div class="login-area-bg"></div> 
       <div class="login-area"> 
        <div class="brand">
         <h2>订单管理系统</h2>
        </div>
        <!-- <p>欢迎使用订单管理系统</p> -->
        <form>
          <div class="form-group form-material floating">
            <input type="text" class="form-control empty" v-on:blur="isEmpty" v-model="loginForm.account" name="账号">
            <label :style="isAccountEmpty" class="floating-label">账号</label>
          </div>
          <div class="form-group form-material floating">
            <input type="password" class="form-control empty" v-on:blur="isEmpty" v-model="loginForm.password" name="密码">
            <label :style="isPasswordEmpty" class="floating-label">密码</label>
          </div>
          <button type="button" @click="onSubmitForm" class="btn btn-primary btn-block">登录</button>
        </form>
        <div class="page-copyright page-copyright-inverse">
          <p>© 2018 德贝实业All RIGHT RESERVED.</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
import "@/assets/theme/bootstrap.less";
import "@/assets/theme/bootstrap-extend.less";
import "@/assets/theme/site.less";
import "@/assets/theme/login.less";
export default {
  name: "login",
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
  created: function() {
    this.setLoginInfo();
  },
  methods: {
    onSubmitForm: function() {
      var bl = true;
      if (!this.loginForm.account) {
        this.$message({ message: "账号不能为空！", type: "warning" });
        bl = false;
      } else if (!this.loginForm.password) {
        this.$message({ message: "密码不能为空！", type: "warning" });
        bl = false;
      }
      if (bl) {
        request
          .get(basics.server + "/api/login/login", { params: this.loginForm })
          .then(res => {
            basics.currentUser = res.d;
            sessionStorage.setItem('firstPage','user-List');
            this.$router.push({ name: "Home" });
          });
      }
      return bl;
    },
    setLoginInfo: function() {
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
