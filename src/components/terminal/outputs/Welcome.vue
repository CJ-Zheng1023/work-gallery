<template>
  <div>
    <div class="stars">*****************************************</div>
    <div class="welcome">{{ output }}</div>
    <div class="stars">*****************************************</div>
  </div>
</template>
<script>
export default {
  props: ['output']
}
</script>
<style lang="less" scoped>
.welcome {
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 1;
  color: #d1b9b9;
}
.stars {
  text-align: center;
  padding: 10px 0;
  color: #d1b9b9;
}
</style>
