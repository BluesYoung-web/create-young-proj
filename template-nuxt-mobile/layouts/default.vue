<!--
 * @Author: zhangyang
 * @Date: 2023-09-27 14:15:48
 * @LastEditTime: 2023-11-29 17:19:17
 * @Description:
-->
<script lang="ts" setup>
const route = useRoute()
const title = computed(() => route.meta.title || import.meta.env.VITE_TITLE)

const router = useRouter()
function backFn() {
  if (history.length === 1) {
    console.log('扫码直接进入, 返回直接回首页')
    router.replace('/')
  }
  else {
    router.back()
  }
}
</script>

<template>
  <div lg="max-w-800px mx-auto">
    <VanNavBar :border="false" left-arrow @click-left="backFn">
      <template #title>
        <span class="text-[#FFFFFF] text-16px font-700">{{ title }}</span>
      </template>
    </VanNavBar>
    <NuxtPage v-bind="$attrs" />
  </div>
</template>
