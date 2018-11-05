<template>
    <div class="infomation-edit-page">
        <form>
            <label for="user-name">姓名</label>
            <input type="text" id="user-name" v-model="user.name"/>
            <label for="user-sex">性别</label>
            <input type="text" id="user-sex" v-model="user.sex"/>
            <label for="user-address">所在地</label>
            <input type="text" id="user-address" v-model="user.address"/>
        </form>
    </div>
</template>
<script>
export default {
  name: 'Infoedit',
  data: function () {
    return {
      user: {
        name: '',
        sex: '男',
        address: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
    .infomation-edit-page {
        background-color: #fff;
        
    }
</style>

