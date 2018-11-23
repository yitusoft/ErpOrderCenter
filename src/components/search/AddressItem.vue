<template>
  <div class="addressitem">
      <div>地区</div>
      <el-select v-model="address" placeholder="区域" v-on:change="setReturnVal">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
        <el-option label="成都市" value="chengdu"></el-option>
        <el-option label="郫县" value="pixian"></el-option>
      </el-select>
  </div>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
export default {
  name: "addressitem",
  props: {
    param: ""
  },
  data: function() {
    return {
      address: "",
      citys: []
    };
  },
  created: function() {
    this.address = this.param;
    request.get(basics.server + "/api/bind/getlist").then(res => {
      this.citys = res.d;
    });
  },
  methods: {
    setReturnVal: function() {
      this.$emit("setAddressSearch", this.address);
    }
  },
  watch: {
    param: function(newVal) {
      this.address = newVal;
    }
  }
};
</script>
