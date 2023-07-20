<!--
 * @Author: zhangyang
 * @Date: 2023-07-20 10:55:54
 * @LastEditTime: 2023-07-20 15:40:22
 * @Description: todo: 默认布局，按需调整
-->
<script lang="ts" setup>
const { httpLoadingEl } = storeToRefs(useHttpLoading());
const { pagesInfo } = storeToRefs(useSystemInfo());

onLoad(() => {
  const [page] = getCurrentPages();

  const pageConf = pagesInfo.value.find((p) => p.path === page.route);
  if (pageConf && pageConf.needLogin) {
    console.log('todo: 这个页面需要登录，进行登录条件判断');
  }
});
</script>

<template>
  <young-loading-mini ref="httpLoadingEl" />
  <slot />
</template>
