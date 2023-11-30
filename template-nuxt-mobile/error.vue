<!--
 * @Author: zhangyang
 * @Date: 2023-06-12 15:00:07
 * @LastEditTime: 2023-10-30 14:34:37
 * @Description:
-->
<script lang="ts" setup>
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

let timer: NodeJS.Timeout

const i = ref(5)

function clear() {
  clearError()
  clearInterval(timer)
  location.replace('/')
}

onMounted(() => {
  if (process.server)
    return

  const isDev = process.dev || window.__YOUNG_ENV__
    ? !!window.__YOUNG_ENV__.VITE_VCONSOLE
    : location.href.includes('-dev-')
      || location.href.includes('-test-')

  console.log(props.error)
  if (isDev) {
    console.log('开发模式，不自动清理')
    const srcEl = document.createElement('script')
    srcEl.src = '//g2021-cdn.laiyouxi.com/image/21Store/admin-img/vconsole.min.js'
    document.body.appendChild(srcEl)
    // @ts-expect-error
    // eslint-disable-next-line no-new
    new VConsole()
    console.log(props.error)
    return
  }
  timer = setInterval(() => {
    i.value--
    if (i.value === 0)
      clear()
  }, 1e3)
})
</script>

<template>
  <div class="flex w-full h-full flex-col justify-center items-center">
    <div class="text-5xl my-6">
      {{ error.statusCode }}
    </div>
    <div class="text-lg my-2">
      {{ error.statusMessage || error.message || '出错啦~' }}
    </div>

    <div class="mb-2">
      {{ i }}s 后自动跳转首页
    </div>
    <ElButton @click="clear">
      立即返回首页
    </ElButton>
  </div>
</template>
