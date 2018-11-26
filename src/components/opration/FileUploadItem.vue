<template>
    <el-form-item label="附件上传" prop="uploadfile">
        <el-upload
          class="upload-demo"
          ref="uploadfile"
          :http-request="onUploadSectionFile"
          :before-upload="onBeforeAvatarUpload"
          :before-remove="onBeforeRemove"
          :accept="suffix"
          :file-list="fileList"
          :auto-upload="isAuto"
          :multiple="multiple"
          :on-success="onSuccess"
          :on-preview="onPreview"
          >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="onSubmitUpload" v-if="!isAuto">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-form-item>
</template>
<script>
import basics from "@/config/basics";
import request from "@/plugins/processor/request";
export default {
  name: "fileupload",
  props: {
    param: "",
    isAuto: {
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
  data: function() {
    return {
      fileList: [],
      fileWriteList: []
    };
  },
  created: function() {
    if (this.param) {
      this.fileWriteList = JSON.parse(this.param);
      this.onSuccess(this.fileWriteList);
    }
  },
  methods: {
    setReturnVal: function() {
      var val = "";
      if (this.fileWriteList.length !== 0) {
        val = JSON.stringify(this.fileWriteList);
      }
      this.$emit("setFileUpload", val);
    },
    onSuccess: function(fileList) {
      this.fileList = fileList;
      this.setReturnVal();
    },
    onSubmitUpload() {
      this.$refs.uploadfile.submit();
    },
    onBeforeAvatarUpload: function(file) {
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
    onUploadSectionFile: function(param) {
      let data = new FormData();
      data.append("type", this.type); //随文件上传的其他参数
      data.append("file", param.file);
      request
        .post(basics.server + "/api/fileupload/upload", data)
        .then(res => {
          if (res.c === 0) {
            this.fileWriteList.push(res.d);
            this.onSuccess(this.fileWriteList);
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
    onPreview:function(file){
      var fileInfo =file;
      //选中列表需要执行的操作
    },
    onBeforeRemove(file) {
      const index = this.fileWriteList.indexOf(file);
      this.fileWriteList.splice(index, 1);
    }
  },
  watch: {
    param: function(newVal) {
      if (newVal) {
        this.fileWriteList = JSON.parse(newVal);
        this.onSuccess(this.fileWriteList);
      }
    }
  }
};
</script>

