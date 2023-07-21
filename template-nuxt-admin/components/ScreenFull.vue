<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 16:28:26
 * @LastEditTime: 2023-07-21 17:01:53
 * @Description:
-->
<script lang="ts" setup>
const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <ElButton circle @click="toggle" :title="!isFullscreen ? '全屏' : '退出全屏'">
    <div v-if="!isFullscreen" class="i-fluent:full-screen-maximize-24-filled"></div>
    <div v-else class="i-fluent:full-screen-minimize-24-filled"></div>
  </ElButton>
</template>
