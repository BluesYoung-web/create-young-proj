<!--
 * @Author: zhangyang
 * @Date: 2023-07-20 11:00:42
 * @LastEditTime: 2023-08-25 16:22:09
 * @Description: tabbar 页面的默认布局
-->
<script lang="ts" setup>
const { customBarH, safeBottom } = getNavbarHeihgt();

</script>
<template>
  <slot name="nav"></slot>
  <young-loading />
  <young-loading-mini />
  <scroll-view scroll-y class="flex flex-col bg-transparent"
    :style="{ height: `calc(100vh - ${customBarH}px - ${safeBottom}px - 44px)` }">
    <slot></slot>
  </scroll-view>
  <young-tabbar :z="999" />
</template>
