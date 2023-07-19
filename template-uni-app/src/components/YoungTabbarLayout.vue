<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 18:04:48
 * @LastEditTime: 2023-07-18 18:04:49
 * @Description:
-->
<script lang="ts" setup>
withDefaults(defineProps<{
  scrollY?: boolean;
  tabbar?: boolean;
  bg?: string;
}>(), {
  scrollY: true,
  tabbar: true,
  bg: 'transparent'
});
</script>

<template>
  <scroll-view :scroll-y="scrollY" class="tabBarPageHeight" :style="{ backgroundColor: bg }">
    <slot></slot>
  </scroll-view>
  <YoungTabbar :z="tabbar ? 999 : 99" />
</template>

<style lang="scss" scoped>
.tabBarPageHeight {
  height: calc(100vh - 44px - 8px - env(safe-area-inset-bottom));
}
</style>
