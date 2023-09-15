<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 12:25:23
 * @LastEditTime: 2023-09-15 15:25:15
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse, nav_arr, nav_index_map } = storeToRefs(useNavStore())

const route = useRoute()
const active = computed(() => nav_index_map.value.get(route.path))
</script>

<template>
  <div class="layout-sidebar-container" :class="{ 'is-collapse': isCollapse }">
    <LayoutLogo />

    <ElScrollbar>
      <ElMenu
        :default-active="active"
        background-color="#001529" text-color="hsla(0,0%,100%,.65)" active-text-color="#fff" unique-opened
        :collapse="isCollapse || WindowSize['lt-lg']" menu-trigger="click" :collapse-transition="false"
      >
        <LayoutSubMenu :menu-list="nav_arr" />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss">
@mixin active {
  &:hover {
    color: $base-color-white;
  }

  &.is-active {
    color: $base-color-white;
    background-color: var(--el-color-primary) !important;
  }
}

.layout-sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index;
  width: $base-left-menu-width;
  height: 100vh;
  background: $base-menu-background;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  transition: width $base-transition-time;

  @screen lt-lg {
    & {
      @apply hidden;
      // @apply block;
      // width: $base-left-menu-width-min;
    }
  }

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;

    // @screen lt-lg {
    //   & {
    //     @apply hidden;
    //   }
    // }
  }

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
    height: calc(100vh - $base-nav-bar-height);

    .el-menu {
      border: 0;
    }

    .el-menu-item,
    .el-submenu__title {
      height: $base-menu-item-height;
      overflow: hidden;
      line-height: $base-menu-item-height;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .el-menu-item {
      @include active;
    }
  }
}
</style>
