<template>
  <div>
    <span>{{user_name}}，你好！</span>
    <el-carousel indicator-position="outside" style="height: 100%;">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "Welcome",
    data() {
      return {
        user_name: JSON.parse(window.sessionStorage.getItem("user"))["user_name"]
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
