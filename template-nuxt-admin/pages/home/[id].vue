<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:35:12
 * @LastEditTime: 2023-07-24 14:06:55
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  title: '工作台',
  auth: false,
  noCache: true
});

const { nick } = storeToRefs(useUserStore());
onMounted(() => {
  generateNavData();
});
</script>

<template>
  <div>
    <div class="text-4xl my-20px text-center font-bold">
      欢迎回来，{{ nick }}
    </div>
    <VanButton @click="navigateTo('/login')">Click Me</VanButton>
  </div>
</template>
