<!--
 * @Author: zhangyang
 * @Date: 2022-12-03 16:21:10
 * @LastEditTime: 2023-02-01 11:24:56
 * @Description:
-->
<script lang="ts" setup>
const route = useRoute();
const title = computed(() => route.meta.title || import.meta.env.VITE_TITLE);
</script>

<template>
  <VanNavBar :border="false" left-arrow @click-left="$router.back()">
    <template #title>
      <span class="text-[#FFFFFF] text-16px font-700">{{ title }}</span>
    </template>
  </VanNavBar>
  <RouterView v-bind="$attrs" />
</template>

