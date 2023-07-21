<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-07-20 19:32:57
 * @Description:
-->
<script lang="ts" setup>
import 'element-plus/dist/index.css';
import { ElConfigProvider } from 'element-plus';
// @ts-ignore
import locale from 'element-plus/dist/locale/zh-cn.mjs';

const app = useNuxtApp();
// const { isLoading } = storeToRefs(useNavStore());

const route = useRoute();

app.hook('page:start', () => {
  console.log('loading...');
  // isLoading.value = true;
});

app.hook('page:finish', () => {
  console.log('loading end ...');
  // isLoading.value = false;
});
</script>

<template>
  <ElConfigProvider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px
}

::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 2em
}

::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 2em;
}

::-webkit-scrollbar-corner {
  background-color: transparent
}

body {
  background-color: #fff;
}

html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

img,
video {
  max-width: 100%;
  height: auto;
}

.reset-img img,
.reset-img video,
.reset-img svg {
  display: initial;
}

.reset-img audio {
  display: inline-block;
}

.siyuan {
  font-family: SourceHanSansSC-Bold, SourceHanSansSC;
}

.yahei {
  font-family: MicrosoftYaHei;
}

.pingfang {
  font-family: PingFangSC-Regular, PingFang SC;
}

.el-form-item__label {
  align-items: center;
}

.container {
  max-width: 1200px;
}
</style>

