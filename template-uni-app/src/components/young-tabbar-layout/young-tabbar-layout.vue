<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 18:04:48
 * @LastEditTime: 2023-07-19 16:49:58
 * @Description:
-->
<script lang="ts" setup>
withDefaults(defineProps<{
  scrollY?: boolean;
  bg?: string;
  top?: number | string;
}>(), {
  scrollY: true,
  bg: 'transparent',
  top: 0
});
const bottom = getNavbarHeihgt().safeBottom;
</script>

<template>
  <div class="flex flex-col" :style="{ height: `calc(100vh - ${top}px - ${bottom}px - 44px)` }">
    <scroll-view :scroll-y="scrollY" class="flex-1" :style="{ backgroundColor: bg }">
      <slot></slot>
    </scroll-view>
    <young-tabbar :z="999" />
  </div>
</template>
