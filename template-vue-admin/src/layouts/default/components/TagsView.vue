<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 13:35:58
 * @LastEditTime: 2023-01-05 16:00:11
 * @Description: 标签选项卡组件
-->
<template>
  <div class="tags-view-container px-2">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper">
      <ElTag v-for="(tag, index) in visitedViews" :key="index + 'fadsrhewioru'" effect="dark" size="large"
        class="inline-block mx-1 my-0.2vh hover:cursor-pointer" :type="isActive(tag) ? 'success' : 'info'"
        :closable="!tag.meta.affix && visitedViews.length > 1" @click="router.push(tag.fullPath)"
        @close.stop="menuHandlers['closeThis'](tag)" @contextmenu.prevent="openContextMenu(tag, $event)">
        {{ tag.meta.title }}
      </ElTag>
    </ScrollPane>

    <YoungContextMenu v-model="showContextMenu" :menu-list="menuList" @clickItem="clickItemHandler" />
  </div>
</template>
<script lang="ts" setup>
import { YoungContextMenu } from '@bluesyoung/ui-vue3';
import ScrollPane from './ScrollPane.vue';
import { storeToRefs } from 'pinia';
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useTagsStore } from '@/stores';

const showContextMenu = ref(false);

const tagsState = useTagsStore();
const { visitedViews, cachedViews } = storeToRefs(tagsState);
const menuList = computed(() => {
  let baseMenu = [
    { title: '关闭此页面', handlerName: 'closeThis' },
    { title: '关闭其他页面', handlerName: 'closeOthers' }
  ];
  if (visitedViews.value.length === 1) {
    baseMenu = [];
  }
  const { name } = route;
  const s_name = selectedTag.value?.name ?? '';
  // 当前页为激活状态才允许刷新
  const res = (cachedViews.value.includes(s_name) && name === s_name) ? [{ title: '刷新此页面', handlerName: 'refresh' }].concat(baseMenu) : baseMenu;
  return res;
});
const router = useRouter();
const route = useRoute();
/**
 * 当前选中的标签
 */
const selectedTag = ref<RouteLocationNormalized | null>(null);
/**
 * 所有固定的标签(禁止关闭)
 */
const affixTags = ref<RouteLocationNormalized[]>([]);

const isActive = (view: RouteLocationNormalized) => view.path === route.path;
const isAffix = (route: RouteLocationNormalized | RouteRecordRaw) => route?.meta?.affix ?? false;

const toLastView = (visitedViews: RouteLocationNormalized[], view: RouteLocationNormalized) => {
  const lastView = visitedViews.slice(-1)[0];
  if (lastView) {
    router.push(lastView.fullPath);
  }
};

const scrollPane = ref<any | null>(null);

const moveToCurrentTag = () => {
  nextTick(() => {
    const SP = scrollPane.value;
    SP?.moveToTarget?.();
  });
};

const menuHandlers: Record<string, Function> = {
  'refresh': () => {
    const tag = selectedTag.value;
    tag && tagsState.delCachedView(tag);
  },
  'closeThis': (tag = selectedTag.value) => {
    if (tag) {
      if (!isAffix(tag)) {
        tagsState.delView(tag);
        isActive(tag) && toLastView(visitedViews.value, tag);
      }
    }
  },
  'closeOthers': () => {
    const tag = selectedTag.value;
    if (tag) {
      router.push(tag);
      tagsState.delOtherViews(tag);
    }
  },
  'closeAll': () => {
    tagsState.delAllViews();
    const sTag = selectedTag.value;
    if (sTag) {
      if (affixTags.value.some((tag) => tag.path === sTag.path)) {
        return;
      }
      toLastView(visitedViews.value, sTag);
    }
  }
};
const clickItemHandler = (handler: string) => {
  menuHandlers?.[handler]?.();
  showContextMenu.value = false;
};
const openContextMenu = (tag: RouteLocationNormalized, e: MouseEvent) => {
  nextTick(() => {
    if (menuList.value.length === 0) {
      return;
    }
    showContextMenu.value = true;
    selectedTag.value = tag;
  });
};

router.afterEach((to) => {
  tagsState.addView(to);
  moveToCurrentTag();
});

onMounted(() => {
  tagsState.addView(route);
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
</style>
