<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:01:21
 * @LastEditTime: 2023-07-21 17:03:03
 * @Description:
-->
<script lang="ts" setup>
const search = () => {
  showToast('todo: 实现菜单搜索');
};
</script>

<template>
  <ElButton circle @click="search" title="菜单搜索">
    <div class="i-ic-baseline-manage-search" />
  </ElButton>
</template>
