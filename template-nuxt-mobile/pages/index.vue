<!--
 * @Author: zhangyang
 * @Date: 2023-09-21 16:38:58
 * @LastEditTime: 2023-11-29 17:16:58
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  title: '首页',
  layout: 'tabbar',
  auth: false,
})
</script>

<template>
  <div>
    我是首页
    <NuxtLink to="/sub/index" class="text-purple-500">
      进入子页面
    </NuxtLink>
  </div>
</template>
