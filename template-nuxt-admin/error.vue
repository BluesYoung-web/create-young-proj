<!--
 * @Author: zhangyang
 * @Date: 2023-06-12 15:00:07
 * @LastEditTime: 2023-09-06 16:05:20
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

const NotShowError = computed(() => {
  return props.error.message === 'Request failed with status code 401'
})

onMounted(() => {
  if (process.server)
    return

  console.log(props.error, props.error.statusCode)
  if (process.dev) {
    console.log('开发模式，不自动清理')
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
  <div v-if="!NotShowError" class="flex w-full h-full flex-col justify-center items-center">
    <div class="text-5xl my-6">
      {{ error.statusCode }}
    </div>
    <div class="text-lg my-2">
      {{ error.message || error.statusMessage || '出错啦~' }}
    </div>

    <div class="mb-2">
      {{ i }}s 后自动跳转首页
    </div>
    <ElButton @click="clear">
      立即返回首页
    </ElButton>
  </div>
</template>
