<template>
  <div class="tile">
    <div class="tile__menubar">
      <div class="tile__menubar-left">
        <form class="tile__form">
          <div class="tile__form-item">
            <label class="tile__form-item-label">行</label>
            <input type="number" v-model="matrix.row" class="tile__form-item-input" />
          </div>
          <div class="tile__form-item">
            <label class="tile__form-item-label">列</label>
            <input type="number" v-model="matrix.column" class="tile__form-item-input" />
          </div>
        </form>
        <div class="tile__actions">
          <slot name="actions">
            <div class="tile__button-group">
              <button class="tile__button" @click="draw">绘 制</button>
              <button class="tile__button" @click="merge">合 并</button>
              <button class="tile__button" @click="addRow">添加行</button>
              <button class="tile__button" @click="deleteRow">删除行</button>
              <button class="tile__button" @click="addCol">添加列</button>
              <button class="tile__button" @click="deleteCol">删除列</button>
            </div>
          </slot>
        </div>
      </div>
      <div class="tile__menubar-right">
        <div class="tile__extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
    <div class="tile__content">
      <div class="tile__content-inner">
        <tile-item v-for="tile in sortedTiles" :key="tile.key" :left="tile.left" :top="tile.top" :height="tile.height" :width="tile.width">
        </tile-item>
      </div>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'
import TileItem from './TileItem.vue'
import { uuid, multiply } from './helpers'
const defaultFieldNames = {
  rowSpan: 'rowSpan',
  colSpan: 'colSpan',
  rowIndex: 'rowIndex',
  colIndex: 'colIndex',
  active: 'active'
}
export default {
  name: 'Tile',
  components: {
    TileItem
  },
  props: {
    dataSource: {
      default: () => [],
      type: Array
    },
    fieldNames: {
      default: () => {},
      type: Array
    },
    dataKey: {
      default: 'key',
      type: String
    }
  },
  data() {
    return {
      matrix: {
        row: 0,
        column: 0
      },
      tiles: []
    }
  },
  watch: {
    dataSource: {
      handler(newArray) {
        const { rowIndex, colIndex, rowSpan, colSpan, active } =
          this.computedFieldNames
        const obj = newArray.reduce(
          (obj, item) => {
            obj.tiles.push({
              key: item[this.dataKey],
              rowSpan: item[rowSpan],
              colSpan: item[colSpan],
              rowIndex: item[rowIndex],
              colIndex: item[colIndex],
              active: !!item[active]
            })
            obj['matrix']['row'] = Math.max(
              obj['matrix']['row'],
              item[rowIndex] + item[rowSpan]
            )
            obj['matrix']['column'] = Math.max(
              obj['matrix']['column'],
              item[colIndex] + item[colSpan]
            )
            return obj
          },
          {
            tiles: [],
            matrix: {
              row: 0,
              column: 0
            }
          }
        )
        this.tiles = obj.tiles
        this.matrix = obj.matrix
        this.calculatePosition()
      },
      immediate: true
    }
  },
  computed: {
    computedFieldNames() {
      return Object.assign({}, defaultFieldNames, this.fieldNames)
    },
    sortedTiles() {
      return sortBy(this.tiles, ['rowIndex', 'colIndex'])
    },
    isEmpty() {
      return !this.tiles.length
    },
    // 最后一行&最后一列索引(用于删除最后一行、最后一列)
    max() {
      let rowIndex = 0,
        colIndex = 0
      this.tiles.forEach(item => {
        rowIndex = Math.max(item['rowIndex'], rowIndex)
        colIndex = Math.max(item['colIndex'], colIndex)
      })
      return {
        rowIndex,
        colIndex
      }
    },
    row() {
      return this.matrix.row
    },
    column() {
      return this.matrix.column
    },
    tileHeight() {
      return this.row ? 1 / this.row : 0
    },
    tileWidth() {
      return this.column ? 1 / this.column : 0
    }
  },
  methods: {
    draw() {
      const tiles = []
      const { row, column } = this
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
          tiles.push(this.createTile(i, j))
        }
      }
      this.emitChange(null, tiles)
    },
    /**
     * 创建块
     * @param {Number} x       行索引
     * @param {Number} y       列索引
     * @param {Number} rowSpan 所占有的行
     * @param {Number} colSpan 所占有的列
     * @returns {Object}
     */
    createTile(x, y, rowSpan = 1, colSpan = 1) {
      return {
        key: uuid(),
        rowSpan,
        colSpan,
        active: false,
        rowIndex: x,
        colIndex: y
      }
    },
    /**
     * 合并块
     */
    merge() {
      if (this.isEmpty) {
        return
      }
      const { notActives, maxRow, maxCol, minRow, minCol, count } =
        this.tiles.reduce(
          (obj, tile) => {
            if (tile['active']) {
              obj['maxRow'] = Math.max(
                obj['maxRow'],
                tile['rowIndex'] + tile['rowSpan']
              )
              obj['maxCol'] = Math.max(
                obj['maxCol'],
                tile['colIndex'] + tile['colSpan']
              )
              obj['minRow'] = Math.min(obj['minRow'], tile['rowIndex'])
              obj['minCol'] = Math.min(obj['minCol'], tile['colIndex'])
              obj['count'] += tile['rowSpan'] * tile['colSpan']
            } else {
              obj['notActives'].push(tile)
            }
            return obj
          },
          {
            // 未选中的块
            notActives: [],
            // 选中区域最大的行
            maxRow: 0,
            // 选中区域最大的列
            maxCol: 0,
            // 选中区域最小的行
            minRow: Infinity,
            // 选中区域最小的列
            minCol: Infinity,
            // 实际选中块个数(未进行合并的)
            count: 0
          }
        )
      if (!count) {
        return
      }
      if ((maxRow - minRow) * (maxCol - minCol) !== count) {
        // 当选中块不能形成矩形时
        this.emitChange('无法合并选中块')
        return
      }
      const tile = this.createTile(
        minRow,
        minCol,
        maxRow - minRow,
        maxCol - minCol
      )
      this.emitChange(null, notActives.concat(tile))
    },
    emitChange(errorMessage, tiles) {
      const { dataKey, computedFieldNames } = this
      const { rowIndex, colIndex, rowSpan, colSpan, active } =
        computedFieldNames
      const list = tiles.reduce(
        (array, item) =>
          array.concat({
            [dataKey]: item.key,
            [rowIndex]: item.rowIndex,
            [colIndex]: item.colIndex,
            [rowSpan]: item.rowSpan,
            [colSpan]: item.colSpan,
            [active]: item.active
          }),
        []
      )
      this.$emit('change', { error: errorMessage, list })
    },
    /**
     * 计算块大小、位置
     */
    calculatePosition() {
      const { tileHeight, tileWidth } = this
      this.tiles.forEach(tile => {
        Object.assign(tile, {
          height: multiply(tileHeight, tile.rowSpan),
          width: multiply(tileWidth, tile.colSpan),
          left: multiply(tileWidth, tile.colIndex),
          top: multiply(tileHeight, tile.rowIndex)
        })
      })
    },
    // 添加行
    addRow() {
      if (this.isEmpty) {
        return
      }
      const { row, column } = this
      const tiles = [...this.tiles]
      for (let i = 0; i < column; i++) {
        tiles.push(this.createTile(row, i))
      }
      this.emitChange(null, tiles)
    },
    // 添加列
    addCol() {
      if (this.isEmpty) {
        return
      }
      const { row, column } = this
      const tiles = [...this.tiles]
      for (let i = 0; i < row; i++) {
        tiles.push(this.createTile(i, column))
      }
      this.emitChange(null, tiles)
    },
    // 删除行
    deleteRow() {
      const { rowIndex } = this.max
      // 当剩一行时不删除
      if (rowIndex === 0) {
        return
      }
      const { lastRowColSpan, notLastRowTiles } = this.tiles.reduce(
        (obj, tile) => {
          if (tile.rowIndex === rowIndex) {
            obj['lastRowColSpan'] += tile['colSpan']
            obj['lastRowRowSpan'] = tile['rowSpan']
          } else {
            obj['notLastRowTiles'].push(tile)
          }
          return obj
        },
        {
          lastRowColSpan: 0, // 最后一行占用的列数
          notLastRowTiles: [] // 不为最后一行的块
        }
      )
      if (lastRowColSpan !== this.column) {
        this.emitChange('删除行未对齐')
        return
      }
      this.emitChange(null, notLastRowTiles)
    },
    // 删除列
    deleteCol() {
      const { colIndex } = this.max
      // 当剩一列时不删除
      if (colIndex === 0) {
        return
      }
      const { lastColRowSpan, notLastColTiles } = this.tiles.reduce(
        (obj, tile) => {
          if (tile.colIndex === colIndex) {
            obj['lastColRowSpan'] += tile['rowSpan']
            obj['lastColColSpan'] = tile['colSpan']
          } else {
            obj['notLastColTiles'].push(tile)
          }
          return obj
        },
        {
          lastColRowSpan: 0, // 最后一列占用的行数
          notLastColTiles: [] // 不为最后一列的块
        }
      )
      if (lastColRowSpan !== this.row) {
        this.emitChange('删除列未对齐')
        return
      }
      this.emitChange(null, notLastColTiles)
    }
  }
}
</script>

<style lang="less" scoped>
.tile {
  display: flex;
  flex-flow: column;
  height: 100%;
  .tile__menubar {
    margin-bottom: 14px;
    border: 1px solid #91d5ff;
    padding: 10px 15px;
    background-color: #e6f7ff;
    border-radius: 4px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tile__menubar-left {
      display: flex;
      align-items: center;
      .tile__form {
        margin-right: 15px;
      }
    }
  }
  .tile__content {
    flex-grow: 1;
    height: 0;
    border: 2px solid rgb(68, 68, 68);
    background-color: #777;
    border-radius: 4px;
    .tile__content-inner {
      position: relative;
      height: 100%;
    }
  }
  .tile__form {
    .tile__form-item {
      display: inline-block;
      margin-right: 16px;
      .tile__form-item-label {
        display: inline-block;
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
      .tile__form-item-input {
        display: inline-block;
        width: 50px;
        border-radius: 4px;
        line-height: 1.5;
        padding: 4px 11px;
        border: 1px solid rgb(217, 217, 217);
        color: rgba(0, 0, 0, 0.65);
        height: 32px;
        outline: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:hover {
          border-color: rgb(64, 169, 255);
        }
        &:focus {
          border-color: rgb(64, 169, 255);
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }
  .tile__button-group {
    .tile__button {
      margin-right: 18px;
      background-color: #fff;
      border: 1px solid rgb(217, 217, 217);
      outline: none;
      font-size: 14px;
      line-height: 1.5;
      height: 32px;
      padding: 0 15px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      &:hover,
      &:focus {
        color: #40a9ff;
        border-color: #40a9ff;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      }
      &:active {
        color: #096dd9;
        border-color: #096dd9;
      }
    }
  }
}
</style>