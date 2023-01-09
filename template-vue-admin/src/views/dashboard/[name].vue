<!--
 * @Author: zhangyang
 * @Date: 2022-10-26 09:55:45
 * @LastEditTime: 2023-01-04 19:44:05
 * @Description: 
-->
<route lang="yaml">
meta:
  title: 欢迎页
  authPath: /dashboard/index
</route>

<script lang="ts" setup>
const title = window.__YOUNG_VITE_ENV__.VITE_TITLE || '管理后台';
</script>

<template>
  <div>
    <div class="text-4xl my-20 text-center font-bold">
      欢迎使用{{ title }}
    </div>
  </div>
</template>