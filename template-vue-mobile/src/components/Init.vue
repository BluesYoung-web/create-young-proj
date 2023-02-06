<!--
 * @Author: zhangyang
 * @Date: 2023-02-01 11:54:25
 * @LastEditTime: 2023-02-01 11:59:36
 * @Description: 
-->
<script lang="ts" setup>
import { server } from 'virtual:local-server';

(async () => {
  // 获取环境变量
  let viteEnv;
  // 注入此环境变量，可以兼容现有的部署方式
  if (import.meta.env.VITE_USE_DEFAULT_DEPLOY_METHOD) {
    viteEnv = import.meta.env;
    // console.log("🚀 ~ file: main.ts ~ line 19 ~ viteEnv", viteEnv)
  } else if (import.meta.env.DEV) {
    // 开发环境，局域网 ip
    viteEnv = await (await fetch(server + '/get/env')).json();
    // console.log("🚀 ~ file: main.ts ~ line 24 ~ viteEnv", viteEnv)
  } else {
    // 部署环境，需要配合 node server 使用
    viteEnv = await (await fetch(`/get/env`)).json();
    // console.log("🚀 ~ file: main.ts ~ line 28 ~ viteEnv", viteEnv)
  }
  window.__YOUNG_VITE_ENV__ = viteEnv;

  // 设定视口高度，防止软键盘影响布局
  const metaElement = document.querySelector('#viewportMeta');
  metaElement?.setAttribute('content', `maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0,viewport-fit=cover,height=${window.innerHeight}`);

})();
</script>
<template>
  <div hidden></div>
</template>