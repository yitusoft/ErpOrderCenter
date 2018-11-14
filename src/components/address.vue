<template>
  <div class="addressCpt">
    <el-form-item label="区域" prop="address">
      <el-select v-model="param" placeholder="请选择区域" v-on:change="returnVal()" clearable >
        <el-option label="请选择" value=""></el-option>
        <el-option v-for="item in citys" :key="item.key" :value="item.key" :label="item.text"></el-option>
        <el-option label="成都市" value="chengdu"></el-option>
        <el-option label="郫县" value="pixian"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
export default {
  name: "addressCpt",
  props: {
    param: ''
  },
  data: function() {
    return {
      citys: []
    };
  },
  watch:{
    param:function(newVal)
    {
      this.address=newVal;
    }
  },
  created: function() {
    request.get(baseConfig.server + "/api/bind/getlist").then(res => {
      this.citys = res.d;
    });
  },
  methods: {
    returnVal:function(){
      this.$emit('address_val', this.param);
    }
  }
};
</script>
