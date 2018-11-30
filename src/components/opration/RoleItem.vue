<template>
    <div class="roleitem">
      <el-form-item label="权限" prop="type">
         <el-checkbox-group v-model="role" @change="setReturnVal"  size="small">
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
import request from "@/utils/request"
import basics from '@/utils/basics'
export default {
  name: "roleitem",
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
    request.get(basics.server + "/api/bind/getlist").then(res => {
      this.roles = res.d;
    });
  },
  methods: {
    setReturnVal: function() {
      var val = "";
      if (this.role.length !== 0) {
        val = JSON.stringify(this.role);
      }
      this.$emit("setRole", val);
    }
  },
  watch: {
    param: function(newVal) {
      if (newVal) {
        this.role = JSON.parse(newVal);
      }
    }
  }
};
</script>

