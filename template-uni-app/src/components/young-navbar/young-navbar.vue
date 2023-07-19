<!--
 * @Author: zhangyang
 * @Date: 2023-07-19 09:03:51
 * @LastEditTime: 2023-07-19 09:55:54
 * @Description:
-->
<script lang="ts" setup>
import { Pages } from '@/config';
import { getNavbarHeihgt } from '@/store';
import { back, relaunch } from '@/utils';
interface Props {
  /**
   * 是否是自定义导航
   */
  custom?: boolean;
  /**
   * 是否返回
   */
  isback?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 标题颜色
   */
  color?: string;
  /**
   * 背景色
   */
  bgcolor?: string;
  /**
   * 是否固定
   */
  fixed?: boolean;
  /**
   * 等高的占位元素
   */
  placeholder?: boolean;
  /**
   * 设置层级
   */
  zIndex?: number;
  /**
   * 是否展示
   */
  ishow?: boolean
}

withDefaults(defineProps<Props>(), {
  custom: true,
  isback: true,
  title: '',
  color: '#fff',
  bgcolor: 'linear-gradient(180deg, #3E3A39 0%, #0D0D0D 100%)',
  fixed: true,
  placeholder: true,
  zIndex: 2,
  ishow: true
});

const navHeight = getNavbarHeihgt();

// 页面数量 当只有一个页面且不是主页面的时候 back 图标变成 home 图标
const pagesCount = computed(() => {
  return getCurrentPages().length;
});

const pagesTitle = computed(() => {
  const page = getCurrentPages()[pagesCount.value - 1];
  let res = '';
  for (const key in Pages) {
    const val = Pages[key as keyof typeof Pages]?.slice(1);
    const route = page.route;
    if (route === val) {
      res = key;
      break;
    }
  }
  return res;
});

const handleLeftClick = () => {
  if (pagesCount.value === 1) {
    relaunch(Pages.首页);
  } else {
    back();
  }
};
</script>

<template>
  <view v-if="ishow">
    <view class="y__navbar">
      <view class="y__navbar-wrap flex items-center relative box-border left-0"
        :class="{ 'custom': custom, 'fixed': fixed || placeholder }"
        :style="{ 'height': navHeight.customBarH + 'px', 'padding-top': navHeight.statusBarH + 'px', 'background': bgcolor, 'color': color, 'z-index': zIndex }">
        <!-- 返回  -->
        <view class="action navbar-action__left" v-if="isback" @click="handleLeftClick">
          <template v-if="$slots.back">
            <slot name="back" />
          </template>
          <template v-else>
            <!-- <image v-if="pagesCount === 1" src="../static/home.png" class="w20px h20px"></image>
            <image v-else src="../static/back.png" class="w20px h20px"></image> -->
          </template>
          <slot name="backText" />
        </view>
        <slot name="left" />

        <!-- //标题 -->
        <view class="navbar-title absolute ">
          <template v-if="$slots.title">
            <slot name="title" />
          </template>
          <template v-else><text :style="{ 'color': color }">{{ title || pagesTitle }}</text></template>
        </view>

        <!-- //右侧 -->
        <view class="action navbar-action__right">
          <slot name="right" />
        </view>
      </view>
    </view>
    <view :style="{ 'height': navHeight.customBarH + 'px' }" v-if="placeholder"></view>
  </view>
</template>


<style lang="scss" scoped>
.nvuefont {
  font-family: nvueIcon;
}

.y__navbar {
  /* #ifndef APP-NVUE */
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  display: -ms-flexbox;
  /* #endif */
  flex-direction: row;
}

.y__navbar-wrap {
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  color: #333;
  justify-content: space-between;
  min-height: 90rpx;
  position: relative;
  z-index: 2021;
}

.y__navbar-wrap.custom {
  /* #ifdef MP-WEIXIN */
  padding-right: 200rpx;
  /* #endif */
  /* #ifdef MP-ALIPAY */
  padding-right: 150rpx;
  /* #endif */
}

.y__navbar-wrap.fixed {
  /* #ifdef APP-NVUE */
  left: 0;
  right: 0;
  /* #endif */
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
  max-width: 750rpx;
  position: fixed;
  top: 0;
}

.y__navbar-wrap .action {
  /* #ifndef APP-NVUE */
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  display: -ms-flexbox;
  height: 100%;
  max-width: 100%;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/*左侧*/
.navbar-action__left {
  font-size: 32rpx;
  padding: 0 24rpx;
}

.navbar-action__left .iconfont {
  font-size: 42rpx;
}

/*标题*/
.y__navbar-wrap .navbar-title {
  flex: 1;
  font-size: 34rpx;
  left: 50%;
  transform: translateX(-50%);
}

// .y__navbar-wrap .navbar-title:first-child {
// 	font-size: 36rpx;
// 	margin-left: 24rpx;
// }

.y__navbar-wrap .navbar-title.center {
  /* #ifdef APP-NVUE */
  left: 0;
  right: 0;
  /* #endif */
  /* #ifndef APP-NVUE */
  width: 100%;
  z-index: -1;
  /* #endif */
  align-items: center;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
}

.y__navbar-wrap.custom .navbar-title.center {
  /* #ifdef MP */
  width: auto;
  align-items: auto;
  text-align: left;
  position: static;
  /* #endif */
}

/*搜索条*/
.navbar-action__search.action {
  flex: 1;
  justify-content: flex-start;
}

.navbar-action__right {
  font-size: 32rpx;
  padding-right: 24rpx;
}

.navbar-action__right .iconfont {
  font-size: 42rpx;
}
</style>
