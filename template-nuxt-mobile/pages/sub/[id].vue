<!--
 * @Author: zhangyang
 * @Date: 2022-08-15 10:04:05
 * @LastEditTime: 2023-11-29 17:30:00
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  title: '子页面',
})
</script>

<template>
  <div>
    我是子页面📃
    <div class="w-[62.5%] mx-auto mb-80px reset-img" lt-md="w-full">
      params：
      - id: {{ $route.params.id }}
    </div>
  </div>
</template>
