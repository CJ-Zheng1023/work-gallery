<template>
  <div :style="style" :class="['tile-item', { 'tile-item--active': active }]">
    <slot></slot>
  </div>
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
    },
    active: {
      type: Boolean,
      default: false
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
  user-select: none;
  z-index: 1;
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  background-color: rgb(94, 94, 94);
  border: 1px solid rgb(136, 136, 136);
  box-shadow: 0 0 5px #444 inset;
  color: #9bca63;
  &:hover {
    box-shadow: 0 0 10px #000;
    z-index: 2;
    border: 1px solid #aaa;
  }
  &.tile-item--active {
    box-shadow: 0 0 5px #000 inset;
    background-color: #555;
  }
}
</style>