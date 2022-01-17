<template>
  <a-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" :width="300" breakpoint="lg" @breakpoint="handleBreakpoint" collapsible :collapsed="collapsed" :trigger="null">
    <Logo />
    <Menu />
  </a-sider>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo.vue'
import { Layout } from 'ant-design-vue'
import { mapGetters, mapActions } from 'vuex'
const { Sider: ASider } = Layout
export default {
  name: 'Sider',
  components: {
    Menu,
    Logo,
    ASider
  },
  computed: {
    ...mapGetters('app', ['collapsed'])
  },
  methods: {
    ...mapActions('app', ['toggleCollapse']),
    handleBreakpoint(broken) {
      this.toggleCollapse(broken)
    }
  }
}
</script>

<style lang="less" scoped>
</style>