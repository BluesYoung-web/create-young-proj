<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 14:06:48
 * @LastEditTime: 2023-07-28 15:59:48
 * @Description:
-->
<script lang="ts" setup>
import { randomId } from '@bluesyoung/utils';

const props = withDefaults(defineProps<{
  menuList?: NavArrItem[];
}>(), {
  menuList: () => []
});

const randomKey = randomId();
const visibleMenu = computed(() => props.menuList.filter((n) => +n.visible === 1));
const { isCollapse } = storeToRefs(useNavStore());
const collapseMenu = () => {
  if (WindowSize['lt-lg']) {
    isCollapse.value = true;
  }
};
</script>

<template>
  <template v-for="(subItem, index) in visibleMenu" :key="subItem.component + randomKey + index">
    <ElSubMenu v-if="subItem.children && subItem.children.length > 0" :index="subItem.component + randomKey + index">
      <template #title>
        <ElIcon>
          <div v-if="subItem.icon" :class="subItem.icon" />
        </ElIcon>
        <span>{{ subItem.title }}</span>
      </template>
      <LayoutSubMenu :menuList="subItem.children" />
    </ElSubMenu>
    <ElMenuItem v-else :index="subItem.component + randomKey + index">
      <YoungLink :to="subItem.component" @click="collapseMenu">
        <ElIcon>
          <div v-if="subItem.icon" :class="subItem.icon" />
        </ElIcon>
        {{ subItem.title }}
      </YoungLink>
    </ElMenuItem>
  </template>
</template>
