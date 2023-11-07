<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:49:00
 * @LastEditTime: 2023-11-07 16:58:16
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse, zen_mode, zen_mode_helper } = storeToRefs(useNavStore())
const { enter, isSupported } = useFullscreen()

const fullTip = useLocalStorage('全屏提示', false)

const { userId, nick } = storeToRefs(useUserStore())

const waterTxt = computed(() => `${userId.value}\n${nick.value}`)

onMounted(() => {
  const { innerWidth, innerHeight } = window
  if (innerHeight > innerWidth) {
    isCollapse.value = true

    if (fullTip.value)
      return

    if (!isSupported.value) {
      showDialog({
        title: '推荐使用场景',
        message: '系统浏览器 + 横屏使用',
      }).finally(() => fullTip.value = true)
    }
    else {
      showDialog({
        title: '推荐使用场景',
        message: '系统浏览器 + 全屏模式 + 横屏使用',
        confirmButtonText: '进入全屏',
      }).then(async () => {
        try {
          await enter()
        }
        catch (e) {
          showDialog({
            message: '您的设备暂不支持全屏功能，请解锁系统方向锁定后横屏使用！',
          })
        }
      }).catch(() => null).finally(() => fullTip.value = true)
    }
  }
})
</script>

<template>
  <div class="layout-admin-wrapper">
    <!-- 全局水印, 按需启用 -->
    <!-- <VanWatermark
      v-if="waterTxt"
      :content="waterTxt"
      :gap-x="30"
      :gap-y="10"
      full-page
      text-color="#eee"
    /> -->
    <!-- SubMenu -->
    <LayoutSideBar v-show="!zen_mode" />
    <div
      class="layout-container-vertical" :class="{
        'is-collapse': isCollapse,
        'is-zen-mode': zen_mode,
        'is-zen-mode-helper': zen_mode_helper,
      }"
    >
      <div class="layout-main">
        <!-- Header -->
        <div
          class="layout-header" :class="{
            'is-collapse': isCollapse,
            'is-zen-mode': zen_mode,
          }"
        >
          <LayoutNavBar v-show="!zen_mode || zen_mode_helper" />
          <LayoutTabsBar v-show="!zen_mode || zen_mode_helper" lt-lg="!hidden" />
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

    &.is-zen-mode {
      margin-left: 0 !important;
      margin-top: 0;
      border-right: 0;
    }

    &.is-zen-mode-helper {
      margin-top: $base-header-height;
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

        &.is-zen-mode {
          width: 100% !important;
        }
      }
    }
  }

  @screen lt-lg {
    .layout-container-vertical {
      @apply block;
      margin-left: 0;
      // margin-left: $base-left-menu-width-min;
      margin-top: $base-top-bar-height !important;

      &.is-collapse {
        @apply ml-0;
      }

      .layout-header {
        // width: calc(100% - $base-left-menu-width-min) !important;
        width: 100% !important;

        // &.is-collapse {
        //   width: 100% !important;
        // }
      }
    }
  }
}
</style>
