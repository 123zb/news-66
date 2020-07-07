<template>
  <div class="hm-header-wrapper">
    <div class="hm-header">
      <div class="back">
        <span @click="$router.go(-1)" class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <slot></slot>
      </div>
      <div class="extra"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.hm-header-wrapper {
  height: 40px;
  .hm-header {
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 40px;
    border-bottom: 1px solid #ccc;
    display: flex;
    line-height: 40px;
    .back,
    .extra {
      width: 40px;
      text-align: center;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
