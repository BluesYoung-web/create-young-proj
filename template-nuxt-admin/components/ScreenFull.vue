<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 16:28:26
 * @LastEditTime: 2023-07-24 10:24:19
 * @Description:
-->
<script lang="ts" setup>
const { toggle, isFullscreen, isSupported } = useFullscreen()
</script>

<template>
  <ElButton v-if="isSupported" circle @click="toggle" :title="!isFullscreen ? '全屏' : '退出全屏'">
    <div v-if="!isFullscreen" class="i-fluent:full-screen-maximize-24-filled"></div>
    <div v-else class="i-fluent:full-screen-minimize-24-filled"></div>
  </ElButton>
</template>
