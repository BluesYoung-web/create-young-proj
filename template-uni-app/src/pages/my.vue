<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 17:53:43
 * @LastEditTime: 2023-08-01 12:07:03
 * @Description:
-->
<route lang="json">
{
  "needLogin": true,
  "layout": "tabbar"
}
</route>

<template>
  <template #nav>
    <young-navbar :isback="false" />
  </template>
  <template #default>
    <h1 class="text-32">我是个人中心</h1>
  </template>
</template>
