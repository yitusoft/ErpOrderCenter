<template>
  <div class="useredit">
    <div class="header">
      <div style="float: left;margin-top: 5px;"><span class="title-name">用户操作</span></div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="email" label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]">

      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="number" v-model.number ="ruleForm.age" size="small" ></el-input>
      </el-form-item>
      <addressCpt v-on:address_val="setAddress" :param="ruleForm.address" v-if="hackReset"></addressCpt>
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
      <roleCpt v-on:role_val="setRole" :param="ruleForm.type" v-if="hackReset"></roleCpt>
      <el-form-item label="单选">
        <el-radio-group v-model="ruleForm.radioval">
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
          v-model="searchregions"
          filterable></el-cascader>
      </el-form-item>

       <fileuploadcpt 
          @return_val="setfileupload" 
          :param="ruleForm.uploadfile" 
          :isauto="false" 
          :multiple="true"
          :suffix="uploadimage" 
          type="file"  
          :size="filesize"  
          ></fileuploadcpt> 
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="cancelClick()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
import router from "@/router";
import addressCpt from "@/components/address.vue";
import roleCpt from "@/components/role.vue";
import fileuploadcpt from "@/components/fileupload.vue";
export default {
  name: "useredit",
  components: {
    addressCpt,
    roleCpt,
    fileuploadcpt
  },
  created: function() {
    request.get(baseConfig.server + "/api/bind/getregion").then(res => {
          this.options = res.d;
        });
    request.get(baseConfig.server + "/api/bind/getlist").then(res => {
          this.allList = res.d;
        });
    if (this.$route.params.id) {
      this.ruleForm.id = this.$route.params.id;
      request
        .get(baseConfig.server + "/api/user/getmodel", {
          params: { id: this.ruleForm.id }
        })
        .then(res => {
          this.ruleForm = res.d;
        });
    }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value && value != 0) {
        return callback(new Error("年龄不能为空"));
      } else {
        callback();
      }
    };
    return {
      filesize:30,
      searchregions:[],
      activeName: 'first',
      hackReset: true,
      uploadimage:baseConfig.uploadimage,
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
        radioval:'',
        uploadfile:''
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
  computed: {},
  methods: {
    setfileupload:function(val){
      this.ruleForm.uploadfile = val;
    },
    setAddress: function(val) {
      this.ruleForm.address = val;
    },
    setRole: function(val) {
      this.ruleForm.type = val;
      this.$refs["ruleForm"].validateField("type");
    },
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.types = JSON.stringify(this.ruleForm.type);
          request
            .post(baseConfig.server + "/api/user/operation", this.ruleForm)
            .then(res => {
              if (res.c === 0) {
                router.push({ name: "user-list" });
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
    reload: function() {
      this.hackReset = false;
      this.$nextTick(() => (this.hackReset = true));
    },
    resetForm: function(formName) {
      this.reload();
      this.$refs[formName].resetFields();
    },
    cancelClick: function() {
      router.go(-1);
    }
  }
};
</script>

