<template>
  <div
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    class="menulist"
  >
    <el-aside
      v-show="menuShow"
      :class="{navFlot:!isFixed}"
      style="background-color:#fcfcfc;"
      width="220px"
      translate
    >
      <!-- <div class="site-menubar-header">
              <div class="cover overlay">
                <img class="cover-image" src="/static/img/login-background.jpg" alt="...">
                <div class="overlay-panel vertical-align overlay-background">
                  <div style="margin-top: -90px;">
                    <a class="avatars" href="javascript:void(0)" style="width: 70px;float: left;">
                      <img src="/static/img/5.jpg" alt>
                    </a>
                    <div class="site-menubar-info">
                      <h5 class="site-menubar-user" v-once>{{user|userName}}</h5>
                      <p class="site-menubar-email">machidesign</p>
                    </div>
                  </div>
                </div>
              </div>
      </div>-->
      <el-menu
        :default-active="$route.path"
        @select="onMenuSelect"
        collapse-transition
        unique-opened
        router
        style="padding-top: 20px;"
      >
        <el-menu-item
          v-for="menu in menus"
          :key="menu.id"
          :index="menu.route"
          v-if="!menu.item"
          class="navmenuitem"
        >
          <i class="iconfont" :class="menu.icon" style="margin:0px .5em 0px 0;"></i>
          <span>{{menu.name}}</span>
        </el-menu-item>
        <el-submenu v-for="menu in menus" :key="menu.id" :index="menu.id" v-if="menu.item">
          <template slot="title">
            <i class="iconfont" :class="menu.icon" style="margin:0px .5em 0px 0;"></i>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item v-for="c in menu.item" :key="c.id" :index="c.route" class="navmenuitem">
            <i class="iconfont" :class="c.icon" style="margin:0px .5em 0px 0;color: #409EFF;"></i>
            <span>{{c.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import request from "@/utils/request"
import basics from '@/utils/basics'
import store from "@/store/store";
export default {
  name: "menu",
  data: function() {
    return {
      menuShow: false,
      menus: []
    };
  },
  created: function() {
    this.getMenus();
  },
  methods: {
    getMenus: function() {
      request.get(basics.server + "/api/menu/getmenus").then(res => {
        this.menus = res.d;
      });
    }
  }
};
</script>

