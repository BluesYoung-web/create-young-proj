<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 17:53:43
 * @LastEditTime: 2023-11-13 12:13:47
 * @Description:
-->
<route lang="yaml">
needLogin: true
layout: tabbar
navbar:
  isback: false
</route>

<script lang="ts" setup>
const { fullscreenLoading } = storeToRefs(useHttpLoading())
fullscreenLoading.value = true

setTimeout(() => {
  fullscreenLoading.value = false
}, 3e3)
</script>

<template>
  <h1 class="text-32">
    我是个人中心
  </h1>
</template>
