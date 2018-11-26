<template>
<div class="userlist">
  <div class="content">
    <div class="header">
      <div style="float: left;">
        <span class="title-name">用户管理</span>
      </div>
      <div style="float: left;margin-left: 20px;">
        <el-tag :key="tag" v-for="tag in whereTags" :disable-transitions="true">{{tag}}</el-tag>
        <el-button type="text" v-if="whereTags.length>0" @click="onClearWhere" size="mini" round style="margin-left: 10px;">清空</el-button>
      </div>
      <div style="float: right;">
        <el-button type="primary" size="medium" icon="iconfont icon-add" @click="onAddClick()">添加</el-button>
        <el-button type="primary" size="medium" icon="iconfont icon-add" @click="onAddClicks()">添加</el-button>
        <el-button type="primary" size="medium" icon="iconfont icon-condition" @click="showSearchWhere=true">筛选</el-button>
        <el-button type="primary" size="medium" @click="isSingle = !isSingle">
          <span v-if="isSingle">单选</span><span v-else>多选</span>
          </el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table 
        ref="selectList"
        :data="tableData" 
        :default-sort = "{prop: 'age', order: 'descending'}"
        :header-cell-style="{background:'#EEEEEE'}" 
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
        @row-click="onRowClick"
        @row-contextmenu="onRowContextMenu"
        border="true" 
        >
          <el-table-column type="selection" width="38">
          </el-table-column>
          <el-table-column type="index" label="序号" width="50" style="text-align: center;">
          </el-table-column>
          <el-table-column prop="account" label="账号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="address" label="地址" >
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="100" sortable="custom">
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间">
          </el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-dropdown placement="bottom-end">
                <span class="el-dropdown-link">操作</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="editClick(scope.row.id)">编辑</span></el-dropdown-item>
                  <el-dropdown-item ><span @click="deleteClick(scope.row.id)">删除</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <el-button @click="onEditClick(scope.row.id)" type="text" size="small">编辑</el-button>
                  <el-button @click="onDeleteClick(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
        <el-pagination 
          @size-change="onListSizeChange" 
          @current-change="onListIndexChange" 
          :current-page="searchData.pageindex"
          prev-text="上一页"
          next-text="下一页"
          :page-sizes="[10, 20, 30, 40]" 
          :page-size="searchData.pageSize" 
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchData.total">
        </el-pagination>
    </div>
  </div>
    <transition name="slide-fade-l">
      <div class="searchWhere" v-if="showSearchWhere" >
          <div class="title"><i class="iconfont icon-conditions" ></i><span style="margin: 0 0 0 5px;font-family: monospace;font-size: 15px;font-weight: 600;">筛选</span><i @click="onSearchWhereFixed" class="iconfont icon-notlockpage" ref="lockSearch" title="锁定" ></i></div>
          <div class="where">
            <div>账号</div>
            <el-input v-model="searchData.account" placeholder="请输入账号" clearable="true"></el-input>
            <addressitem v-on:setAddressSearch="setAddressSearch" :param="searchData.address"></addressitem>
          </div>
          <div class="button">
            <el-button type="primary" icon="iconfont icon-search" size="medium" @click="getDataList(0)">搜索</el-button>
          </div>
      </div>
    </transition>
    <el-dialog title="用户操作" :visible.sync="dialogUserVisible"  width="600px" >
      <useredit v-on:setEditUserDialog="setEditUserDialog" v-if="dialogUserVisible" ></useredit>
    </el-dialog>
    <transition>
        <rightmenuitem :contextMenuData="contextMenuData" v-on:onEditData="onEditData" v-on:onAddData="onAddData" v-on:onDeleteData="onDeleteData" ></rightmenuitem>
    </transition>
    <div v-if="showSearchWhere&!lockSearch" @click="onClickMask" class="searchWhereMask"></div>
</div>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
import router from "@/router";
import useredit from "@/views/user/Edit.vue";
import addressitem from "@/components/search/AddressItem.vue";
import rightmenuitem from "@/components/opration/RightMenuItem.vue";
import "@/assets/theme/list.less";
export default {
  name: "userlist",
  components: {
    useredit,
    addressitem,
    rightmenuitem
  },
  data: function() {
    return {
      contextMenuData: {
        menuName: "userlistmenu",
        axis: {
          x: null,
          y: null
        },
        menuLists: [
          {
            onClick: "onAddData",
            icoName: "iconfont icon-add",
            btnName: "新增"
          },
          {
            onClick: "onEditData",
            icoName: "iconfont icon-edit",
            btnName: "修改"
          },
          {
            onClick: "onDeleteData",
            icoName: "iconfont icon-delete",
            btnName: "删除"
          }
        ]
      },
      isSingle: true,
      tableData: [],
      selectItems: {},
      dialogUserVisible: false,
      showSearchWhere: false,
      noShowSearch: "pageindex;pagesize;orderby;total;",
      searchData: {
        pageIndex: 1,
        pageSize: 10,
        orderBy: "",
        account: "",
        address: "",
        total: 0
      },
      whereTags: [],
      selectRowData: {},
      lockSearch: false
    };
  },
  created: function() {
    if (basics.wherePage.page == "userlist") {
      this.searchData = basics.wherePage.searchWhere;
    } else {
      basics.wherePage.searchWhere = this.searchData;
    }
  },
  mounted: function() {},
  methods: {
    onClearWhere:function(){
      this.whereTags=[];
      for (var item in this.searchData) {
        if (this.noShowSearch.indexOf(item.toLowerCase() + ";") == -1) {
          this.searchData[item]='';
        }
      }
      this.getDataList(0);
    },
    onSearchWhereFixed: function() {
      var objButton = this.$refs.lockSearch;
      var css = "iconfont icon-notlockpage";
      var words = "锁定";
      if (this.lockSearch) {
        this.lockSearch = false;
      } else {
        css = "iconfont icon-lockpage";
        words = "取消锁定";
        this.lockSearch = true;
      }
      objButton.className = css;
      objButton.title = words;
    },
    onAddData: function() {
      alert("点击了新增" + this.selectRowData.account);
    },
    onEditData: function() {
      alert("点击了修改" + this.selectRowData.account);
    },
    onDeleteData: function() {
      alert("点击了删除" + this.selectRowData.account);
    },
    onRowContextMenu: function(row, event) {
      event.preventDefault();
      this.$refs.selectList.clearSelection();
      this.$refs.selectList.toggleRowSelection(row);
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = { x, y };
      this.selectRowData = row;
    },
    onRowClick: function(row) {
      //if (this.isSingle) {
        this.$refs.selectList.clearSelection();
        this.$refs.selectList.toggleRowSelection(row);
      // } else {
      //   this.$refs.selectList.toggleRowSelection(row);
      // }
    },
    onSortChange: function(column) {
      var searchorderby = "";
      if (column.order === "descending") {
        searchorderby = "desc";
      }
      basics.wherePage.searchWhere.orderBy =
        column.prop + " " + searchorderby;
      this.getDataList(0);
      return false;
    },
    onSelectionChange: function(val) {
      debugger
      this.selectItems = val;
    },
    setAddressSearch: function(val) {
      this.searchData.address = val;
    },
    setEditUserDialog: function(val) {
      if (val === 1) {
        this.dialogUserVisible = false;
      } else if (val === 2) {
        this.dialogUserVisible = false;
        this.getDataList(0);
      }
    },
    setTags: function(data) {
      this.whereTags = [];
      for (var item in data) {
        if (this.noShowSearch.indexOf(item.toLowerCase() + ";") == -1) {
          if (data[item]) {
            this.whereTags.push(data[item]);
          }
        }
      }
    },
    getDataList: function(num) {
      basics.wherePage.page = "userlist";
      var whereData = {};
      if (num == 0) {
        basics.wherePage.searchWhere = this.searchData;
      }
      whereData = basics.wherePage.searchWhere;
      this.setTags(whereData);
      request
        .post(basics.server + "/api/user/getlist", whereData)
        .then(res => {
          if (res.d.length > 0) {
            this.tableData = res.d;
            this.searchData.total = res.t;
          } else {
            if (basics.wherePage.searchWhere.pageindex > 1) {
              basics.wherePage.searchWhere.pageindex -= 1;
              this.getDataList(1);
            } else {
              this.tableData = res.d;
              this.searchData.total = res.t;
            }
          }
          if (!this.lockSearch) {
            this.showSearchWhere = false;
          }
        });
    },
    onEditClick: function(id) {
      router.push({ name: "user-Edits", params: { id: id } });
    },
    onAddClick: function() {
      router.push({ name: "user-Edits" });
    },
    onAddClicks: function() {
      this.dialogUserVisible = true;
    },
    onDeleteClick: function(id) {
      request
        .get(basics.server + "/api/user/delete", { params: { id: id } })
        .then(res => {
          if (res.c === 0) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.getDataList(1);
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        });
    },
    onListSizeChange(val) {
      basics.wherePage.searchWhere.pageSize = val;
      this.getDataList(1);
    },
    onListIndexChange(val) {
      basics.wherePage.searchWhere.pageindex = val;
      this.getDataList(1);
    },
    onClickMask: function() {
      this.showSearchWhere = false;
    }
  },
  filters: {},
  computed: {},
  watch: {}
};
</script>
