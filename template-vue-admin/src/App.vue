<!--
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-01-05 14:07:02
 * @Description:
-->
<script lang="ts" setup>
import locale from 'element-plus/lib/locale/lang/zh-cn';
</script>
<template>
  <ElConfigProvider :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>
