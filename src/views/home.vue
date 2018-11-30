<template>
  <div class="home">
    <el-menu background-color="#3F51B5" text-color="#fff" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="6" style="width: 220px;">
        <img src="/static/img/logo.png" style="padding-left: 15px;">
      </el-menu-item>
      <el-menu-item>
        <i
          class="iconfont"
          :class="[menuShow?'icon-left_arrow':'icon-transversethree']"
          @click="onMenuChange"
          style="color:#fff;font-size: 20px;padding:20px 10px;"
        ></i>
      </el-menu-item>
      <el-menu-item index="5" style="float: right;margin-right: 10px;">
        <el-dropdown type="primary" @command="onCommand">
          <span class="avatar avatar-online">
            <img src="/static/img/5.jpg">
            <i></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="updatepassword" >
              <i class="iconfont icon-editpassword"></i> 修改密码
            </el-dropdown-item>
            <el-dropdown-item command="lockpage" divided>
              <i class="iconfont icon-lock"></i> 锁定
            </el-dropdown-item>
            <el-dropdown-item command="loginout" divided>
              <i class="iconfont icon-loginout"></i> 登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item index="4" style="float: right;">
        <el-dropdown type="primary">
          <span class="el-dropdown-link">
            <i class="iconfont icon-email" style="color:#fff"></i>
            <span class="badge-danger backcolorblue">{{emailNumber}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding: 0.5em 0 1em 1.5em;">
              <span>信息</span>
              <span style="float: right;margin: 0 1.5em 0 10em;;">
                <el-row>
                  <el-button
                    type="primary"
                    size="mini"
                    style="padding: 1px 7px;background-color: #17a2b8;"
                    round
                  >1条新信息</el-button>
                </el-row>
              </span>
            </div>
            <div class="dropdown-divider"></div>
            <div class="navtitle">
              <div class="navicon">
                <i class="el-icon-tickets" style="color:#fff;padding-top: 0.55em;"></i>
              </div>
              <div style="flot:right">
                <div>信息具体内容信息</div>
                <div style="color:#9e9e9e; font-size:12px;margin-top:0.4em;">信息时间</div>
              </div>
            </div>
            <div style="background-color: #eee;padding: 0.5em 0 1em 1.5em;">
              <span>
                <a href="#" style="color:#9e9e9e;">全部</a>
              </span>
              <span style="float: right;margin:0 1.5em 0 10em;;">
                <i class="iconfont icon-setting"></i>
              </span>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item style="float: right;">
        <el-dropdown type="primary">
          <span class="el-dropdown-link">
            <i class="iconfont icon-message" style="color:#fff;"></i>
            <span class="badge-danger backcolorred">{{messageNumber}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding: 0.5em 0 1em 1.5em;">
              <span>提醒</span>
              <span style="float: right;margin: 0 1.5em 0 10em;">
                <el-row>
                  <el-button
                    type="danger"
                    size="mini"
                    style="padding: 1px 7px;background-color: red;"
                    round
                  >1条新提醒</el-button>
                </el-row>
              </span>
            </div>
            <div class="dropdown-divider"></div>
            <div class="navtitle">
              <div class="navicon">
                <i class="el-icon-tickets" style="color:#fff;padding-top: 0.55em;"></i>
              </div>
              <div style="flot:right">
                <div>提醒具体内容信息提醒具</div>
                <div style="color:#9e9e9e; font-size:12px;margin-top:0.4em;">提醒消息时间</div>
              </div>
            </div>
            <div style="background-color: #eee;padding: 0.5em 0 1em 1.5em;">
              <span>
                <a href="#" style="color:#9e9e9e;">全部</a>
              </span>
              <span style="float: right;margin:0 1.5em 0 10em;;">
                <i class="iconfont icon-setting"></i>
              </span>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item index="2" style="float: right;">
        <el-dropdown type="primary" placement="bottom-start" @command="onCommand">
          <span
            class="avatar avatar-online"
            style="width: 5.5rem;line-height: 60px;height: 60px;padding-left: 10px;"
          >常用功能</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user-List">用户列表</el-dropdown-item>
            <el-dropdown-item command="user-List" divided>订单管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <el-container>
      <transition name="nav-slide-r">
        <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" class="menulist">
          <el-aside
            v-show="menuShow"
            :class="{navFlot:!isFixed}"
            style="background-color:#fcfcfc;"
            width="220px"
            translate
          >
            <el-menu
              :default-active="activeIndex"
              @select="onMenuSelect"
              collapse-transition
              unique-opened
              router
              style="padding-top: 20px;"
            >
              <template v-for="menu in menus">
                <el-menu-item
                  :key="menu.id"
                  :index="menu.route"
                  v-if="!menu.item"
                  class="navmenuitem"
                >
                  <i class="iconfont" :class="menu.icon" style="margin:0px .5em 0px 0;"></i>
                  <span>{{menu.name}}</span>
                </el-menu-item>
                <el-submenu :key="menu.id" :index="menu.id" v-if="menu.item">
                  <template slot="title">
                    <i class="iconfont" :class="menu.icon" style="margin:0px .5em 0px 0;"></i>
                    <span>{{menu.name}}</span>
                  </template>
                  <el-menu-item
                    v-for="c in menu.item"
                    :key="c.id"
                    :index="c.route"
                    class="navmenuitem"
                  >
                    <i
                      class="iconfont"
                      :class="c.icon"
                      style="margin:0px .5em 0px 0;color: #409EFF;"
                    ></i>
                    <span>{{c.name}}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </el-aside>
        </div>
      </transition>
      <el-main>
        <router-view/>
        <el-footer style="height: 32px;min-height: 32px;">
          <div>© 2018德贝实业版权所有</div>
        </el-footer>
      </el-main>
    </el-container>
    <el-dialog title="用户操作" :visible.sync="dialogEditPasswordVisible" width="400px">
      <editpassworditem
        v-on:setEditPasswordDialog="setEditPasswordDialog"
        v-if="dialogEditPasswordVisible"
      ></editpassworditem>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request"
import basics from '@/utils/basics'
import store from "@/store/store";
import "@/assets/theme/home.less";
import "@/assets/theme/fonts/iconfont.less";
import "@/assets/theme/animate.less";
import router from "@/router";
import editpassworditem from "@/components/opration/EditPasswordItem.vue";
export default {
  name: "home",
  components: {
    editpassworditem
  },
  data: function() {
    return {
      activeIndex:'',
      isFixed: false,
      menuShow: false,
      user: store.state.currentUser,
      emailNumber: 1,
      messageNumber: 1,
      menus: [],
      dialogEditPasswordVisible: false
    };
  },
  created: function() {
    this.getMenus();
    this.activeIndex=sessionStorage.getItem("navPage") || "user-List" ;
    router.push({ name: sessionStorage.getItem("firstPage") || "user-List" });
  },
  methods: {
    setEditPasswordDialog: function(val) {
      if (val === 1) {
        this.dialogEditPasswordVisible = false;
      } else if (val === 2) {
        this.dialogEditPasswordVisible = false;
        basics.currentUser = null;
        router.push({ name: "Login" });
      }
    },
    getMenus: function() {
      request.get(basics.server + "/api/menu/getmenus").then(res => {
        this.menus = res.d;
      });
    },
    onMenuChange: function() {
      if (this.menuShow) {
        this.menuShow = false;
        this.isFixed = false;
      } else {
        this.menuShow = true;
        this.isFixed = true;
      }
    },
    onMouseEnter: function() {
      if (!this.isFixed) {
        this.menuShow = true;
      }
    },
    onMouseLeave: function() {
      if (!this.isFixed) {
        this.menuShow = false;
      }
    },
    onMenuSelect:function(index){
      sessionStorage.setItem("navPage", index);
    },
    onCommand: function(val) {
      if (val === "loginout") {
        request.get(basics.server + "/api/login/loginout").then(res => {
          if (res.c === 0) {
            store.dispatch("setCurrentUser", null);
            //sessionStorage.removeItem('firstPage');
            //sessionStorage.removeItem('navPage');
            sessionStorage.clear();
            router.push("Login");
          }
        });
      } else if (val === "lockpage") {
        sessionStorage.setItem("firstPage", this.$route.name);
        router.push("Lock");
      } else if (val === "updatepassword") {
        this.dialogEditPasswordVisible = true;
      } else {
        router.push(val);
      }
    }
  },
  filters: {
    userName: function(value) {
      if (!value) return "";
      return value.name;
    }
  }
};
</script>



