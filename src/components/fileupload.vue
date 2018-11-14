<template>
    <el-form-item label="附件上传" prop="uploadfile">
        <el-upload
          class="upload-demo"
          ref="uploadfile"
          :http-request="uploadSectionFile"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeremove"
          :accept="suffix"
          :file-list="filelist"
          :auto-upload="isauto"
          :multiple="multiple"
          :on-success="onsuccess"
          :on-preview="onpreview"
          >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="!isauto">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-form-item>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import request from "@/plugins/config/requestProcessor";
export default {
  name: "fileupload",
  props: {
    param: "",
    isauto: {
      default: true
    },
    type: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    size: {
      default: 30
    },
    multiple: {
      default: true
    }
  },
  created: function() {
    if (this.param) {
      this.filewritelist = JSON.parse(this.param);
      this.onsuccess(this.filewritelist);
    }
  },
  watch: {
    param: function(newVal) {
      if (newVal) {
        this.filewritelist = JSON.parse(newVal);
        this.onsuccess(this.filewritelist);
      }
    }
  },
  data: function() {
    return {
      filelist: [],
      filewritelist: []
    };
  },
  methods: {
    returnVal: function() {
      var val = "";
      if (this.filewritelist.length !== 0) {
        val = JSON.stringify(this.filewritelist);
      }
      this.$emit("return_val", val);
    },
    onsuccess: function(fileList) {
      this.filelist = fileList;
      this.returnVal();
    },
    submitUpload() {
      this.$refs.uploadfile.submit();
    },
    beforeAvatarUpload: function(file) {
      const ext = file.name.substring(file.name.indexOf("."));
      const bl = this.suffix.indexOf(ext) > 0;
      const blsize = file.size / 1024 / 1024 < this.size;
      if (!bl) {
        this.$message({
          showClose: true,
          message: "上传格式只能为" + this.uploadsuffix + "格式!",
          type: "error"
        });
      }
      if (!blsize) {
        this.$message({
          showClose: true,
          message: "上传附件大小不能超过 " + this.size + "MB!",
          type: "error"
        });
      }
      return bl && blsize;
    },
    uploadSectionFile: function(param) {
      let data = new FormData();
      data.append("type", this.type); //随文件上传的其他参数
      data.append("file", param.file);
      request
        .post(baseConfig.server + "/api/fileupload/upload", data)
        .then(res => {
          if (res.c === 0) {
            this.filewritelist.push(res.d);
            this.onsuccess(this.filewritelist);
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "上传失败",
              type: "error"
            });
          }
        });
    },
    onpreview:function(file){
      
    },
    beforeremove(file) {
      const index = this.filewritelist.indexOf(file);
      this.filewritelist.splice(index, 1);
    }
  }
};
</script>

