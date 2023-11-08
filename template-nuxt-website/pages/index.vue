<!--
 * @Author: zhangyang
 * @Date: 2023-09-21 16:38:58
 * @LastEditTime: 2023-11-08 09:54:17
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  layout: 'home',
  full: true,
})

const [
  { data: bdata },
] = await Promise.all([
  useFetch('/api/get_home_banner'),
])

const banners = ref<BannerItem[]>([])

if (!bdata.value)
  throw createError('数据获取失败')

banners.value = bdata.value
</script>

<template>
  <YoungBanner v-if="banners.length > 0" :banners="banners" preload />
</template>
