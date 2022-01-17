<template>
  <a-header style="background: #fff;boxShadow: rgb(199 204 209) 0px 2px 8px;position: relative;">
    <div class="header">work gallery</div>
    <div class="collapse-icon" @click="handleCollapse">
      <template v-if="collapsed">
        <Icon type="menu-unfold" />
      </template>
      <template v-else>
        <Icon type="menu-fold" />
      </template>
    </div>
  </a-header>
</template>

<script>
import { Layout, Icon } from 'ant-design-vue'
import { mapGetters, mapActions } from 'vuex'
const { Header: AHeader } = Layout
export default {
  name: 'Header',
  components: {
    AHeader,
    Icon
  },
  computed: {
    ...mapGetters('app', ['collapsed'])
  },
  methods: {
    ...mapActions('app', ['toggleCollapse']),
    handleCollapse() {
      this.toggleCollapse(!this.collapsed)
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  text-align: center;
}
.collapse-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>