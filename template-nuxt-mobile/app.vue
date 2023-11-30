<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-11-29 16:57:22
 * @Description:
-->
<script lang="ts" setup>
import '@unocss/reset/tailwind-compat.css'

const app = useNuxtApp()

// !!! 这两个钩子函数不能异步调用，否则会造成页面的 useFetch 报错 !!!
app.hook('page:start', () => {
  // console.log('loading...');
  showLoading()
})
// !!! 这两个钩子函数不能异步调用，否则会造成页面的 useFetch 报错 !!!
app.hook('page:finish', () => {
  // console.log('loading end ...')
  hideLoading()
})

const title = process.server ? '' : window.__YOUNG_ENV__.VITE_TITLE
</script>

<template>
  <Title>{{ title }}</Title>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
img,
video {
  max-width: 100%;
  height: auto;
}

.reset-img img,
.reset-img video,
.reset-img svg,
.reset-img audio {
  display: initial;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px
}

::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 2em
}

::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 2em;
}

::-webkit-scrollbar-corner {
  background-color: transparent
}

:root {
  --van-nav-bar-background: #0083CE !important;
  --van-nav-bar-title-text-color: #FFFFFF !important;
  --van-nav-bar-icon-color: #fff !important;
  --van-grid-item-text-color: #111 !important;
}

html,
body {
  width: 100%;
  height: 100%;
  background: #F7F8FA;
}
</style>
