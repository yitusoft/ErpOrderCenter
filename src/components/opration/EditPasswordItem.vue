<template>
    <div class="passwordedit">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="right" label-width="90px" class="demo-ruleForm"  size="small">
            <el-form-item label="原密码"  prop="password">
                <el-input  type="password" v-model="ruleForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="newpPssword">
                <el-input type="password" v-model="ruleForm.newpPssword" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkNewpPssword">
                <el-input type="password" v-model="ruleForm.checkNewpPssword" clearable></el-input>
            </el-form-item>
        </el-form>
        <div class="operation">
        <el-button type="primary" @click="onSubmitForm('ruleForm')">提交</el-button>
        <el-button @click="onCancel(1)" type="info">取消</el-button>
        </div>
    </div>
</template>
<script>
import request from "@/utils/request"
import basics from '@/utils/basics'
export default {
  name: "editpassworditem",
  data: function() {
    var checkNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkNewpPssword");
        }
        callback();
      }
    };
    var confirmNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpPssword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        newpPssword: "",
        checkNewpPssword: ""
      },
      rules: {
        newpPssword: [
          { required: true, validator: checkNewPassword, trigger: "blur" }
        ],
        checkNewpPssword: [
          { required: true, validator: confirmNewPassword, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {},
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .get(basics.server + "/api/login/updatepassword", {
              params: this.ruleForm
            })
            .then(res => {
              if (res.c === 0) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success"
                });
                this.onCancel(2);
              }
            });
        }
      });
    },
    onCancel: function(num) {
      this.$emit("setEditPasswordDialog", num);
    }
  }
};
</script>
<style lang="less">
.passwordedit{
    margin: 0;
    padding: 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    .operation{
        /* padding: 10px 30px 10px 30px; 
        background-color: #f2f1f7;*/
        border-top: 1px solid #e6e6e6;
        text-align: right;
        min-height: 60px;
        line-height: 60px;
        padding-right: 40px;
    }
    .el-form{
        max-height: 400px;
        overflow: auto;
        .el-form-item{
            margin: 22px 20px;
        }
    }
}
</style>

