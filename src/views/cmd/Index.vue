<template>
  <div class="container">
    <terminal />
  </div>
</template>

<script>
import Terminal from '@/components/terminal/Index.vue'
export default {
  name: 'Cmd',
  components: {
    Terminal
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0;
}
</style>