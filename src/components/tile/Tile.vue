<template>
  <div class="tile">
    <div class="tile__menubar">
      <div class="tile__menubar-left">
        <form class="tile__form">
          <div class="tile__form-item">
            <label class="tile__form-item-label">行</label>
            <input type="number" class="tile__form-item-input" />
          </div>
          <div class="tile__form-item">
            <label class="tile__form-item-label">列</label>
            <input type="number" class="tile__form-item-input" />
          </div>
        </form>
        <div class="tile__actions">
          <slot name="actions">
            <div class="tile__button-group">
              <button class="tile__button">绘 制</button>
              <button class="tile__button">合 并</button>
              <button class="tile__button">添加行</button>
              <button class="tile__button">删除行</button>
              <button class="tile__button">添加列</button>
              <button class="tile__button">删除列</button>
            </div>
          </slot>
        </div>
      </div>
      <div class="tile__menubar-right">
        <div class="tile__extra"></div>
      </div>
    </div>
    <div class="tile__content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    tiles: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      form: {
        row: 3,
        column: 3
      },
      matrix: {
        row: 3,
        column: 3
      }
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