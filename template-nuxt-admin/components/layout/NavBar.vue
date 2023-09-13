<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 16:38:20
 * @LastEditTime: 2023-09-13 09:46:18
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse, breadcrumb_arr } = storeToRefs(useNavStore())

function collapseHandler() {
  if (WindowSize['lt-lg']) {
    /**
     * 触发 Ctrl + K 事件
     */
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
      composed: true,
      view: window,
    })

    document.body.dispatchEvent(event)
  }
  else {
    isCollapse.value = !isCollapse.value
  }
}
</script>

<template>
  <div class="nav-bar-container flex justify-between">
    <div class="left-panel">
      <div
        class="fold-unfold i-ep-expand" :class="[isCollapse ? '' : 'rotate-180']"
        :title="`${(isCollapse ? '展开' : '收起')}菜单`" @click="collapseHandler"
      />

      <ElBreadcrumb separator="/" class="ml-10px" lt-md="hidden">
        <ElBreadcrumbItem :to="{ path: '/' }">
          首页
        </ElBreadcrumbItem>
        <ElBreadcrumbItem v-for="(title, index) in breadcrumb_arr" :key="`${index}fsdakjroe`">
          {{ title }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
    <div class="right-panel">
      <TopSearch />
      <ScreenFull />
      <TopUser />
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 60px;

    .fold-unfold {
      font-size: 18px;
      color: $base-color-gray;
      cursor: pointer;
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;
  }
}
</style>
