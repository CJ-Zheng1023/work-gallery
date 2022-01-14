<template>
  <a-footer>
    <div class="footer">&copy;AfterWin</div>
  </a-footer>
</template>

<script>
import { Layout } from 'ant-design-vue'
const { Footer: AFooter } = Layout
export default {
  name: 'Footer',
  components: {
    AFooter
  }
}
</script>

<style lang="less" scoped>
.footer {
  text-align: center;
}
</style>