<!--
 * @Author: zhangyang
 * @Date: 2022-10-27 11:32:57
 * @LastEditTime: 2023-01-04 19:42:03
 * @Description: 
-->
<route lang="yaml">
meta:
  title: 403
</route>

<script lang="ts" setup>
import { router } from '@/modules/1-router';
import { useUserStore, useNavStore, removeToken } from '@/stores';

const loginOut = async () => {
  removeToken();
  useUserStore().reset();
  useNavStore().reset();
  router.replace('/base/login');
};
</script>

<template>
  <div class="mt-20">
    <ElResult icon="error" title="403 禁止访问" sub-title="总有些门是对你关闭的" />

    <div class="text-center">
      <ElButton type="primary" @click="loginOut">重新登录</ElButton>
    </div>
  </div>
</template>