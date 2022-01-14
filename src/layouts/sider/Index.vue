<template>
  <a-sider breakpoint="lg" collapsible v-model="collapsed" :trigger="null">
    <Logo />
    <Menu />
  </a-sider>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo.vue'
import { Layout } from 'ant-design-vue'
const { Sider: ASider } = Layout
export default {
  name: 'Sider',
  data() {
    return {
      collapsed: false
    }
  },
  components: {
    Menu,
    Logo,
    ASider
  }
}
</script>

<style lang="less" scoped>
</style>