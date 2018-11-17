<template>
  <div id="app">
    <router-view class="full-height"></router-view>
  </div>
</template>

<script>
  export default {
      created () {
          console.log('创建页面')
          if (localStorage.getItem('ck')) {
              this.$store.dispatch('getUserInfo').catch(() => {
                  this.$router.push({
                      path: '/'
                  })
              })
          }
      }
  }
</script>

<style>
    @import '~@/assets/css/customized.less';
    @import '~@/assets/css/scrollbar.less';
  /* CSS */
  #app {
      height: 100%;
  }
</style>
