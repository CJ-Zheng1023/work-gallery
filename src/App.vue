<template>
  <config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
export default {
  components: {
    ConfigProvider
  },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100%;
}
</style>