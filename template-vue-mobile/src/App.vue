<!--
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-02-01 12:00:31
 * @Description:
-->
<template>
  <div>
    <!-- 初始化 -->
    <Init />
    <!-- 页面 -->
    <RouterView />
  </div>
</template>
<style>
:root {
  --van-nav-bar-background: #0083CE !important;
  --van-nav-bar-title-text-color: #FFFFFF !important;
  --van-nav-bar-icon-color: #fff !important;
  --van-grid-item-text-color: #111 !important;
}

html,
body {
  width: 100%;
  height: 100%;
  background: #F7F8FA;
}
</style>