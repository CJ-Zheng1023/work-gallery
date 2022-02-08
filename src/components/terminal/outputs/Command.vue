<template>
  <div class="cmd-container">
    <div class="prompt">{{output.prompt}}</div>
    <div class="content" v-html="computedContent"></div>
  </div>
</template>
<script>
export default {
  props: ['output'],
  computed: {
    computedContent() {
      return this.output.content.replace(/ /g, '&nbsp;')
    }
  }
}
</script>
<style lang="less" scoped>
.cmd-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .prompt {
    font-weight: 500;
    margin-right: 10px;
  }
  .content {
    flex: 1;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>
