<template>
  <div id="app" style="height: 100%;">
    <router-view/>
  </div>
</template>
<script>
import basics from "@/config/basics";
import router from "@/router";
export default {
  name: "app",
  created() {
    if (basics.currentUser == null) {
      router.push({ name: "Login" });
    } else {
      router.push({ name: "Home" });
    }
  }
};
</script>