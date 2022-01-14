<template>
  <div class="sider">
    <Logo />
    <Menu />
  </div>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo.vue'
export default {
  name: 'Sider',
  components: {
    Menu,
    Logo
  }
}
</script>

<style lang="less" scoped>
</style>