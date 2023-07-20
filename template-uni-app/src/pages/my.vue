<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 17:53:43
 * @LastEditTime: 2023-07-19 11:56:45
 * @Description:
-->
<route lang="json">
{
  "needLogin": true
}
</route>

<script lang="ts" setup>
onLoad(() => {
  uni.hideTabBar();
});
</script>
<template>
  <div>
    <uni-nav-bar status-bar :border="false" title="个人中心" />
    <young-tabbar-layout>
      <h1 class="text-32">我是页面</h1>
      <view class="uni-primary">主色</view>
      <view class="uni-success">成功色</view>
      <view class="uni-warning">警告色</view>
      <view class="uni-error">错误色</view>


      <uni-card title="基础卡片" sub-title="副标题" extra="额外信息"
        thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
        <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
      </uni-card>
    </young-tabbar-layout>
  </div>
</template>
