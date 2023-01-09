<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:10:09
 * @LastEditTime: 2023-01-05 16:06:32
 * @Description: 侧边栏 logo 组件
-->
<template>
  <RouterLink v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/">
    <div class="i-dashicons-admin-home sidebar-logo-hide text-white" />
  </RouterLink>
  <RouterLink v-else key="expand" class="sidebar-logo-link" to="/">
    <div class="w-full text-center">{{ title }}</div>
    <code
      class="text-sm bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-900 animate-pulse">Ctrl + K 呼出快捷菜单</code>
  </RouterLink>
</template>
<script lang="ts" setup>
import { isCollapse } from '@/stores';
const title = window.__YOUNG_VITE_ENV__.VITE_TITLE ?? '小黑后台';
</script>
