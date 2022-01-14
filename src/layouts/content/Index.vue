<template>
  <a-content style="margin: 24px 16px;backgroundColor: #fff;boxShadow: rgb(199 204 209) 0px 2px 8px">
    <div style="height: 100%;padding: 24px;overflow-y: auto;">
      <router-view />
    </div>
  </a-content>
</template>

<script>
import { Layout } from 'ant-design-vue'
const { Content: AContent } = Layout
export default {
  name: 'Content',
  components: {
    AContent
  }
}
</script>

<style lang="less" scoped>
</style>