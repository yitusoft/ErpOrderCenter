<template>
<div  id="app">
<el-menu background-color="#3F51B5" text-color="#fff"  class="el-menu-demo" mode="horizontal" >
  <el-menu-item index="1">
    <i :class="this.menushowcss" @click="changemenu()" style="color:#fff;font-size: 20px;"></i>
  </el-menu-item>
  <el-menu-item index="2">
    <el-dropdown type="primary" trigger="click">
      <span class="avatar avatar-online" style="width: 4rem;">常用功能</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户列表</el-dropdown-item>
        <el-dropdown-item>订单管理</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu-item>
  <el-menu-item index="3" style="float: right;">
    <el-dropdown  type="primary"  trigger="click">
      <span class="el-dropdown-link">
        <i class="iconfont icon-email" style="color:#fff"></i>
        <span class="badge-danger backcolorblue">{{emailnumber}}</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div style="padding: 0.5em 0 1em 1.5em;">
          <span>信息</span>
          <span style="float: right;margin: 0 1.5em 0 10em;;">
            <el-row>
              <el-button type="primary" size="mini" style="padding: 1px 7px;background-color: #17a2b8;" round>1条新信息</el-button>
            </el-row>
          </span>
        </div>
        <div class="dropdown-divider" ></div>
        <div class="navtitle">
          <div class="navicon">
            <i class="el-icon-tickets" style="color:#fff;padding-top: 0.3em;"></i>
          </div>
          <div style="flot:right">
            <div>
              信息具体内容信息
            </div>
            <div style="color:#9e9e9e; font-size:12px;margin-top:0.4em;">
              信息时间
            </div>
          </div>
        </div>
        <div class="dropdown-divider" ></div>
        <div style="background-color: #eee;padding: 0.5em 0 1em 1.5em;">
          <span><a href="#" style="color:#9e9e9e;">全部</a></span>
          <span style="float: right;margin:0 1.5em 0 10em;;">
            <i class="iconfont icon-setting" ></i>
          </span>
        </div>
      </el-dropdown-menu> 
    </el-dropdown>
  </el-menu-item>
  <el-menu-item index="4" style="float: right;">
    <el-dropdown  type="primary"  trigger="click">
      <span class="el-dropdown-link">
        <i class="iconfont icon-message" style="color:#fff;"></i>
        <span class="badge-danger backcolorred">{{messagenumber}}</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div style="padding: 0.5em 0 1em 1.5em;">
          <span>提醒</span>
          <span style="float: right;margin: 0 1.5em 0 10em;">
          <el-row>
            <el-button type="danger" size="mini" style="padding: 1px 7px;background-color: red;" round>1条新提醒</el-button>
          </el-row>
          </span>
        </div>
        <div class="dropdown-divider" ></div>
          <div class="navtitle">
          <div class="navicon">
            <i class="el-icon-tickets" style="color:#fff;padding-top: 0.3em;"></i>
          </div>
          <div style="flot:right">
            <div>
              提醒具体内容信息提醒具
            </div>
            <div style="color:#9e9e9e; font-size:12px;margin-top:0.4em;">
              提醒消息时间
            </div>
          </div>
        </div>
        <div class="dropdown-divider" ></div>
        <div style="background-color: #eee;padding: 0.5em 0 1em 1.5em;">
          <span><a href="#" style="color:#9e9e9e;">全部</a></span>
          <span style="float: right;margin:0 1.5em 0 10em;;">
            <i class="iconfont icon-setting" ></i>
          </span>
        </div>
      </el-dropdown-menu> 
    </el-dropdown>
   </el-menu-item>

  <el-menu-item index="5" style="float: right;">
    <el-dropdown type="primary" trigger="click">
      <span class="avatar avatar-online"><img src="img/5.jpg"><i></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><i class="iconfont icon-editpassword" ></i> 修改密码</el-dropdown-item>
        <div class="dropdown-divider"></div>
        <el-dropdown-item><i class="iconfont icon-loginout" ></i> 登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu-item>
</el-menu>
<el-container>
  
  <el-main>
    <div  :width="this.menuwidth" @mouseenter="mouseenter()" @mouseleave="mouseleave()" style="position: fixed;left: 0;top: 60px;z-index: 2000;width: 1px;height: 100%;">
    <el-aside background-color="#eceff1" v-if="menushow" width="260px">
      <div class="site-menubar-header">
        <div class="cover overlay">
          <img class="cover-image" src="img/login-background.jpg" alt="...">
          <div class="overlay-panel vertical-align overlay-background">
            <div style="margin-top: 14px;">
              <a class="avatar" href="javascript:void(0)" style="width: 70px;" >
                <img src="img/5.jpg" alt="">
              </a>
              <div class="site-menubar-info">
                <h5 class="site-menubar-user">Machi</h5>
                <p class="site-menubar-email">machidesign@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#ebeef5"
      @select="handleSelect"
      text-color="#606266"
      active-text-color="#606266"
      collapse-transition
      unique-opened
      style="position: fixed;bottom: 0;top: 200px;width: 260px;">
        <el-submenu v-for="menu in menus" :key="menu.id" :index="menu.id">
          <template slot="title">
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item v-for="c in menu.item" :key="c.route" :index="c.route">{{c.name}} </el-menu-item>         
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
    <router-view />
  </el-main>
</el-container>
<el-footer>
  <div>© 2018 <a href="#">Remark</a>Crafted with <i class="red-600 icon md-favorite"></i> by <a href="#">Creation Studio</a></div>
</el-footer>
</div>

</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
import router from "@/router";
export default {
  name: "home",
  data: function() {
    return {
      isfixed: false,
      menushow: false,
      menushowcss: "iconfont icon-transversethree",
      menuwidth: "1px",
      user: baseConfig.currentUser,
      emailnumber: 1,
      messagenumber: 1,
      menus: []
    };
  },
  created: function() {
    this.getMenus();
    router.push({ name: "user-list" });
  },
  methods: {
    getMenus: function() {
      request.get(baseConfig.server + "/api/menu/getmenus").then(res => {
        this.menus = res.d;
      });
    },
    handleSelect(key) {
      router.push({ name: key });
    },
    changemenu: function() {
      if (this.menushow) {
        this.menushow = false;
        this.menushowcss = "iconfont icon-transversethree";
        this.menuwidth = "1px";
        this.isfixed = false;
      } else {
        this.menushow = true;
        this.menushowcss = "iconfont icon-left_arrow";
        this.menuwidth = "260px";
        this.isfixed = true;
      }
    },
    mouseenter: function() {
      if (!this.isfixed) {
        this.menushow = true;
        this.menushowcss = "iconfont icon-left_arrow";
        this.menuwidth = "260px";
      }
    },
    mouseleave: function() {
      if (!this.isfixed) {
        this.menushow = false;
        this.menushowcss = "iconfont icon-transversethree";
        this.menuwidth = "1px";
      }
    }
  }
};
</script>


