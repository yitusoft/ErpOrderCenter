<template>
  <div class="useredits">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="number" v-model.number ="ruleForm.age"></el-input>
      </el-form-item>
      <addressCpt v-on:address_val="setAddress" :param="ruleForm.address" v-if="hackReset"></addressCpt>
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
      <roleCpt v-on:role_val="setRole" :param="ruleForm.type" v-if="hackReset"></roleCpt>
      <el-form-item style="text-align: right;margin-right: 50px;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        <el-button @click="cancelClick()" type="info">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
import addressCpt from "@/components/address.vue";
import roleCpt from "@/components/role.vue";
export default {
  name: "useredit",
  components: {
    addressCpt,
    roleCpt
  },
  created: function() {
    if (this.$route.params.id) {
      this.ruleForm.id = this.$route.params.id;
      request.get(baseConfig.server + "/api/user/getmodel", {params: { id: this.ruleForm.id }}).then(res => {
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
      dialogFormVisible:true,
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
        type: [{required: true,message: "请至少选择一个权限",trigger: "change"}]
      }
    };
  },
  computed: {},
  methods: {
    setAddress: function(val) {
      this.ruleForm.address = val;
    },
    setRole: function(val) {
      this.ruleForm.type = val;
      this.$refs['ruleForm'].validateField('type');
    },
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.types = JSON.stringify(this.ruleForm.type);
          request.post(baseConfig.server + '/api/user/operation', this.ruleForm).then(res => {
              if (res.c === 0) {
                this.$emit("dialog_op",2);
                this.$message({showClose: true,message: '操作成功',type: 'success'});
              } else {
                this.$message({showClose: true,message: '操作失败',type: 'error'});
              }
            });
        } else {
          this.$message({showClose: true,message: '验证未通过',type: 'warning'});
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
    replacement: function() {
    },
    cancelClick: function() {
      this.$emit("dialog_op",1);
     //this.$root.dialogFormVisible = false
      //router.go(-1);
    }
  }
};
</script>

