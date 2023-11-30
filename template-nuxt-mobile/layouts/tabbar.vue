<!--
 * @Author: zhangyang
 * @Date: 2023-11-29 17:11:40
 * @LastEditTime: 2023-11-29 17:15:39
 * @Description:
-->
<script lang="ts" setup>
const route = useRoute()
const title = computed(() => route.meta.title || import.meta.env.VITE_TITLE)
</script>

<template>
  <div lg="max-w-800px mx-auto">
    <VanNavBar :border="false">
      <template #title>
        <span class="text-[#FFFFFF] text-16px font-700">{{ title }}</span>
      </template>
    </VanNavBar>
    <NuxtPage v-bind="$attrs" />
    <VanTabbar route lg="!left-50% transform max-w-800px -translate-x-50%">
      <VanTabbarItem to="/" icon="home-o">
        <span>首页</span>
      </VanTabbarItem>
      <VanTabbarItem to="/my" icon="user-o">
        <span>我的</span>
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>
