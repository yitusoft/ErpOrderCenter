<template>
<div class="userlist">
    <div class="searchwhere">
        <el-form :inline="true" :model="whereData" class="demo-form-inline">
        <el-form-item label="账号">
            <el-input v-model="whereData.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="地区">
            <el-select v-model="whereData.address" placeholder="地区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" >查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="addClick()">新增</el-button>
        </el-form-item>
        </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="account" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchData.pageindex"
            :page-sizes="[2, 20, 30, 40]" :page-size="searchData.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="searchData.total">
        </el-pagination>
    </div>
    <!-- <useredit></useredit> -->
</div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
import router from "@/router"
import useredit from '@/views/user/edit.vue'

export default {
    name: "userlist",
    components: {
        useredit
    },
    created: function () {
        this.getUserList();
    },
    data: function () {
        return {
            tableData: [],
            whereData:{
                account:'',
                address:''
            },
            searchData:{
                pageindex: 1,
                pageSize: 2,
                orderBy: "",
                account:'',
                address:'',
                total: 0
            }
        };
    },
    methods: {
        getUserList: function () {
            request.get(baseConfig.server + "/api/user/getlist", { params: this.pageParms }).then(res => {
                this.tableData = res.d;
                this.searchData.total =res.t;
            });
        },
        editClick: function (id) {
            router.push({ name: 'user-edit', params: { id: id } })
        },
        addClick: function () {
            router.push({ name: 'user-edit'})
        },
        handleSizeChange(val) {
            this.searchData.pageSize = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            this.searchData.pageindex = val;
            this.getUserList();
        }
    }
};
</script>
<style lang="less">
.userlist{height: 100%;}
</style>
