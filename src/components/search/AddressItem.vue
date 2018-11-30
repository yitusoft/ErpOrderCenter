<template>
  <div class="addressitem">
      <div>地区</div>
      <el-select v-model="address" placeholder="区域" v-on:change="setReturnVal"  size="small">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
        <el-option label="成都市" value="chengdu"></el-option>
        <el-option label="郫县" value="pixian"></el-option>
      </el-select>
  </div>
</template>
<script>
import request from "@/utils/request"
import basics from '@/utils/basics'
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
      var obj;
      if(this.address)
      {
        obj = this.citys.filter(t => t.key == this.address)[0]
      }
      this.$emit("setAddress", obj);
    }
  },
  watch: {
    param: function(newVal) {
      this.address = newVal;
    }
  }
};
</script>
