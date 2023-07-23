<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:35:12
 * @LastEditTime: 2023-07-23 16:24:31
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  title: '工作台',
  auth: false,
  noCache: true
});

const { nick } = storeToRefs(useUserStore());
console.log('init', nick.value);
</script>

<template>
  <div>
    <div class="text-4xl my-20 text-center font-bold">
      欢迎回来，{{ nick }}
    </div>
    <VanButton @click="navigateTo('/login')">Click Me</VanButton>
  </div>
</template>
