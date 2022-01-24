<template>
  <div :style="style" class="tile-item">tile-item</div>
</template>

<script>
export default {
  name: 'TileItem',
  props: {
    left: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  computed: {
    style() {
      return {
        left: this.toPercent(this.left),
        top: this.toPercent(this.top),
        height: this.toPercent(this.height),
        width: this.toPercent(this.width)
      }
    }
  },
  methods: {
    toPercent(num) {
      return num * 100 + '%'
    }
  }
}
</script>

<style lang="less" scoped>
.tile-item {
  position: absolute;
}
</style>