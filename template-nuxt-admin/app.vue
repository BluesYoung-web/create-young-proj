<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-07-21 17:58:29
 * @Description:
-->
<script lang="ts" setup>
import 'element-plus/dist/index.css';
import { ElConfigProvider } from 'element-plus';
// @ts-ignore
import locale from 'element-plus/dist/locale/zh-cn.mjs';

const app = useNuxtApp();
const { isLoading } = storeToRefs(useNavStore());

app.hook('page:start', () => {
  console.log('loading...');
  isLoading.value = true;
});

app.hook('page:finish', () => {
  console.log('loading end ...');
  isLoading.value = false;
});
</script>

<template>
  <ElConfigProvider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
  <YoungLoading v-show="isLoading" />
</template>

<style lang="scss">
@import '~/styles/index.scss';
</style>

