<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 18:04:48
 * @LastEditTime: 2023-07-19 11:50:40
 * @Description:
-->
<script lang="ts" setup>
import { getNavbarHeihgt } from '@/store';

withDefaults(defineProps<{
  scrollY?: boolean;
  tabbar?: boolean;
  bg?: string;
  top?: number | string;
}>(), {
  scrollY: true,
  tabbar: true,
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
    <young-tabbar :z="tabbar ? 999 : 99" />
  </div>
</template>
