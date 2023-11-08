<!--
 * @Author: zhangyang
 * @Date: 2023-09-27 14:40:42
 * @LastEditTime: 2023-11-08 10:41:02
 * @Description:
-->
<script lang="ts" setup>
import game from '@/assets/tabbar/game.png'
import game_active from '@/assets/tabbar/game_active.png'
import event from '@/assets/tabbar/event.png'
import event_active from '@/assets/tabbar/event_active.png'
import shop from '@/assets/tabbar/shop.png'
import shop_active from '@/assets/tabbar/shop_active.png'
import user from '@/assets/tabbar/user.png'
import user_active from '@/assets/tabbar/user_active.png'
</script>

<template>
  <VanTabbar
    v-if="['/', '/match.html', '/shop.html', '/news.html'].includes($route.path)"
    :model-value="$route.path" fixed placeholder safe-area-inset-bottom class="md:hidden bg-white" active-color="#0090EE" inactive-color="#C2D1E7"
  >
    <VanTabbarItem name="/" to="/">
      <template #icon>
        <img class="" width="20" height="20" :src="$route.path === '/' ? game_active : game" data-not-lazy loading="lazy" alt="">
      </template>
      <div title="游戏" class="btntxt">
        游戏
      </div>
    </VanTabbarItem>
    <VanTabbarItem name="/match.html" to="/match.html">
      <template #icon>
        <img class="" width="20" height="20" :src="$route.path === '/match.html' ? event_active : event" data-not-lazy loading="lazy" alt="">
      </template>
      <div title="赛事" class="btntxt">
        赛事
      </div>
    </VanTabbarItem>
    <VanTabbarItem name="/shop.html" to="/shop.html">
      <template #icon>
        <img
          width="20" height="20"
          class="" :src="$route.path.startsWith('/shop.html') ? shop_active : shop" data-not-lazy
          loading="lazy"
          alt=""
        >
      </template>
      <div title="商城" class="btntxt">
        商城
      </div>
    </VanTabbarItem>
    <VanTabbarItem name="/news.html" to="/news.html">
      <template #icon>
        <img class="" width="20" height="20" :src="$route.path === '/news.html' ? user_active : user" data-not-lazy loading="lazy" alt="">
      </template>
      <div title="资讯" class="btntxt">
        资讯
      </div>
    </VanTabbarItem>
  </VanTabbar>
</template>

<style lang="scss" scoped>
.btntxt {
  width: 24px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  line-height: 17px;
}

:deep(.van-tabbar-item) {
  margin: 0 10px;
}
</style>
