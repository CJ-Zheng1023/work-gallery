<template>
  <div class="container">
    <Tile :dataSource="tiles" @change="onChange" @clickItem="onClickItem">
      <template #customRender="{ index }">
        <div style="display: flex;justify-content: center;align-items: center;height: 100%;">{{ index + 1 }}</div>
      </template>
      <template #extra>
        <a-button @click="save">提交</a-button>
      </template>
      <!-- <template #actions="{ on: { draw, merge, addRow, deleteRow, addCol, deleteCol } }">
        <a-space>
          <a-button @click="draw">绘 制</a-button>
          <a-button @click="merge">合 并</a-button>
          <a-button @click="addRow">添加行</a-button>
          <a-button @click="deleteRow">删除行</a-button>
          <a-button @click="addCol">添加列</a-button>
          <a-button @click="deleteCol">删除列</a-button>
        </a-space>
      </template> -->
    </Tile>
  </div>
</template>

<script>
import Tile from '@/components/tile'
import { message, Button as AButton, Space as ASpace } from 'ant-design-vue'
export default {
  name: 'Wall',
  components: {
    Tile,
    AButton,
    ASpace
  },
  data() {
    return {
      tiles: []
    }
  },
  mounted() {
    message.info('按住ctrl键可以执行多选操作')
    this.tiles = JSON.parse(
      `[{"key":"bf0ab90e-d9dd-449c-a74f-0d5620c158e2","rowSpan":1,"colSpan":1,"rowIndex":0,"colIndex":0},{"key":"ce71293c-1f7e-474b-828c-365c83080da4","rowSpan":1,"colSpan":1,"rowIndex":2,"colIndex":0},{"key":"df209285-1ba8-441b-a4d2-986b64da5443","rowSpan":1,"colSpan":1,"rowIndex":2,"colIndex":1},{"key":"33df2a78-d052-424a-910d-d8c83ad0d69f","rowSpan":1,"colSpan":2,"rowIndex":1,"colIndex":0},{"key":"4d5a3414-3749-48b3-a7b7-6629121da536","rowSpan":1,"colSpan":2,"rowIndex":0,"colIndex":1},{"key":"ba14d0e1-f1d5-45ff-81a6-d58fa238a7f4","rowSpan":2,"colSpan":1,"rowIndex":1,"colIndex":2}]`
    )
  },
  methods: {
    onChange({ error, list }) {
      if (error) {
        message.warn(error)
        return
      }
      this.tiles = list
    },
    onClickItem({ item, index }) {
      message.info(`点击了第${index + 1}个块`)
    },
    save() {
      const tiles = this.tiles.reduce(
        (array, item) =>
          array.concat({
            key: item.key,
            rowSpan: item.rowSpan,
            colSpan: item.colSpan,
            rowIndex: item.rowIndex,
            colIndex: item.colIndex
          }),
        []
      )
      message.info(JSON.stringify(tiles))
    }
  }
}
</script>

<style lang="less" scoped>
</style>