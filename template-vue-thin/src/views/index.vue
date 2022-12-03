<!--
 * @Author: zhangyang
 * @Date: 2022-12-03 16:23:19
 * @LastEditTime: 2022-12-03 16:28:55
 * @Description:
-->
<route lang="yaml">
meta:
  title: 首页
</route>

<template>
  <div>
    我是首页，我会使用默认布局
    <br />
    <RouterLink class="text-blue-500 mr-2" to="/list">list 布局</RouterLink>
    <RouterLink class="text-blue-500" to="/404">空白布局</RouterLink>
  </div>
</template>
