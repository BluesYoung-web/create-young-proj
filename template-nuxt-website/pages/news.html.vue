<!--
 * @Author: zhangyang
 * @Date: 2023-10-08 17:27:57
 * @LastEditTime: 2023-11-08 11:04:45
 * @Description:
-->
<script lang="ts" setup>
const bread_nav: BreadNavItem[] = [
  { title: '首页', href: '/' },
  { title: '资讯', href: '/news.html' },
]

definePageMeta({
  layout: 'tabbar',
})
</script>

<template>
  <div class="flex justify-between text-16px lh-24px font-400 color-[#333] py-20px" lt-md="py-0">
    <BreadNav :nav-arr="bread_nav" />
  </div>
  <div>news list</div>
  <NuxtLink to="/news/2233.html" class="text-blue-500">
    go news detail
  </NuxtLink>
</template>
