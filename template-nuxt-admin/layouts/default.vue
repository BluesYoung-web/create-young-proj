<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:49:00
 * @LastEditTime: 2023-07-24 17:01:55
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse } = storeToRefs(useNavStore());
const { enter, isSupported } = useFullscreen();

onMounted(() => {
  const { innerWidth, innerHeight } = window;
  if (innerHeight > innerWidth) {
    showDialog({
      title: '温馨提示',
      message: '为了您的用户体验，请全屏进行使用',
      confirmButtonText: '进入全屏'
    }).then(async () => {
      try {
        if (!isSupported.value) {
          throw '暂不支持全屏';
        }

        await enter();
      } catch (e) {
        showDialog({
          message: '您的设备暂不支持全屏功能，请解锁系统方向锁定后横屏使用！'
        });
      }
    }).catch(() => null);
  }
});
</script>

<template>
  <div class="layout-admin-wrapper">
    <!-- SubMenu -->
    <LayoutSideBar />
    <div class="layout-container-vertical" :class="{ 'is-collapse': isCollapse }">
      <div class="layout-main">
        <!-- Header -->
        <div class="layout-header fixed-header" :class="{ 'is-collapse': isCollapse }">
          <LayoutNavBar />
          <LayoutTabsBar />
        </div>
        <div class="app-main-container">
          <!-- Main -->
          <LayoutMain />
          <!-- Footer -->
          <!-- <LayoutFooter /> -->
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
    margin-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    margin-left: $base-left-menu-width;

    &.is-collapse {
      margin-left: $base-left-menu-width-min;
      border-right: 0;
    }

    .layout-main {
      min-height: 100%;

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        &.fixed-header {
          @include fix-header;
        }

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }
    }
  }
}
</style>
