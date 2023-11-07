<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-11-07 16:30:06
 * @Description:
-->
<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'

// @ts-expect-error
import locale from 'element-plus/dist/locale/zh-cn.mjs'

const app = useNuxtApp()
const { isLoading, zen_mode, zen_mode_helper } = storeToRefs(useNavStore())

app.hook('page:start', () => {
  console.log('loading...')
  isLoading.value = true
})

app.hook('page:finish', () => {
  console.log('loading end ...')
  isLoading.value = false
})

function showZenModeHelper() {
  zen_mode_helper.value = true
  setTimeout(() => {
    zen_mode_helper.value = false
  }, 1e4)
}
</script>

<template>
  <ElConfigProvider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
  <YoungLoading v-show="isLoading" />
  <young-float-ball v-show="zen_mode && !zen_mode_helper" zindex="9" top="0" icon="/logo.svg" title="显示顶部导航栏，无操作 10s 后收起" custom @click="showZenModeHelper" />
</template>

<style lang="scss">
@import '@unocss/reset/tailwind.css';
@import 'element-plus/dist/index.css';
@import 'vant/lib/index.css';
@import '~/styles/index.scss';
</style>
