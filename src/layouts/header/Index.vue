<template>
  <a-header style="background: #fff;boxShadow: rgb(199 204 209) 0px 2px 8px">
    <div class="header">work gallery</div>
  </a-header>
</template>

<script>
import { Layout } from 'ant-design-vue'
const { Header: AHeader } = Layout
export default {
  name: 'Header',
  components: {
    AHeader
  }
}
</script>
<style lang="less" scoped>
.header {
  text-align: center;
}
</style>