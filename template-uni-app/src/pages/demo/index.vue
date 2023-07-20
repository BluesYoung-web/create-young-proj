<!--
 * @Author: zhangyang
 * @Date: 2023-07-20 15:13:57
 * @LastEditTime: 2023-07-20 15:20:26
 * @Description:
-->
<script lang="ts" setup>
const testGet = async () => {
  const res = await apis.get.getByUserName('BluesYoung-web');
  console.log("🚀 ~ file: index.vue:12 ~ test ~ res:", res);
};

const testPost = async () => {
  await apis.post.createRepo('BluesYoung-web');
};
</script>

<template>
  <young-navbar />
  <h1 class="text-32">我是子页面 demo</h1>

  <button @click="testGet">点我测试 Get 请求</button>
  <button @click="testPost">点我测试 Post 请求</button>
</template>
