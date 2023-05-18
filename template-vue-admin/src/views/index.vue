<!--
 * @Author: zhangyang
 * @Date: 2022-10-25 11:54:36
 * @LastEditTime: 2023-05-18 15:49:57
 * @Description: 
-->
<route lang="yaml">
meta:
  title: 入口
  auth: false
</route>

<script lang="ts" setup>
const router = useRouter();
onMounted(() => {
  router.replace('/dashboard/index');
});
onUpdated(() => {
  router.replace('/dashboard/index');
});
</script>

<template>
  <div></div>
</template>