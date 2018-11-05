<template>
  <div id="app">
    <router-view class="full-height"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'weixin-electron'
  }
</script>

<style>
    @import '~@/assets/css/customized.less';
  /* CSS */
  #app {
      height: 100%;
  }
</style>
