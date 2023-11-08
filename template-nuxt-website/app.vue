<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-10-27 16:31:29
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
</script>

<template>
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

body {
  background-color: #FFF;
}
</style>
