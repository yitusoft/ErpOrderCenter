<template>
<div class="home" >
<el-menu background-color="#3F51B5" text-color="#fff"  class="el-menu-demo" mode="horizontal" >
  <el-menu-item index="6">
    <img src="/static/img/logo.png" >
  </el-menu-item>
    <el-menu-item>
    <i :class="this.menuShowCss" @click="onMenuChange" style="color:#fff;font-size: 20px;padding:20px 10px;"></i>
  </el-menu-item>
<el-menu-item index="5" style="float: right;margin-right: 10px;">
    <el-dropdown type="primary" @command="onCommand">
      <span class="avatar avatar-online"><img src="/static/img/5.jpg"><i></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="updatepassword" ><i class="iconfont icon-editpassword" ></i> 修改密码</el-dropdown-item>
        <div class="dropdown-divider"></div>
        <el-dropdown-item command="loginout"><i class="iconfont icon-loginout"></i> 登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu-item>
  <el-menu-item index="4" style="float: right;">
    <el-dropdown  type="primary">
      <span class="el-dropdown-link">
        <i class="iconfont icon-email" style="color:#fff"></i>
        <span class="badge-danger backcolorblue">{{emailNumber}}</span>
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
            <i class="el-icon-tickets" style="color:#fff;padding-top: 0.55em;"></i>
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
        <div style="background-color: #eee;padding: 0.5em 0 1em 1.5em;">
          <span><a href="#" style="color:#9e9e9e;">全部</a></span>
          <span style="float: right;margin:0 1.5em 0 10em;;">
            <i class="iconfont icon-setting" ></i>
          </span>
        </div>
      </el-dropdown-menu> 
    </el-dropdown>
  </el-menu-item>
  <el-menu-item style="float: right;">
    <el-dropdown  type="primary">
      <span class="el-dropdown-link">
        <i class="iconfont icon-message" style="color:#fff;"></i>
        <span class="badge-danger backcolorred">{{messageNumber}}</span>
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
            <i class="el-icon-tickets" style="color:#fff;padding-top: 0.55em;"></i>
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
        <div style="background-color: #eee;padding: 0.5em 0 1em 1.5em;">
          <span><a href="#" style="color:#9e9e9e;">全部</a></span>
          <span style="float: right;margin:0 1.5em 0 10em;;">
            <i class="iconfont icon-setting" ></i>
          </span>
        </div>
      </el-dropdown-menu> 
    </el-dropdown>
   </el-menu-item>
  <el-menu-item index="2" style="float: right;">
    <el-dropdown type="primary" placement="bottom-start">
      <span class="avatar avatar-online" style="width: 5.5rem;line-height: 60px;height: 60px;padding-left: 10px;">常用功能</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户列表</el-dropdown-item>
        <el-dropdown-item>订单管理</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu-item>
</el-menu>
<el-container>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" style="border-right: solid 1px #e6e6e6;background-color: #fff;" >
    <transition name="slide-fade-r">
      <el-aside v-show="menuShow" :class="navFlotCss" style="background-color:#fff;border-right: 1px solid rgb(228, 225, 225);" width="260px" translate>
        <div class="site-menubar-header">
          <div class="cover overlay">
            <img class="cover-image" src="/static/img/login-background.jpg" alt="...">
            <div class="overlay-panel vertical-align overlay-background">
              <div style="margin-top: -90px;">
                <a class="avatars" href="javascript:void(0)" style="width: 70px;float: left;" >
                  <img src="/static/img/5.jpg" alt="">
                </a>
                <div class="site-menubar-info">
                  <h5 class="site-menubar-user">Machi</h5>
                  <p class="site-menubar-email">machidesign</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-menu
        :default-active="$route.path"
        @select="onMenuSelect"
        collapse-transition
        unique-opened
        style="border-right:none;background-color:#fff"
        >
          <el-submenu v-for="menu in menus" :key="menu.id" :index="menu.id">
            <template slot="title" style="padding-left: 3.5em;">
              <i class="iconfont icon-email" style="margin: 0 1em 0 2em;"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item v-for="c in menu.item" :key="c.route" :index="c.route"  style="padding-left: 85px;">{{c.name}} </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
    </transition>
  </div>
  <el-main ref="contentMain">
    <router-view/>
    <el-footer style="height: 32px;min-height: 32px;"> 
    <div>© 2018德贝实业版权所有</div>
    </el-footer>
  </el-main>
</el-container>
</div>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
import "@/assets/theme/home.less";
import "@/assets/theme/fonts/iconfont.less";
import router from "@/router";
export default {
  name: "home",
  data: function() {
    return {
      isFixed: false,
      menuShow: false,
      menuShowCss: "iconfont icon-transversethree",
      navFlotCss: "",
      user: basics.currentUser,
      emailNumber: 1,
      messageNumber: 1,
      menus: []
    };
  },
  created: function() {
    this.getMenus();
    router.push({ name: "user-List" });
  },
  methods: {
    getMenus: function() {
      request.get(basics.server + "/api/menu/getmenus").then(res => {
        this.menus = res.d;
      });
    },
    onMenuSelect(key) {
      router.push({ name: key });
    },
    onMenuChange: function() {
      this.navFlotCss = "";
      if (this.menuShow) {
        this.menuShow = false;
        this.menuShowCss = "iconfont icon-transversethree";
        this.isFixed = false;
      } else {
        this.menuShow = true;
        this.menuShowCss = "iconfont icon-left_arrow";
        this.isFixed = true;
      }
    },
    onMouseEnter: function() {
      if (!this.isFixed) {
        this.menuShow = true;
        this.menuShowCss = "iconfont icon-left_arrow";
        this.navFlotCss = "navFlot";
      }
    },
    onMouseLeave: function() {
      if (!this.isFixed) {
        this.menuShow = false;
        this.menuShowCss = "iconfont icon-transversethree";
      }
    },
    onCommand:function(val){
        if(val==='loginout')
        {
          request.get(basics.server + "/api/login/loginout").then(res => {
            if(res.c===0)
            {
                basics.currentUser=null;
                router.push('Login');
            }
          });
        }
    }
  }
};
</script>



