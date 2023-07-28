<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:35:12
 * @LastEditTime: 2023-07-28 11:34:29
 * @Description:
-->
<script lang="ts" setup>
definePageMeta({
  title: '工作台',
  auth: false,
  noCache: true
});

const { nick } = storeToRefs(useUserStore());
const { nav_arr } = storeToRefs(useNavStore());

onMounted(() => {
  nav_arr.value.length === 0 && generateNavData();
});
</script>

<template>
  <div>
    <div class="text-4xl my-20px text-center font-bold">
      欢迎回来，{{ nick }}
    </div>
  </div>
</template>
