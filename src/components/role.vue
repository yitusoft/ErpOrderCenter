<template>
    <div class="roleCpt">
      <el-form-item label="权限" prop="type">
         <el-checkbox-group v-model="role" @change="returnVal()" >
            <el-checkbox v-for="item in roles" :key="item.key" :value="item.id" :label="item.value" name="type"></el-checkbox>
            <el-checkbox label="管理员" name="type"></el-checkbox>
            <el-checkbox label="人员管理" name="type"></el-checkbox>
            <el-checkbox label="权限管理" name="type"></el-checkbox>
            <el-checkbox label="菜单管理" name="type"></el-checkbox>
          </el-checkbox-group>   
      </el-form-item>
    </div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
export default {
  name: "roleCpt",
  props: {
    param: ""
  },
  data: function() {
    return {
      role: [],
      roles: []
    };
  },
  created: function() {
    if (this.param) {
      this.role = JSON.parse(this.param);
    }
    request.get(baseConfig.server + "/api/bind/getlist").then(res => {
      this.roles = res.d;
    });
  },
  watch: {
    param: function(newVal) {
      if (newVal) {
        this.role = JSON.parse(newVal);
      }
    }
  },
  methods: {
    returnVal: function() {
      var val = "";
      if (this.role.length !== 0) {
        val = JSON.stringify(this.role);
      }
      this.$emit("role_val", val);
    }
  }
};
</script>

