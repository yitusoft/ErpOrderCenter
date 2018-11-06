<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import baseConfig from "@/plugins/config/baseConfig";
import router from "@/router"
export default {
  name: "app",
  created() {
    if (baseConfig.currentUser == null) {
      router.push({ name: "login" });
    } else {
      router.push({ name: "home" });
    }
  }
};
</script>