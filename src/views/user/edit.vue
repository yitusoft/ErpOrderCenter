<template>
  <div class="operationedit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" prop="account" >
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model.number ="ruleForm.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <addressitem v-on:setAddress="setAddress" :param="ruleForm.address" v-if="hackReset"></addressitem>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="创建时间" prop="createDate" required>
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否有效" prop="status">
            <el-switch v-model="ruleForm.status"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <roleitem v-on:setRole="setRole" :param="ruleForm.type" v-if="hackReset"></roleitem>
        </el-col>
      </el-row>
    </el-form>
    <div class="operation">
      <el-button type="primary" @click="onSubmitForm('ruleForm')">提交</el-button>
      <!-- <el-button @click="OnResetForm('ruleForm')">重置</el-button> -->
      <el-button @click="onCancel(1)" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
import addressitem from "@/components/opration/AddressItem.vue";
import roleitem from "@/components/opration/RoleItem.vue";
import "@/assets/theme/edit.less";
export default {
  name: "useredit",
  components: {
    addressitem,
    roleitem
  },
  props: {
    param: ""
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
      dialogFormVisible: true,
      hackReset: true,
      ruleForm: {
        id: "",
        name: "",
        account: "",
        age: 0,
        address: "",
        createDate: "",
        status: true,
        type: ""
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
    if (this.param) {
      this.ruleForm.id = this.param;
      this.getUserModel();
    }
  },
  methods: {
    getUserModel: function() {
      request
        .get(basics.server + "/api/user/getmodel", {
          params: { id: this.ruleForm.id }
        })
        .then(res => {
          this.ruleForm = res.d;
        });
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
                this.$message({
                  showClose: true,
                  message: "操作成功",
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
    OnResetForm: function(formName) {
      this.setReload();
      this.$refs[formName].resetFields();
    },
    onCancel: function(num) {
      this.$emit("setEditUserDialog", num);
    }
  },
  watch: {
    id: function(newVal) {
      this.ruleForm.id = newVal;
      this.getUserModel();
    }
  }
};
</script>

