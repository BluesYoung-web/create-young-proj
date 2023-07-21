<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 12:03:00
 * @LastEditTime: 2023-07-21 12:06:50
 * @Description:
-->
<script setup lang="ts">
const fullYear = new Date().getFullYear();
</script>

<template>
  <div class="layout-footer-container">
    Copyright
    &copy;
    {{ fullYear }} - Current
  </div>
</template>

<style lang="scss" scoped>
.layout-footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $base-app-footer-height;
  padding: 0 20px;
  color: rgb(0 0 0 / 45%);
  background: var(--el-color-white);
  border-top: 1px dashed #dcdfe6;
}
</style>
