/*
 * @Author: zhangyang
 * @Date: 2022-02-24 15:55:05
 * @LastEditTime: 2023-01-04 19:47:49
 * @Description: 存储标签页的状态
 */
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { RouteLocationNormalized } from 'vue-router';

type CachedView = string | symbol | null | undefined;

interface TagsViewState {
  /**
   * 访问过的页面，路由对象
   */
  visitedViews: RouteLocationNormalized[];
  /**
   * 已缓存的页面名称
   */
  cachedViews: CachedView[];
}
// @ts-ignore
export const useTagsStore = defineStore('useTagsStore', {
  state: () => {
    const state = reactive<TagsViewState>({
      visitedViews: [],
      cachedViews: [],
    });
    return state;
  },
  actions: {
    /**
     * 打开某个页面
     */
    addView(view: RouteLocationNormalized) {
      if (view.path === '/') {
        return;
      }

      // 非我族类其心必异，布局不是默认布局的页面，不缓存
      if ((view.meta?.layout ?? 'default') !== 'default') {
        return;
      }
      // 查询是否已经访问过
      if (!this.visitedViews.some((v) => v.path === view.path)) {
        // 添加到已访问
        const { name, path, fullPath, meta } = view;
        this.visitedViews.push({ name, path, fullPath, meta } as RouteLocationNormalized);
        // 添加到缓存
        this.addToCache(view);
      }
    },
    /**
     * 添加页面到缓存
     */
    addToCache(view: RouteLocationNormalized) {
      // 查询该标签是否已缓存
      if (this.cachedViews.includes(view.name)) {
        null;
      } else if (!view.meta?.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    /**
     * 关闭某个页面
     */
    delView(view: RouteLocationNormalized) {
      // 固定页不能关闭
      if (view.meta.affix) {
        ElMessage.warning('固定页无法关闭！');
        return false;
      }
      // 删除访问记录
      const index = this.visitedViews.findIndex((r) => r.path === view.path);
      index > -1 && this.visitedViews.splice(index, 1);
      // 删除缓存
      this.delCachedView(view);
      return true;
    },
    /**
     * 删除页面缓存
     */
    delCachedView(view: RouteLocationNormalized) {
      const index = this.cachedViews.indexOf(view.name);
      index > -1 && this.cachedViews.splice(index, 1);
    },
    /**
     * 关闭其他页面
     */
    delOtherViews(view: RouteLocationNormalized) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v?.meta?.affix || v.path === view.path;
      });
      this.cachedViews = this.cachedViews.filter((v) => {
        return v === view.name;
      });
    },
    /**
     * 关闭所有页面
     */
    delAllViews() {
      const affixTags = this.visitedViews.filter((tag) => tag?.meta?.affix);
      this.visitedViews = affixTags;
      this.cachedViews.length = 0;
    },
  },
});

import.meta.hot && import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot));
