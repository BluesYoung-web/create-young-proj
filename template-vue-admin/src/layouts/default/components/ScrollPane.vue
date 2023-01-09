<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 11:02:54
 * @LastEditTime: 2023-01-05 16:07:55
 * @Description: 滚动容器
-->
<template>
  <div ref="scrollWrapper" class="max-w-[calc(90vw)] flex-nowrap whitespace-nowrap overflow-x-auto"
    @wheel.prevent="scrollHandler">
    <span>
      <slot />
    </span>
  </div>
</template>
<script lang="ts" setup>
type EL = Element | null;
/**
 * 标签间距
 */
const tagSpacing = 4;
const scrollWrapper = ref<HTMLElement>();
// 滚动鼠标滚轮
const scrollHandler = (e: WheelEvent) => {
  const eventData = e.deltaY * 40;
  const wrap = scrollWrapper.value;
  if (wrap) {
    wrap.scrollLeft = wrap.scrollLeft + eventData / 4;
  }
};
const moveToTarget = () => {
  if (scrollWrapper.value) {
    // 外层包裹
    const wrap: HTMLElement = scrollWrapper.value as any;
    // 容器宽度
    const containerWidth = 1704;
    // 标签列表
    const tagList: HTMLCollection = (wrap.firstElementChild as HTMLElement)?.children;

    let firstChild: EL = null, lastChild: EL = null, targetElement: EL = null;
    if (tagList.length > 0) {
      firstChild = tagList[0];
      lastChild = tagList[tagList.length - 1];
      for (const element of Array.from(tagList)) {
        if (Array.from(element.classList).includes('el-tag--success')) {
          targetElement = element;
          break;
        }
      }

      if (firstChild === targetElement) {
        wrap.scrollLeft = 0;
      } else if (lastChild === targetElement) {
        wrap.scrollLeft = wrap.scrollWidth - containerWidth;
      } else {
        const currentIndex = Array.from(tagList).findIndex((item) => item === targetElement);

        const preElement = tagList[currentIndex - 1];
        const nextElement = tagList[currentIndex + 1];
        if (!preElement || !nextElement) {
          return;
        }

        const afterNextTagOffsetLeft = (nextElement as HTMLElement).offsetLeft + (nextElement as HTMLElement).offsetWidth + tagSpacing;
        const beforePrevTagOffsetLeft = (preElement as HTMLElement).offsetLeft - tagSpacing;

        if (afterNextTagOffsetLeft > wrap.scrollLeft + containerWidth) {
          wrap.scrollLeft = afterNextTagOffsetLeft - containerWidth;
        } else if (beforePrevTagOffsetLeft < wrap.scrollLeft) {
          wrap.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    } else {
      return;
    }
  }
};
// 暴露给其父级组件通过 ref 使用
defineExpose({ moveToTarget });
</script>
