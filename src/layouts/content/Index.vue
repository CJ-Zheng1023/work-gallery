<template>
  <a-content style="margin: 24px 16px;">
    <div style="height: 100%;">
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