<template>
  <div class="userlist">
    <div class="content">
      <div class="header">
        <div style="float: left;">
          <span class="title-name">客户管理</span>
          <span class="title-name-over">></span>
          <span class="title-name-item">订单管理</span>
        </div>
        <div style="float: left;margin-left: 20px;">
          <el-tag :key="tag" v-for="tag in whereTags" :disable-transitions="true">{{tag}}</el-tag>
          <el-button
            type="text"
            v-if="whereTags.length>0"
            @click.stop="onClearWhere"
            size="mini"
            round
            style="margin-left: 10px;"
          >清空</el-button>
        </div>
        <div style="float: right;">
          <el-button
            type="primary"
            size="medium"
            icon="iconfont icon-add"
            @click.stop="onAddClick()"
          >添加</el-button>
          <el-button
            type="primary"
            size="medium"
            icon="iconfont icon-add"
            @click.stop="dialogUserVisible = true"
          >添加</el-button>
          <el-button
            type="primary"
            size="medium"
            icon="iconfont icon-condition"
            @click="showSearchWhere=true"
          >筛选</el-button>
          <el-button type="primary" size="medium" @click="isSingle = !isSingle">
            {{isSingle?"单选":"多选"}}
            <!-- <span v-if="isSingle">单选</span>
            <span v-else>多选</span>-->
          </el-button>
          <el-dropdown class="menumore" placement="bottom-end" trigger="click">
            <el-button type="primary" size="medium">
              <span style="padding-right:3px">操作</span>
              <i class="iconfont icon-dropdown" style="padding-right:0"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item divided>修改修改修改</el-dropdown-item>
              <el-dropdown-item divided>删除</el-dropdown-item>
              <el-dropdown-item divided>查看</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="table-wrap">
        <el-table
          ref="selectList"
          :data="tableData"
          :default-sort="{prop: 'age', order: 'descending'}"
          :header-cell-style="setHeaderRowClass"
          :cell-style="setCellStyle"
          @select="onSelect"
          @sort-change="onSortChange"
          @row-click="onRowClick"
          @row-contextmenu="onRowContextMenu"
          @current-change="onCurrentChange"
          border="true"
          :row-style="listRowClass"
        >
          <el-table-column type="selection" width="38" header-align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" header-align="center"></el-table-column>
          <el-table-column prop="account" label="账号">
            <template slot-scope="{row,$index}">
              <el-input size="small" placeholder="请输入内容" v-if="showEdit[$index]" class="editCellText" v-model="row.account"></el-input>
              <span v-if="!showEdit[$index]">{{row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="address" label="地址">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.address" placeholder="区域"  size="small"  v-if="showEdit[$index]">
                <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
                <el-option label="成都市" value="chengdu"></el-option>
                <el-option label="郫县" value="pixian"></el-option>
              </el-select>
              <span v-if="!showEdit[$index]">{{row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="90" sortable="custom">
             <template slot-scope="{row,$index}">
               <el-input-number v-model="row.age" :min="1" :max="2000000" controls-position="right" :precision="0" class="editCellNumber" size="mini" v-if="showEdit[$index]"></el-input-number>
              <span v-if="!showEdit[$index]">{{row.age}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间">
            <template slot-scope="{row,$index}">
              <el-date-picker type="datetime" placeholder="选择日期" class="editCellDateTime" v-model="row.createDate" v-if="showEdit[$index]" :clearable="false"></el-date-picker>
              <span v-if="!showEdit[$index]">{{row.createDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50" header-align="center">
            <template slot-scope="scope">
              <el-dropdown placement="bottom-end">
                <span class="el-dropdown-link">操作</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="editClick(scope.row.id)">编辑</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="deleteClick(scope.row.id)">删除</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" header-align="center">
            <template slot-scope="scope">
              <el-button @click.stop="onEditClick(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click.stop="onDeleteClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" header-align="center">
            <template slot-scope="{row,$index}">
              <el-button
                type="text"
                size="small"
                @click="onUpdate($index, row)"
                v-show="showEdit[$index]"
              >更新</el-button>
              <el-button
                type="text"
                size="small"
                @click="onCancel($index, row)"
                v-show="showEdit[$index]"
              >取消</el-button>
              <span>
                <el-button
                  type="text"
                  size="small"
                  @click="onEdit($index, row)"
                  v-if="!showEdit[$index]"
                >编辑</el-button>
              </span>
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
          :total="searchData.total"
        ></el-pagination>
      </div>
    </div>
    <transition name="slide-fade-l">
      <div class="searchWhere" :class="{searchWhereSuspend: !lockSearch}" v-show="showSearchWhere">
        <div class="title">
          <i class="iconfont icon-conditions"></i>
          <span class="font">筛选</span>
          <i
            @click="lockSearch=!lockSearch"
            class="iconfont"
            :class="[lockSearch?'icon-lockpage':'icon-notlockpage']"
            :title="[lockSearch?'取消锁定':'锁定']"
          ></i>
        </div>
        <div class="where">
          <div>账号</div>
          <el-input v-model="searchData.account" placeholder="请输入账号" clearable="true" size="small"></el-input>
          <addressitem v-on:setAddress="setAddressSearch" :param="searchData.address"></addressitem>
        </div>
        <div class="button">
          <el-button
            type="primary"
            icon="iconfont icon-search"
            size="medium"
            @click="getDataList(0)"
          >搜索</el-button>
        </div>
      </div>
    </transition>
    <el-dialog title="用户操作" :visible.sync="dialogUserVisible" width="600px">
      <useredit v-on:setEditUserDialog="setEditUserDialog" v-if="dialogUserVisible"></useredit>
    </el-dialog>
    <transition>
      <rightmenuitem
        :contextMenuData="contextMenuData"
        v-on:onEditData="onEditData"
        v-on:onAddData="onAddData"
        v-on:onDeleteData="onDeleteData"
      ></rightmenuitem>
    </transition>
    <div
      v-show="showSearchWhere&!lockSearch"
      @click="showSearchWhere = false"
      class="searchWhereMask"
    ></div>
  </div>
</template>
<script>
import request from "@/utils/request"
import basics from '@/utils/basics'
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
      showEdit: [], //显示编辑框
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
      selectItems: [],
      dialogUserVisible: false,
      showSearchWhere: false,
      clearShowSearch: "pageindex;pagesize;orderby;total;",
      addShowSearch: "pageindex;pagesize;orderby;total;address;",
      searchData: {
        pageIndex: 1,
        pageSize: 10,
        orderBy: "",
        account: "",
        address: "",
        addressName: "",
        total: 0
      },
      whereTags: [],
      lockSearch: false,
      citys:[]
    };
  },
  created: function() {
    if (basics.wherePage.page == "userlist") {
      this.searchData = basics.wherePage.searchWhere;
    } else {
      basics.wherePage.searchWhere = this.searchData;
    }
    for (var i = 0; i < basics.wherePage.searchWhere.pageSize; i++) {
      this.showEdit[i] = false;
    }
    request.get(basics.server + "/api/bind/getlist").then(res => {
      this.citys = res.d;
    });
  },
  mounted: function() {},
  methods: {
    onEdit: function(index, row) {
      this.showEdit[index] = true;
    },
    onUpdate: function(index, row) {
      request.post(basics.server + "/api/user/operation", row).then(res => {
        if (res.c === 0) {
          this.showEdit[index] = false;
          this.$message({
            showClose: true,
            message: "更新成功",
            type: "success"
          });
          this.onCancel(2);
        } else {
          this.$message({
            showClose: true,
            message: "操作失败",
            type: "error"
          });
        }
      });
    },
    onCancel: function(index) {
      this.getDataList(1);
      this.showEdit[index] = false;
    },
    setHeaderRowClass: function({ columnIndex }) {
      var val = "background:#EEEEEE;";
      switch (columnIndex) {
        case 0:
        case 1:
        case 7:
        case 8:
          val = val + "text-align:center;";
          break;
      }
      return val;
    },
    setCellStyle: function({ columnIndex }) {
      var val = "";
      switch (columnIndex) {
        case 0:
        case 1:
        case 7:
        case 8:
        case 9:
          val = "text-align:center;";
          break;
      }
      return val;
    },
    onClearWhere: function() {
      this.whereTags = [];
      for (var item in this.searchData) {
        if (this.clearShowSearch.indexOf(item.toLowerCase() + ";") == -1) {
          this.searchData[item] = "";
        }
      }
      this.getDataList(0);
    },
    onAddData: function() {
      alert("点击了新增" + this.selectItems[0].account);
    },
    onEditData: function() {
      alert("点击了修改" + this.selectItems[0].account);
    },
    onDeleteData: function() {
      alert("点击了删除" + this.selectItems[0].account);
    },
    onRowContextMenu: function(row, event) {
      event.preventDefault();
      this.$refs.selectList.clearSelection();
      this.$refs.selectList.toggleRowSelection(row);
      this.$refs.selectList.setCurrentRow(row);
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = { x, y };
      this.selectItems = [];
      this.selectItems.push(row);
    },
    onRowClick: function(row) {
      this.$refs.selectList.clearSelection();
      this.$refs.selectList.toggleRowSelection(row);
      this.selectItems = [];
      this.selectItems.push(row);
    },
    onSelect: function(selection, row) {
      this.selectItems = [];
      if (this.isSingle) {
        this.$refs.selectList.clearSelection();
        this.$refs.selectList.toggleRowSelection(row);
        this.$refs.selectList.setCurrentRow(row);
        this.selectItems.push(row);
      } else {
        this.selectItems = selection;
      }
    },
    onSortChange: function(column) {
      var searchorderby = "";
      if (column.order === "descending") {
        searchorderby = "desc";
      }
      basics.wherePage.searchWhere.orderBy = column.prop + " " + searchorderby;
      this.getDataList(0);
      return false;
    },
    setAddressSearch: function(obj) {
      this.searchData.address = "";
      this.searchData.addressName = "";
      if (obj) {
        this.searchData.address = obj.key;
        this.searchData.addressName = obj.text;
      }
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
        if (this.addShowSearch.indexOf(item.toLowerCase() + ";") == -1) {
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
      request.post(basics.server + "/api/user/getlist", whereData).then(res => {
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
    listRowClass({ row, rowIndex }) {
      if (this.selectItems.indexOf(row) != -1) {
        return { "background-color": "#ecf5ff" };
      }
    }
  },
  filters: {},
  computed: {},
  watch: {}
};
</script>
