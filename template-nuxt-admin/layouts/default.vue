<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:49:00
 * @LastEditTime: 2023-07-28 17:14:46
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse } = storeToRefs(useNavStore());
const { enter, isSupported } = useFullscreen();

const fullTip = useLocalStorage('全屏提示', false);

onMounted(() => {
  const { innerWidth, innerHeight } = window;
  if (innerHeight > innerWidth) {
    isCollapse.value = true;

    if (fullTip.value) {
      return;
    }

    if (!isSupported.value) {
      showDialog({
        title: '推荐使用场景',
        message: '系统浏览器 + 横屏使用',
      }).finally(() => fullTip.value = true);
    } else {
      showDialog({
        title: '推荐使用场景',
        message: '系统浏览器 + 全屏模式 + 横屏使用',
        confirmButtonText: '进入全屏'
      }).then(async () => {
        try {
          await enter();
        } catch (e) {
          showDialog({
            message: '您的设备暂不支持全屏功能，请解锁系统方向锁定后横屏使用！'
          });
        }
      }).catch(() => null).finally(() => fullTip.value = true);;
    }
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
        <div class="layout-header" :class="{ 'is-collapse': isCollapse }">
          <LayoutNavBar />
          <LayoutTabsBar lt-lg="!hidden" />
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
.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .layout-container-vertical {
    margin-top: $base-header-height;
    margin-left: $base-left-menu-width;

    &.is-collapse {
      margin-left: $base-left-menu-width-min;
      border-right: 0;
    }

    .layout-main {
      min-height: 100%;

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        position: fixed;
        top: 0;
        right: 0;
        z-index: $base-z-index - 2;
        width: calc(100% - $base-left-menu-width);

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }
    }
  }

  @screen lt-lg {
    .layout-container-vertical {
      @apply block;
      margin-left: $base-left-menu-width-min;
      margin-top: $base-top-bar-height !important;

      &.is-collapse {
        @apply ml-0;
      }

      .layout-header {
        width: calc(100% - $base-left-menu-width-min) !important;

        &.is-collapse {
          width: 100% !important;
        }
      }
    }
  }
}
</style>
