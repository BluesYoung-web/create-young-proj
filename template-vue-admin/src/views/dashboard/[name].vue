<!--
 * @Author: zhangyang
 * @Date: 2022-10-26 09:55:45
 * @LastEditTime: 2023-05-18 15:50:31
 * @Description: 
-->
<route lang="yaml">
meta:
  title: 欢迎页
  auth: false
</route>

<script lang="ts" setup>
import { generateNavData } from '@/modules/4-auth';

const title = window.__YOUNG_VITE_ENV__.VITE_TITLE || '管理后台';

// 每次进入直接拉取最近的菜单数据，同时登录过期时也可触发登录
generateNavData(true);
</script>

<template>
  <div>
    <div class="text-4xl my-20 text-center font-bold">
      欢迎使用{{ title }}
    </div>
  </div>
</template>