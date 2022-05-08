<template>
  <a-footer>
    <div class="footer">
      <a href="https://cj-zheng1023.github.io/" target="_blank">&copy;个人简历</a>
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