<!--
 * @Author: zhangyang
 * @Date: 2023-07-20 11:00:42
 * @LastEditTime: 2023-08-25 16:37:12
 * @Description: tabbar 页面的默认布局
-->
<script lang="ts" setup>
const { customBarH, safeBottom } = getNavbarHeihgt();

const { pagesInfo } = storeToRefs(useSystemInfo());

const showNavBar = ref(false);
const navBarAttr = ref<ParamsObj>({});

onLoad(() => {
  const [page] = getCurrentPages();

  const pageConf = pagesInfo.value.find((p) => p.path === page.route);

  if (pageConf?.navbar) {
    showNavBar.value = true;
    navBarAttr.value = pageConf.navbar;
  }
});
</script>
<template>
  <young-navbar v-if="showNavBar" v-bind="navBarAttr" />
  <young-loading />
  <young-loading-mini />
  <scroll-view scroll-y class="flex flex-col bg-transparent"
    :style="{ height: `calc(100vh - ${customBarH}px - ${safeBottom}px - 44px)` }">
    <slot></slot>
  </scroll-view>
  <young-tabbar :z="999" />
</template>
