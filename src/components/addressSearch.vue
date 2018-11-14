<template>
  <div class="addresssearchCpt">
      <div>地区</div>
      <el-select v-model="address" placeholder="区域" v-on:change="returnVal()">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
        <el-option label="成都市" value="chengdu"></el-option>
        <el-option label="郫县" value="pixian"></el-option>
      </el-select>
  </div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
export default {
  name: "addresssearchCpt",
  props: {
    param: ""
  },
  data: function() {
    return {
      address: "",
      citys: []
    };
  },
  watch: {
    param: function(newVal) {
      this.address = newVal;
    }
  },
  created: function() {
    this.address = this.param;
    request.get(baseConfig.server + "/api/bind/getlist").then(res => {
      this.citys = res.d;
    });
  },
  methods: {
    returnVal: function() {
      this.$emit("addresssearch_val", this.address);
    }
  }
};
</script>
