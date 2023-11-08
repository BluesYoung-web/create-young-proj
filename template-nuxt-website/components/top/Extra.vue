<!--
 * @Author: zhangyang
 * @Date: 2022-08-12 08:09:48
 * @LastEditTime: 2023-10-09 10:50:51
 * @Description: 顶部广告，以 ad 命名会被拦截
-->
<script lang="ts" setup>
const { img_ad, img_btn, showAd } = storeToRefs(useAdStore())

function clickBtn() {
  showAd.value = false
  console.log('todo: 点击顶部广告，功能不完善，弃用状态')
}
</script>

<template>
  <div class="w-100% h-80px relative" lt-md="h-36px">
    <img class="h-full w-full object-cover" :src="getFullServerUrl(img_ad)" alt="">
    <img
      class="btn w-200px" lt-sm="w-100px" :src="getFullServerUrl(img_btn)" referrerpolicy="no-referrer" alt=""
      @click="clickBtn"
    >
  </div>
</template>

<style scoped>
.btn {
  position: absolute;
  right: 1%;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  animation: jump 0.5s ease-in-out infinite;
  cursor: pointer;
}

@keyframes jump {
  0% {
    transform: translateY(-50%) scale(0.9);
  }

  50% {
    transform: translateY(-50%) scale(1.1);
  }

  100% {
    transform: translateY(-50%) scale(0.9);
  }
}
</style>
