<!--
 * @Author: zhangyang
 * @Date: 2022-10-25 11:54:36
 * @LastEditTime: 2022-12-07 15:33:23
 * @Description: 
-->
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