<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:55:27
 * @LastEditTime: 2023-07-23 15:56:16
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
  <section class="app-mian-height">
    <NuxtPage :keepalive="isCached" />
  </section>
</template>

<style scoped lang="scss">
.app-mian-height {
  min-height: $base-app-main-height;

  // padding: 20px;
  background-color: inherit;
}
</style>
