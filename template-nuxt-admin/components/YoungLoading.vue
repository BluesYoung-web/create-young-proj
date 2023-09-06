<!--
 * @Author: zhangyang
 * @Date: 2023-07-07 11:57:22
 * @LastEditTime: 2023-07-26 10:42:39
 * @Description:
-->
<template>
  <div class="w-100vw h-100vh flex justify-center items-center bg-[#333] opacity-80 fixed top-0 z-999999">
    <svg class="nuxt-spa-loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 25" fill="none" width="80">
      <path d="M24.236 22.006h10.742L25.563 5.822l-8.979 14.31a4 4 0 0 1-3.388 1.874H2.978l11.631-20 5.897 10.567" />
    </svg>
  </div>
</template>

<style>
.nuxt-spa-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.nuxt-spa-loading>path {
  fill: none;
  stroke: #00DC82;
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 128;
  stroke-dashoffset: 128;
  animation: nuxt-spa-loading-move 3s linear infinite
}

@keyframes nuxt-spa-loading-move {
  100% {
    stroke-dashoffset: -128
  }
}
</style>
