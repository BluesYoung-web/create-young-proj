<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 11:23:36
 * @LastEditTime: 2023-11-15 11:04:49
 * @Description:
-->
<route lang="yaml">
needLogin: true
layout: tabbar
navbar:
  isback: false
</route>

<script lang="ts" setup>
async function testGet() {
  const res = await apis.get.getByUserName('BluesYoung-web')
  console.log('🚀 ~ file: index.vue:12 ~ test ~ res:', res)
}

async function testPost() {
  await apis.post.createRepo('BluesYoung-web')
}

const { fullscreenLoading } = storeToRefs(useHttpLoading())
fullscreenLoading.value = true

const netWorkStatus = useNetwork()

setTimeout(() => {
  fullscreenLoading.value = false
}, 3e3)
</script>

<template>
  <h1 class="text-32">
    我是页面
  </h1>
  <view class="uni-primary">
    主色
  </view>
  <view class="uni-success">
    成功色
  </view>
  <view class="uni-warning">
    警告色
  </view>
  <view class="uni-error">
    错误色
  </view>

  <button @click="testGet">
    点我测试 Get 请求
  </button>
  <button @click="testPost">
    点我测试 Post 请求
  </button>

  {{
    netWorkStatus
  }}

  <uni-card
    title="基础卡片" sub-title="副标题" extra="额外信息"
    thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" @click="to(Pages.测试子页面)"
  >
    <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
  </uni-card>
</template>
