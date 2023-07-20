<!--
 * @Author: zhangyang
 * @Date: 2023-07-20 11:00:42
 * @LastEditTime: 2023-07-20 15:09:18
 * @Description: tabbar 页面的默认布局
-->
<script lang="ts" setup>
const { customBarH, safeBottom } = getNavbarHeihgt();
const loadingEl = ref();

const { httpLoadingEl } = storeToRefs(useHttpLoading());

onMounted(() => {
  setTimeout(() => {
    loadingEl.value?.end();
  }, 3e3);
});
</script>
<template>
  <young-loading ref="loadingEl" />
  <young-loading-mini ref="httpLoadingEl" />
  <div class="flex flex-col" :style="{ height: `calc(100vh - ${customBarH}px - ${safeBottom}px - 44px)` }">
    <scroll-view scroll-y class="flex-1 bg-transparent">
      <slot></slot>
    </scroll-view>
    <young-tabbar :z="999" />
  </div>
</template>
