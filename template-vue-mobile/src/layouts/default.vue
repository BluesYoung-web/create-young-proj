<!--
 * @Author: zhangyang
 * @Date: 2022-12-03 16:20:06
 * @LastEditTime: 2023-02-01 11:16:19
 * @Description:
-->
<script lang="ts" setup>
const route = useRoute();
const title = computed(() => route.meta.title || import.meta.env.VITE_TITLE);
</script>

<template>
  <VanNavBar :border="false">
    <template #title>
      <span class="text-[#FFFFFF] text-16px font-700">{{ title }}</span>
    </template>
  </VanNavBar>
  <RouterView v-bind="$attrs" />
  <VanTabbar route>
    <VanTabbarItem to="/" icon="home-o">
      <span>首页</span>
    </VanTabbarItem>
    <VanTabbarItem to="/my" icon="user-o">
      <span>我的</span>
    </VanTabbarItem>
  </VanTabbar>
</template>
