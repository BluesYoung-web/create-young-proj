<!--
 * @Author: zhangyang
 * @Date: 2023-07-19 12:12:29
 * @LastEditTime: 2023-07-19 14:27:31
 * @Description:
-->
<script lang="ts" setup>
withDefaults(defineProps<{
  /**
   * 加载中的动图
   */
  loadingGif?: string;
  /**
   * 文本提示
   */
  tip?: string;
}>(), {
  loadingGif: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
  tip: '加载中...'
});

const loading = ref(true);

const start = () => loading.value = true;
const stop = () => loading.value = false;

defineExpose({
  start,
  stop
});
</script>
<template>
  <view v-if="loading"
    class="w100vw h100vh fixed left-0 top-0 z-999999 bg-white flex flex-col items-center justify-center">
    <image :src="loadingGif" class="w240rpx h240rpx mb-32rpx" />
    <text class="text-[#999] text-24rpx leading-36rpx">{{ tip }}</text>
  </view>
</template>
