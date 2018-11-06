<template>
<div class="useredit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="账号" prop="account">
    <el-input v-model="ruleForm.account"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input type="number" v-model.number ="ruleForm.age"></el-input>
  </el-form-item>
  <el-form-item label="区域" prop="address">
    <el-select v-model="ruleForm.address" placeholder="请选择活动区域">
      <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
      <el-option label="成都市" value="chengdu"></el-option>
      <el-option label="郫县" value="pixian"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="创建时间" required>
    <el-col :span="11">
      <el-form-item prop="createDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="是否有效" prop="status">
    <el-switch v-model="ruleForm.status"></el-switch>
  </el-form-item>
  <el-form-item label="权限" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox v-for="item in roles" :key="item.key" :value="item.id" :label="item.value" name="type"></el-checkbox>
      <el-checkbox label="管理员" name="type"></el-checkbox>
      <el-checkbox label="人员管理" name="type"></el-checkbox>
      <el-checkbox label="权限管理" name="type"></el-checkbox>
      <el-checkbox label="菜单管理" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
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
export default {
  name: "useredit",
  created: function() {
    this.ruleForm.id = this.$route.params.id;
    request.get(baseConfig.server + "/api/bind/getlist").then(res => {
      this.citys = res.d;
      this.roles = res.d;
    });
    if (this.ruleForm.id) {
      request.get(baseConfig.server + "/api/user/getmodel", {params: { id: this.ruleForm.id }}).then(res => {
          this.ruleForm = res.d;
          this.ruleForm.type=[];
          if(this.ruleForm.types)
          {
            this.ruleForm.type=JSON.parse(this.ruleForm.types);
          }
        });
    }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      } else {
        callback();
      }
    };
    return {
      citys: [],
      roles: [],
      ruleForm: {
        id: "",
        name: "",
        account: "",
        age: 0,
        address: "",
        createDate: "",
        status: true,
        types: "",
        type: []
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
        region: [{ required: true, message: "请选择区域", trigger: "change" }],
        createDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个权限",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.types = JSON.stringify(this.ruleForm.type);
          request.post(baseConfig.server + "/api/user/operation", this.ruleForm).then(res => {
              //res.$message('操作成功')
              if (res.c === 0) {
                router.push({ name: "user-list" });
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelClick: function() {
      router.push({ name: "user-list" });
    }
  }
};
</script>

