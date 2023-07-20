<!--
 * @Author: zhangyang
 * @Date: 2023-07-20 14:48:35
 * @LastEditTime: 2023-07-20 15:09:28
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
  loadingGif: 'https://api.iconify.design/eos-icons:bubble-loading.svg?color=%23e80d19',
  tip: '拼命加载中...'
});

const loading = ref(false);

const start = () => loading.value = true;
const end = () => loading.value = false;

defineExpose({
  start,
  end
});
</script>
<template>
  <view v-if="loading"
    class="w100vw h100vh fixed left-0 top-0 z-999998 bg-[#333] opacity-90 flex flex-col items-center justify-center">
    <image :src="loadingGif" class="w240rpx h240rpx mb-32rpx" />
    <text class="text-[#fff] text-24rpx leading-36rpx">{{ tip }}</text>
  </view>
</template>
