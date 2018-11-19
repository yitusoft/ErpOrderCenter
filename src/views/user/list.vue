<template>
<div class="userlist">
    <div class="header">
      <div style="float: left;">
        <span class="title-name">用户管理</span>
      </div>
      <div style="float: left;margin-left: 20px;">
        <el-tag :key="tag" v-for="tag in whereTags" :disable-transitions="true">{{tag}}</el-tag>
      </div>
      <div style="float: right;">
        <el-button type="primary" size="medium" icon="iconfont icon-add" @click="addClick()">添加</el-button>
        <el-button type="primary" size="medium" icon="iconfont icon-add" @click="dialogFormVisible = true">添加</el-button>
        <el-button type="primary" size="medium" :icon="searchicon" @click="showSearchWhere=true">筛选</el-button>
        <el-button type="primary" size="medium" @click="isSingle = !isSingle">
          <span v-if="isSingle">单选</span><span v-else>多选</span>
          </el-button>
      </div>
    </div>
    <el-table :data="tableData" border="true" 
      :header-cell-style="{background:'#EEEEEE'}" 
      @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'age', order: 'descending'}"
      @sort-change="sortchange"
      @row-click="rowclick"
      ref="selectItems"
      @row-contextmenu="rowcontextmenu"
      >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="70">
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
        <el-table-column label="更多操作" width="100">
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
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="searchData.pageindex"
          prev-text="上一页"
          next-text="下一页"
          :page-sizes="[2, 20, 30, 40]" 
          :page-size="searchData.pageSize" 
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchData.total">
        </el-pagination>
    </div>
    <transition name="slide-fade-l">
      <!-- @mouseleave="mouseleave" -->
      <div class="searchWhere" v-if="showSearchWhere"  >
          <div class="title"><i class="iconfont icon-conditions" ></i><span style="margin: 0 0 0 5px;font-family: monospace;font-size: 15px;font-weight: 600;">筛选</span><i @click="showSearchWhere=false" class="iconfont icon-close" style="font-weight: 600;" ></i></div>
          <div class="where">
            <div>账号</div>
            <el-input v-model="searchData.account" placeholder="请输入账号" clearable="true"></el-input>
            <addresssearchcpt v-on:addresssearch_val="setAddressSearch" :param="searchData.address"></addresssearchcpt>
          </div>
          <div class="button">
            <el-button type="primary" icon="iconfont icon-search" size="medium" @click="search(0)">搜索</el-button>
          </div>
      </div>
    </transition>
    <el-dialog title="用户操作" :visible.sync="dialogFormVisible">
      <useredit v-on:dialog_op="setDialog"></useredit>
    </el-dialog>
    <transition>
        <rightmenucpt :contextMenuData="contextMenuData" v-on:editData="editData" v-on:addData="addData" v-on:deleteData="deleteData" ></rightmenucpt>
    </transition>
</div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
import router from "@/router";
import useredit from "@/views/user/edit.vue";
import addresssearchcpt from "@/components/addressSearch.vue";
import rightmenucpt from "@/components/rightmenu.vue";
import "@/css/list.less";
export default {
  name: "userlist",
  components: {
    useredit,
    addresssearchcpt,
    rightmenucpt
  },
  created: function() {
    if (this.isCheck && this.page == "userlist") {
      this.searchData = baseConfig.wherePage.searchWhere;
    } else {
      baseConfig.wherePage.searchWhere = this.searchData;
    }
  },
  data: function() {
    return {
      contextMenuData: {
        menuName: "userlistmenu",
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            fnHandler: "addData",
            icoName: "iconfont icon-add",
            btnName: "新增"
          },
          {
            fnHandler: "editData",
            icoName: "iconfont icon-edit",
            btnName: "修改"
          },
          {
            fnHandler: "deleteData",
            icoName: "iconfont icon-delete",
            btnName: "删除"
          }
        ]
      },
      showoperation: false,
      showoperationcss: "",
      searchicon: "iconfont icon-condition",
      isSingle: true,
      tableData: [],
      selectItems: {},
      isCheck: baseConfig.wherePage.isCheck,
      page: baseConfig.wherePage.page,
      dialogFormVisible: false,
      showSearchWhere: false,
      noShowSearch:'pageIndex;pageSize;orderBy;total;',
      searchData: {
        pageIndex: 1,
        pageSize: 2,
        orderBy: "",
        account: "",
        address: "",
        total: 0
      },
      whereTags: [],
      selectRowData:{}
    };
  },
  watch: {
    // "searchData.account": function(newVal) {
    //   this.setTagChange(newVal,'account');
    // },
    // "searchData.address": function(newVal) {
    //   this.setTagChange(newVal,'address');
    // }
  },
  methods: {
    setTagChange: function(newVal, oldVal) {
      if (newVal) {
        if (oldVal) {
          this.whereTags[oldVal] = newVal;
        } else {
          this.whereTags.push(newVal);
        }
      } else {
        if (oldVal) {
          this.whereTags.splice(this.whereTags.indexOf(oldVal), 1);
        }
      }
      // const oldTag = this.whereTags.filter(t => t.name == name);
      // if (newVal) {
      //   if (oldTag.length > 0) {
      //     this.whereTags[this.whereTags.indexOf(oldTag[0])].value = newVal;
      //   } else {
      //     this.whereTags.push({ type: "", value: newVal, name: name });
      //   }
      // } else {
      //   if (oldTag.length > 0) {
      //     this.whereTags.splice(this.whereTags.indexOf(oldTag[0]), 1);
      //   }
      // }
    },
    onWhereTagDelete: function(tag) {
      switch (tag.name) {
        case "address":
          this.searchData.address = "";
          break;
        case "account":
          this.searchData.account = "";
          break;
      }
      this.whereTags.splice(this.whereTags.indexOf(tag), 1);
      this.search(0);
    },
    addData: function() {
      alert("点击了新增"+this.selectRowData.account);
    },
    editData: function() {
      alert("点击了修改"+this.selectRowData.account);
    },
    deleteData:function(){
      alert("点击了删除"+this.selectRowData.account);
    },
    rowcontextmenu: function(row, event) {
      event.preventDefault();
      this.$refs.selectItems.clearSelection();
      this.$refs.selectItems.toggleRowSelection(row);
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = { x, y };
      this.selectRowData =row;
    },
    rowclick: function(row) {
      if (this.isSingle) {
        this.$refs.selectItems.clearSelection();
        this.$refs.selectItems.toggleRowSelection(row);
      } else {
        this.$refs.selectItems.toggleRowSelection(row);
      }
    },
    sortchange: function(column) {
      var searchorderby = "";
      if (column.order === "descending") {
        searchorderby = "desc";
      }
      baseConfig.wherePage.searchWhere.orderBy =
        column.prop + " " + searchorderby;
      this.search(0);
      return false;
    },
    handleSelectionChange: function(val) {
      this.selectItems = val;
    },
    setAddressSearch: function(val) {
      this.searchData.address = val;
    },
    setDialog: function(val) {
      if (val === 1) {
        this.dialogFormVisible = false;
      } else if (val === 2) {
        this.dialogFormVisible = false;
        this.search(0);
      }
    },
    setTags: function(data) {
      this.whereTags = [];
      for (var item in data) {
        if (this.noShowSearch.indexOf(item + ";") == -1) {
          if (data[item]) {
            this.whereTags.push(data[item]);
          }
        }
      }
    },
    search: function(num) {
      baseConfig.wherePage.page = "userlist";
      var whereData = {};
      if (num == 0) {
        baseConfig.wherePage.searchWhere = this.searchData;
      }
      whereData = baseConfig.wherePage.searchWhere;
      this.setTags(whereData);
      request
        .post(baseConfig.server + "/api/user/getlist", whereData)
        .then(res => {
          if (res.d.length > 0) {
            this.tableData = res.d;
            this.searchData.total = res.t;
            this.showSearchWhere = false;
          } else {
            if (baseConfig.wherePage.searchWhere.pageindex > 1) {
              baseConfig.wherePage.searchWhere.pageindex -= 1;
              this.search(1);
            } else {
              this.tableData = res.d;
              this.searchData.total = res.t;
              this.showSearchWhere = false;
            }
          }
        });
    },
    editClick: function(id) {
      router.push({ name: "user-edits", params: { id: id } });
    },
    addClick: function() {
      router.push({ name: "user-edits" });
    },
    deleteClick: function(id) {
      request
        .get(baseConfig.server + "/api/user/delete", { params: { id: id } })
        .then(res => {
          if (res.c === 0) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.search(1);
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        });
    },

    handleSizeChange(val) {
      baseConfig.wherePage.searchWhere.pageSize = val;
      this.search(1);
    },
    handleCurrentChange(val) {
      baseConfig.wherePage.searchWhere.pageindex = val;
      this.search(1);
    },
    searchClick: function() {},
    mouseleave: function() {
      this.showSearchWhere = false;
    }
  }
};
</script>
