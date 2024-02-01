<!--
 * @Author: zhangyang
 * @Date: 2023-07-19 12:12:29
 * @LastEditTime: 2024-02-01 11:15:49
 * @Description:
-->
<script lang="ts" setup>
withDefaults(defineProps<{
  /**
   * 加载中的动图
   */
  loadingGif?: string
  /**
   * 文本提示
   */
  tip?: string
}>(), {
  // #ifdef MP-WEIXIN
  // @ts-expect-error
  loadingGif: __wxConfig.accountInfo.icon,
  // #endif
  tip: '加载中...',
})

const { fullscreenLoading } = storeToRefs(useHttpLoading())
</script>

<template>
  <view
    v-show="fullscreenLoading"
    class="w100vw h100vh fixed left-0 top-0 z-999999 bg-white flex flex-col items-center justify-center"
  >
    <image v-if="loadingGif" :src="loadingGif" class="w140rpx h140rpx mb-32rpx" />
    <text class="text-[#999] text-24rpx leading-36rpx">
      {{ tip }}
    </text>
  </view>
</template>
