<template>
  <div id="app">
    <router-view class="full-height"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'weixin-electron'
    // mustFixed name 去掉，不用设置也可以
  }
</script>

<style>
    @import '~@/assets/css/customized.less';
  /* CSS */
  #app {
      height: 100%;
  }
</style>
