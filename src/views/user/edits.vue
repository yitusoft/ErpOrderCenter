<template>
  <div class="operationedits">
    <div class="header">
      <div class="title"><span class="title-name">用户操作</span></div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="number" v-model.number ="ruleForm.age" size="small" ></el-input>
      </el-form-item>
      <addressitem v-on:setAddress="setAddress" :param="ruleForm.address" v-if="hackReset"></addressitem>
      <el-form-item label="创建时间" required>
        <el-col :span="11">
          <el-form-item prop="createDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createDate" style="width: 100%;" size="small"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="是否有效" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <roleitem v-on:role_val="setRole" :param="ruleForm.type" v-if="hackReset"></roleitem>
      <el-form-item label="单选">
        <el-radio-group v-model="ruleForm.radioVal">
           <el-radio v-for="item in allList" :key="item.key" :value="item.key" :label="item.text" ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="多个选择">
        <el-select v-model="selectMultiple" filterable multiple placeholder="可搜索选择">
          <el-option
            v-for="item in allList"
            :key="item.key"
            :label="item.text"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">
            用户基本信息
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            配置基本信息
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third">
            角色基本信息
            </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-cascader
          placeholder="可搜索"
          :options="options"
          v-model="searchRegions"
          filterable></el-cascader>
      </el-form-item>

       <fileuploaditem 
          v-on:setFileUpload="setFileUpload" 
          :param="ruleForm.uploadFile" 
          :isAuto="false" 
          :multiple="true"
          :suffix="uploadImage" 
          type="file"  
          :size="fileSize"  
          ></fileuploaditem> 
    </el-form>
    <div class="operation">
        <el-button type="primary" @click="onSubmitForm('ruleForm')">提交</el-button>
        <!-- <el-button @click="onResetForm('ruleForm')">重置</el-button> -->
        <el-button @click="onCancel" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
import router from "@/router";
import addressitem from "@/components/opration/AddressItem.vue";
import roleitem from "@/components/opration/RoleItem.vue";
import fileuploaditem from "@/components/opration/FileUploadItem.vue";
import '@/assets/theme/edit.less'
export default {
  name: "useredits",
  components: {
    addressitem,
    roleitem,
    fileuploaditem
  },
  data:function() {
    var checkAge = (rule, value, callback) => {
      if (!value && value != 0) {
        return callback(new Error("年龄不能为空"));
      } else {
        callback();
      }
    };
    return {
      fileSize:30,
      searchRegions:[],
      activeName: 'first',
      hackReset: true,
      uploadImage:basics.uploadImage,
      allList:[],
      selectMultiple:[],
      options:[],
      ruleForm: {
        id: "",
        name: "",
        account: "",
        age: 0,
        address: "",
        createDate: "",
        status: true,
        type: "",
        radioVal:'',
        uploadFile:''
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        age: [{ validator: checkAge, trigger: "blur" }],
        address: [{ required: true, message: "请选择区域", trigger: "change" }],
        createDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        type: [
          { required: true, message: "请至少选择一个权限", trigger: "change" }
        ]
      }
    };
  },
  created: function() {
    request.get(basics.server + "/api/bind/getregion").then(res => {
          this.options = res.d;
        });
    request.get(basics.server + "/api/bind/getlist").then(res => {
          this.allList = res.d;
        });
    if (this.$route.params.id) {
      this.ruleForm.id = this.$route.params.id;
      request
        .get(basics.server + "/api/user/getmodel", {
          params: { id: this.ruleForm.id }
        })
        .then(res => {
          this.ruleForm = res.d;
        });
    }
  },
  methods: {
    setFileUpload:function(val){
      this.ruleForm.uploadFile = val;
    },
    setAddress: function(val) {
      this.ruleForm.address = val;
    },
    setRole: function(val) {
      this.ruleForm.type = val;
      this.$refs["ruleForm"].validateField("type");
    },
    onSubmitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.types = JSON.stringify(this.ruleForm.type);
          request
            .post(basics.server + "/api/user/operation", this.ruleForm)
            .then(res => {
              if (res.c === 0) {
                router.push({ name: "user-List" });
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "error"
                });
              }
            });
        } else {
          this.$message({
            showClose: true,
            message: "验证未通过",
            type: "warning"
          });
          return false;
        }
      });
    },
    setReload: function() {
      this.hackReset = false;
      this.$nextTick(() => (this.hackReset = true));
    },
    onResetForm: function(formName) {
      this.setReload();
      this.$refs[formName].resetFields();
    },
    onCancel: function() {
      router.push({ name: "user-List" });//router.go(-1);
    }
  }
};
</script>


