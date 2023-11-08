<!--
 * @Author: zhangyang
 * @Date: 2023-10-08 14:16:12
 * @LastEditTime: 2023-10-20 11:26:00
 * @Description:
-->
<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  back?: boolean
  fixed?: boolean
  bg?: string
  color?: string
}>(), {
  back: true,
  fixed: true,
  bg: 'white',
  color: 'black',
})

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
  <VanConfigProvider
    :theme-vars="{
      navBarBackground: bg,
      navBarIconColor: color,
    }"
  >
    <VanNavBar
      v-bind="$attrs" md="!hidden" :fixed="fixed" :title="title" :placeholder="false" :z-index="10"
      safe-area-inset-top
    >
      <!-- 内嵌子页面进入，不展示返回按钮 -->
      <template v-if="!$route.query.sub && back" #left>
        <div class="i-bxs:chevron-left text-xl" @click="backFn" />
      </template>
    </VanNavBar>
  </VanConfigProvider>
</template>
