<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:49:00
 * @LastEditTime: 2023-07-21 17:22:17
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse } = storeToRefs(useNavStore());
</script>

<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <!-- SubMenu -->
      <LayoutSideBar />
      <div class="layout-main" :class="{ 'is-collapse': isCollapse }">
        <!-- Header -->
        <div class="layout-header fixed-header" :class="{ 'is-collapse': isCollapse }">
          <LayoutNavBar />
          <LayoutTabsBar />
        </div>
        <div class="app-main-container">
          <!-- Main -->
          <LayoutMain />
          <!-- Footer -->
          <LayoutFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 2;
  width: calc(100% - $base-left-menu-width);
}

.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .layout-container-vertical {
    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    .layout-main {
      min-height: 100%;
      margin-left: $base-left-menu-width;

      &.is-collapse {
        margin-left: $base-left-menu-width-min;
        border-right: 0;
      }

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        &.fixed-header {
          @include fix-header;
        }

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }

      .app-main-container {
        padding: 20px;
      }
    }
  }
}
</style>
