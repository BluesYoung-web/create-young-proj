<!--
 * @Author: zhangyang
 * @Date: 2022-12-07 14:13:25
 * @LastEditTime: 2023-01-05 16:08:30
 * @Description: 
-->
<script lang="ts" setup>
import { useNavStore, TopIndex } from '@/stores';

const { TopMenu } = useNavStore();
</script>
<template>
  <div>
    <ElMenu mode="horizontal" :default-active="TopIndex" :ellipsis="(TopMenu.length > 10)">
      <ElMenuItem v-for="(nav, index) in TopMenu" :key="index + 'fdsjakr'" :index="index + ''"
        @click="(TopIndex = index + '')">
        {{ nav.title }}
      </ElMenuItem>
    </ElMenu>
  </div>
</template>