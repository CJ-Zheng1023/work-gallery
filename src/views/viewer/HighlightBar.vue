<template>
  <div class="hl-bar" v-if="map">
    <div @click="clickItem(key)" class="hl-bar-item" :style="{ top: key }" v-for="(colors, key) in map" :key="key">
      <div class="hl-bar-item-cell" :style="{ backgroundColor: color }" v-for="color in colors" :key="color"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HighlightBar',
  props: {
    map: {
      type: Object,
      default: null
    }
  },
  methods: {
    clickItem(percent) {
      this.$emit('scrollTo', percent)
    }
  }
}
</script>

<style lang="less" scoped>
.hl-bar {
  z-index: 2;
  position: absolute;
  right: 18px;
  top: 0;
  height: 100%;
  width: 16px;
  background-color: #e7e7e7;
  .hl-bar-item {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    cursor: pointer;
    .hl-bar-item-cell {
      flex-grow: 1;
      height: 2px;
    }
  }
}
</style>