<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:05:40
 * @LastEditTime: 2023-09-18 14:14:12
 * @Description:
-->
<script lang="ts" setup>
import type { RouteLocationNormalized, RouteRecordRaw } from '#vue-router'

const route = useRoute()
const tagsState = useTagsStore()

const { visitedViews } = storeToRefs(tagsState)

function tabClick(e: any) {
  const currentName = e.paneName
  if (isActive(currentName))
    return

  navigateTo(currentName)
}

const isActive = (view: RouteLocationNormalized) => view.path === route.path
const isAffix = (route: RouteLocationNormalized | RouteRecordRaw) => visitedViews.value.length === 1 || (route?.meta?.affix ?? false)

function toLastView(visitedViews: RouteLocationNormalized[]) {
  const lastView = visitedViews.slice(-1)[0]
  if (lastView)
    navigateTo(lastView.fullPath)
}

function removeTab(currentName: any) {
  const to = visitedViews.value.find(r => r.path === currentName as string)
  if (to) {
    tagsState.delView(to)
    isActive(to) && toLastView(visitedViews.value)
  }

  if (visitedViews.value.length === 0)
    navigateTo('/')
}

function closeCurrentTab() {
  removeTab(route.path)
}

function closeOtherTab() {
  const currentName = route.path
  const to = visitedViews.value.find(r => r.path === currentName as string)
  to && tagsState.delOtherViews(to)
}

function closeAllTab() {
  tagsState.delAllViews()
  navigateTo('/')
}
</script>

<template>
  <div class="tabs-bar-container">
    <div class="tabs-content">
      <ElTabs
        v-if="visitedViews.length > 0" type="card" :model-value="$route.path" @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <ElTabPane
          v-for="item in visitedViews" :key="item.path" type="card" :path="item.path"
          :label="item.meta.title as string" :name="item.path" :closable="!isAffix(item)"
        >
          <template #label>
            {{ item.meta.title }}
          </template>
        </ElTabPane>
      </ElTabs>
    </div>
    <div class="tabs-action">
      <ElDropdown trigger="click" :disabled="visitedViews.length <= 1">
        <ElIcon color="rgba(0, 0, 0, 0.65)" :size="20" :class="[visitedViews.length <= 1 ? '!cursor-not-allowed' : '!cursor-pointer']">
          <div class="i-ep-menu" />
        </ElIcon>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="closeCurrentTab">
              <ElIcon :size="14">
                <div class="i-ep-folder-remove" />
              </ElIcon>
              关闭当前
            </ElDropdownItem>
            <ElDropdownItem @click="closeOtherTab">
              <ElIcon :size="14">
                <div class="i-ep-close" />
              </ElIcon>
              关闭其他
            </ElDropdownItem>
            <ElDropdownItem @click="closeAllTab">
              <ElIcon :size="14">
                <div class="i-ep-folder-delete" />
              </ElIcon>
              关闭所有
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-action {
  padding-bottom: 5px;

  :deep(.el-icon) {
    transition: all 0.3s;
  }
}

.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: flex-end;
  justify-content: space-between;
  height: $base-tabs-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;

  .tabs-content {
    width: calc(100% - 0px);
  }

  :deep(.el-tabs--card) {
    height: $base-tag-item-height;

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
    }

    .el-tabs__header {
      margin: 0;
      border-bottom: 0;
    }

    .el-tabs__nav {
      border: 0;
    }

    .tabs-icon {
      top: 3px;
      font-size: 15px;
    }

    .el-tabs__item {
      box-sizing: border-box;
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
      border: none;
      border-radius: $base-border-radius;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    }

    .el-tabs__item.is-active {
      background-color: #e8f4ff;
      -webkit-mask-image: url('/tabbar_bg.png');
      mask-image: url('/tabbar_bg.png');
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }

    .el-tabs__item:not(.is_active):hover {
      background-color: #f6f8f9;
      -webkit-mask-image: url('/tabbar_bg.png');
      mask-image: url('/tabbar_bg.png');
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
  }
}
</style>
