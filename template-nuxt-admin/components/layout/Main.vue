<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:55:27
 * @LastEditTime: 2023-07-28 17:15:07
 * @Description:
-->
<script lang="ts" setup>
const { cachedViews, visitedViews } = storeToRefs(useTagsStore());
const route = useRoute();
const name = computed(() => route.name);
const isCached = computed(() => {
  // 无需缓存的界面
  if (route.meta.noCache) {
    return false;
  }
  const arr = visitedViews.value.map((view) => view.name);
  // 已经缓存，或者首次打开(防止二次初始化)
  return cachedViews.value.includes(name.value) || !arr.includes(name.value as unknown as string);
});
</script>

<template>
  <main class="app-main-height w-full">
    <NuxtPage :keepalive="isCached" />
  </main>
</template>

<style scoped lang="scss">
.app-main-height {
  min-height: $base-app-main-height;
  background-color: inherit;
  padding: 20px;

  @screen lt-lg {
    & {
      min-height: -webkit-calc($base-app-main-height + $base-tabs-bar-height) !important;
      min-height: calc($base-app-main-height + $base-tabs-bar-height) !important;
    }
  }
}
</style>
