<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 09:27:14
 * @LastEditTime: 2023-09-15 15:19:40
 * @Description:
-->
<script setup lang="ts">
definePageMeta({
  noCache: true,
})

useTabNoCache(() => {
  navigateTo({
    path: '/home/index',
    replace: true,
  })
})
</script>

<template>
  <div />
</template>
