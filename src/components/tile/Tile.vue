<template>
  <div class="tile">
    <div class="tile__menubar">
      <div class="tile__menubar-left">
        <div class="tile__form"></div>
        <div class="tile__actions"></div>
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
  props: {}
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
    height: 40px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tile__menubar-left {
      display: flex;
      align-items: center;
    }
  }
  .tile__content {
    flex-grow: 1;
    height: 0;
    border: 2px solid #777;
    background-color: #777;
    border-radius: 4px;
    .tile__content-inner {
      position: relative;
    }
  }
}
</style>