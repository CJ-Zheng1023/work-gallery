<template>
  <a-footer>
    <div class="footer">
      <a href="https://github.com/CJ-Zheng1023/work-gallery" target="_blank">&copy;CJ-Zheng</a>
    </div>
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