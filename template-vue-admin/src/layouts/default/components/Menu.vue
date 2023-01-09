<!--
 * @Author: zhangyang
 * @Date: 2022-10-26 09:24:29
 * @LastEditTime: 2023-01-06 16:42:20
 * @Description: 
-->
<script lang="ts" setup>
import { useNavStore } from '@/stores';
import Link from './Link.vue';
const { NavArr } = useNavStore();
const activeIndex = ref('0');
const haldleSelected = (index: string) => {
  activeIndex.value = index;
};
</script>
<template>
  <ElMenu :default-active="activeIndex" background-color="rgb(48, 65, 86)" text-color="#fff" mode="vertical"
    style="border-right: none;" router @select="haldleSelected">
    <div v-for="(nav, index) in NavArr" :key="index + 'adskjgkjer'">
      <ElSubMenu v-if="NavArr[index]?.children?.filter((n) => +n.visible === 1).length"
        :index="index + 'adskjgkjer' + nav.component">
        <template #title>
          <Link v-if="nav.component" :to="nav.component">
          <span class="ml-1">{{ nav.title }}</span>
          </Link>
          <span v-else class="ml-1">{{ nav.title }}</span>
        </template>
        <ElMenuItemGroup>
          <ElMenuItem style="padding: 0;" v-for="(sub, idx) in NavArr[index].children?.filter((n) => +n.visible === 1)"
            :key="index + '-' + idx + 'fdjahsuy'" :index="sub.component" :route="sub.component">
            <template #title>
              <Link class="block w-full text-left box-border pl-[40px] pr-[20px]" :to="sub.component">
              <span class="ml-1">{{ sub.title }}</span>
              </Link>
            </template>
          </ElMenuItem>
        </ElMenuItemGroup>
      </ElSubMenu>
      <ElMenuItem v-else :index="nav.component">
        <template #title>
          <Link :to="nav.component">
          <span class="ml-1">{{ nav.title }}</span>
          </Link>
        </template>
      </ElMenuItem>
    </div>
  </ElMenu>
</template>

<style>
.el-menu-item-group__title {
  display: none;
}
</style>