<template>
  <div class="addressitem">
    <el-form-item label="区域" prop="address">
      <el-select v-model="param" placeholder="请选择区域" v-on:change="setReturnVal" clearable size="small">
        <el-option label="请选择" value=""></el-option>
        <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
        <el-option label="成都市" value="chengdu"></el-option>
        <el-option label="郫县" value="pixian"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import request from "@/utils/request"
import basics from '@/utils/basics'
export default {
  name: "addressitem",
  props: {
    param: ''
  },
  data: function() {
    return {
      citys: []
    };
  },
  created: function() {
    request.get(basics.server + "/api/bind/getlist").then(res => {
      this.citys = res.d;
    });
  },
  methods: {
    setReturnVal:function(){
      this.$emit('setAddress', this.param);
    }
  },
  watch:{
    param:function(newVal)
    {
      this.address=newVal;
    }
  }
};
</script>
