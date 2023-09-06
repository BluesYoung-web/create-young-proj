<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 16:28:26
 * @LastEditTime: 2023-07-24 14:09:42
 * @Description:
-->
<script lang="ts" setup>
const { toggle, isFullscreen, isSupported } = useFullscreen()

const title = computed(() => isFullscreen.value ? '退出全屏' : '全屏')
</script>

<template>
  <ElButton v-if="isSupported" circle :title="title" @click="toggle">
    <div
      :class="[isFullscreen ? 'i-fluent:full-screen-minimize-24-filled' : 'i-fluent:full-screen-maximize-24-filled']"
    />
  </ElButton>
</template>
