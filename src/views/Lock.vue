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
            <input type="password" class="form-control empty" v-on:blur="isEmpty" v-model="loginForm.password" name="密码">
            <label :style="isPasswordEmpty" class="floating-label">密码</label>
          </div>
          <button type="button" @click="onSubmitForm" class="btn btn-primary btn-block">解锁</button>
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
import request from "@/utils/request"
import basics from '@/utils/basics'
import store from '@/store/store'
import "@/assets/theme/bootstrap.less";
import "@/assets/theme/bootstrap-extend.less";
import "@/assets/theme/site.less";
import "@/assets/theme/login.less";
export default {
  name: "login",
  created: function() {
    this.setLoginInfo();
  },
  data: function() {
    return {
      isAccountEmpty: "",
      isPasswordEmpty: "",
      loginForm: {
        password: "11111"
      }
    };
  },
  methods: {
    onSubmitForm: function() {
      var bl = true;
      if (!this.loginForm.password) {
        this.$message({ message: "密码不能为空！", type: "warning" });
        bl = false;
      }
      if (bl) {
        request
          .get(basics.server + "/api/login/unlocklogin", { params: this.loginForm })
          .then(res => {
            basics.currentUser = res.d;
            store.dispatch('setAllowBack', { allowBack: false });
            this.$router.push({ name: 'Home' });
          });
      }
      return bl;
    },
    setLoginInfo: function() {
      if (this.loginForm.password) {
        this.isPasswordEmpty = "top:-.8em;font-size: .8rem;";
      } else {
        this.isPasswordEmpty = "";
      }
    }
  }
};
</script>
