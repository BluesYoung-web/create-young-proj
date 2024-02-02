<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:28:02
 * @LastEditTime: 2024-02-02 14:28:02
 * @Description:
-->
<script setup lang='ts'>
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
const { toggle, isFullscreen } = useFullscreen()

const colorBtnTitle = computed(() => {
  return isDark.value ? '切换成浅色主题' : '切换成深色主题'
})

const fullScreenTitle = computed(() => {
  return isFullscreen.value ? '退出全屏' : '全屏'
})
</script>

<template>
  <div class="between">
    <div class="center-y">
      <div :class="{ 'logo-light': !isDark, 'logo-night': isDark }" class="h-120px w-120px bg-[url(/src/assets/img/logo.png)] bg-no-repeat" />
      <div class="ml-4 flex-col justify-between">
        <div class="font-mono text-2xl font-bold tracking-1">
          国家电网华中分部
        </div>
        <div class="relative top-2 font-extralight tracking-widest italic underline decoration-[#ddd] underline-offset-8">
          电力系统可视化分析平台
        </div>
      </div>
    </div>
    <div class="center-y">
      <div class="w-80 center text-2xl font-bold tracking-0.5">
        {{ formatted }}
      </div>
      <div class="w-14 center" :title="colorBtnTitle">
        <div class="i-carbon-light dark:i-carbon-moon icon-btn" @click="toggleDark" />
      </div>
      <div class="w-14 center" :title="fullScreenTitle">
        <div class="i-carbon-ica-2d icon-btn" @click="toggle" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
 .logo-light{
    background-position: 0 -140px;
  }
   .logo-night{
    background-position: 0 0;
  }
</style>
