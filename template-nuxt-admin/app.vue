<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-07-26 10:26:50
 * @Description:
-->
<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'

// @ts-expect-error
import locale from 'element-plus/dist/locale/zh-cn.mjs'

const app = useNuxtApp()
const { isLoading } = storeToRefs(useNavStore())

app.hook('page:start', () => {
  console.log('loading...')
  isLoading.value = true
})

app.hook('page:finish', () => {
  console.log('loading end ...')
  isLoading.value = false
})
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
@import '@unocss/reset/tailwind.css';
@import 'element-plus/dist/index.css';
@import 'vant/lib/index.css';
@import '~/styles/index.scss';
</style>
