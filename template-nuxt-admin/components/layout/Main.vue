<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:55:27
 * @LastEditTime: 2023-09-15 15:18:09
 * @Description:
-->
<template>
  <main class="app-main-height w-full">
    <NuxtPage keepalive />
  </main>
</template>

<style scoped lang="scss">
.app-main-height {
  min-height: $base-app-main-height;
  background-color: inherit;
  padding: 20px;

  @screen lt-lg {
    & {
      min-height: -webkit-calc($base-app-main-height + $base-tabs-bar-height) !important;
      min-height: calc($base-app-main-height + $base-tabs-bar-height) !important;
    }
  }
}
</style>
