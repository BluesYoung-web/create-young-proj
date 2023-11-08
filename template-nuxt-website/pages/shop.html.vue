<!--
 * @Author: zhangyang
 * @Date: 2023-10-08 17:18:31
 * @LastEditTime: 2023-11-08 09:34:15
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  layout: 'tabbar',
})

const bread_nav = ref<BreadNavItem[]>([
  { title: '首页', href: '/' },
  { title: '商城', href: '/shop.html' },
])
</script>

<template>
  <div lt-md="pb-80px">
    <div class="py-20px flex justify-between text-16px lh-24px font-400 color-[#333]" lt-md="hidden">
      <BreadNav :nav-arr="bread_nav" />
    </div>

    shop
  </div>
</template>
