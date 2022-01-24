<template>
  <div style="height: 100%">
    <Tile :dataSource="tiles" @change="onChange"></Tile>
  </div>
</template>

<script>
import Tile from '@/components/tile'
export default {
  name: 'Wall',
  components: {
    Tile
  },
  data() {
    return {
      tiles: []
    }
  },
  methods: {
    onChange({ error, list }) {
      if (error) {
        this.$message.warn(error)
        return
      }
      this.tiles = list
    }
  }
}
</script>

<style lang="less" scoped>
</style>