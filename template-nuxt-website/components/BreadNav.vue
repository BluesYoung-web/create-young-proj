<!--
 * @Author: zhangyang
 * @Date: 2022-08-14 14:14:58
 * @LastEditTime: 2023-10-08 16:01:13
 * @Description:
-->
<script lang="ts" setup>
defineProps<{
  navArr: BreadNavItem[]
}>()
</script>

<template>
  <div class="bread flex text-16px h-24px lh-24px font-400 color-[#333]" lt-md="!hidden">
    <div class="mr-30px">
      您当前的位置是：
    </div>
    <div
      v-for="(item, index) in navArr"
      :key="`${index}dasrerbgfg`"
      class="flex"
    >
      <NuxtLink
        :to="item.href"
        :title="item.title"
        class="hover:text-[#0090ee] block max-w-300px truncate"
      >
        {{ item.title }}
      </NuxtLink>
      <div v-if="index !== navArr.length - 1" class="mx-10px">
        &gt;
      </div>
    </div>
  </div>
</template>
