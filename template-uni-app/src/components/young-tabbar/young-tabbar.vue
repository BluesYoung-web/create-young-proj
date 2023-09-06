<!--
 * @Author: zhangyang
 * @Date: 2023-07-18 17:44:06
 * @LastEditTime: 2023-07-20 12:03:39
 * @Description:
-->
<script lang="ts" setup>
import { Pages } from '@/config'
import home from '@/static/home.png'
import home_active from '@/static/home_active.png'
import my from '@/static/my.png'
import my_active from '@/static/my_active.png'

interface Tabbar {
  selectedIconPath: string
  iconPath: string
  text: string
  pagePath: Pages
}

withDefaults(defineProps<{ z?: number }>(), { z: 99 })

const list = ref<Tabbar[]>([
  {
    text: '首页',
    iconPath: home,
    selectedIconPath: home_active,
    pagePath: Pages.首页,
  },
  {
    text: '我的',
    iconPath: my,
    selectedIconPath: my_active,
    pagePath: Pages.个人中心,
  },
])

const current = computed(() => {
  const [page] = getCurrentPages()
  const route = page.route
  const index = list.value.findIndex(path => path.pagePath === `/${route}`)
  return index
})

function tabChange(index: number) {
  if (index === current.value)
    return

  tabbar(list.value[index].pagePath)
}

uni.hideTabBar()
</script>

<template>
  <view class="t-tabbar" :style="{ zIndex: z }">
    <view
      v-for="(item, index) in list" :key="index" class="t-tabbar__item" :class="{ 't-bar__item_on': index === current }"
      @click="tabChange(index)"
    >
      <view style="position: relative;display:inline-block;">
        <image :src="current === index ? item.selectedIconPath : item.iconPath" class="t-tabbar__icon" />
      </view>
      <view class="t-tabbar__label">
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.t-tabbar {
  display: flex;
  // position: relative;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
}

.t-tabbar:before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.1);
}

.t-tabbar__item {
  display: block;
  flex: 1;
  padding: 8px 0 4px;
  padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  font-size: 0;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.t-tabbar__item:first-child {
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
}

.t-tabbar__item:last-child {
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
}

.t-tabbar__item.t-bar__item_on .t-tabbar__icon,
.t-tabbar__item.t-bar__item_on .t-tabbar__icon>i,
.t-tabbar__item.t-bar__item_on .t-tabbar__label {
  color: #e80d19;
}

.t-tabbar__icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-bottom: 2px;
}

i.t-tabbar__icon,
.t-tabbar__icon>i {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.5);
}

.t-tabbar__icon image {
  width: 100%;
  height: 100%;
}

.t-tabbar__label {
  color: #bfbfbf;
  font-size: 10px;
  line-height: 1.4;
  height: 14px;
}
</style>
