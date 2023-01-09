<!--
 * @Author: zhangyang
 * @Date: 2022-10-25 17:43:30
 * @LastEditTime: 2023-01-09 09:08:54
 * @Description: 
-->
<script lang="ts" setup>
import Logo from './components/Logo.vue';
import Menu from './components/Menu.vue';
import UserCenter from './components/UserCenter.vue';
import TagsView from './components/TagsView.vue';
import { useTagsStore } from '@/stores';

const { cachedViews, visitedViews } = storeToRefs(useTagsStore());
const route = useRoute();
const path = computed(() => route.path);
const name = computed(() => route.name);
const isCached = computed(() => {
  // 无需缓存的界面
  if (route.meta.noCache) {
    return false;
  }
  const arr = visitedViews.value.map((view) => view.name);
  // 已经缓存，或者首次打开(防止二次初始化)
  return cachedViews.value.includes(name.value) || !arr.includes(name.value as unknown as string);
});
</script>
<template>
  <div class="parent">
    <div class="left">
      <div class="logo">
        <Logo />
      </div>
      <div class="menu">
        <Menu />
      </div>
    </div>
    <div class="right">
      <div class="top">
        <UserCenter />
      </div>
      <div class="tags">
        <TagsView />
      </div>
      <div class="main">
        <RouterView v-slot="{ Component: PageComponent }">
          <Transition name="fade-transform" mode="out-in">
            <div>
              <KeepAlive>
                <Component v-if="isCached" :is="PageComponent" :key="path" />
              </KeepAlive>
              <Component v-if="!isCached" :is="PageComponent" :key="path" />
            </div>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent {
  @apply w-100vw h-100vh overflow-auto flex;

  .left {
    @apply h-full flex flex-col w-210px;
    background-color: rgb(48, 65, 86);

    .logo {
      @apply w-full h-60px flex justify-center items-center bg-[#2b2f3a] text-white;
    }

    .menu {
      @apply flex-1 overflow-y-auto overflow-x-hidden;
      background-color: rgb(48, 65, 86);
    }
  }

  .right {
    @apply flex-1;

    .top {
      @apply h-60px w-full flex items-center;
    }

    .tags {
      @apply h-30px w-full relative z-10;
    }

    .main {
      @apply p-5 h-[calc(100vh-100px)] w-[calc(100vw-210px)] overflow-auto;
    }
  }
}
</style>