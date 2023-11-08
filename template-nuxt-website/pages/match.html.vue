<!--
 * @Author: zhangyang
 * @Date: 2023-10-08 17:30:30
 * @LastEditTime: 2023-11-08 11:05:53
 * @Description:
-->
<script lang="ts" setup>
const bread_nav: BreadNavItem[] = [
  { title: '首页', href: '/' },
  { title: '赛事', href: '/match.html' },
]

definePageMeta({
  layout: 'tabbar',
})
</script>

<template>
  <div class="pt-20px flex justify-between text-16px lh-24px font-400 color-[#333]" lt-md="hidden">
    <BreadNav :nav-arr="bread_nav" />
  </div>
  match
</template>
