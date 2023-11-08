<!--
 * @Author: zhangyang
 * @Date: 2022-08-14 09:48:09
 * @LastEditTime: 2023-11-08 11:00:37
 * @Description:
-->
<script lang="ts" setup>
defineProps<{
  modelValue: AboutNavItem[]
}>()
</script>

<template>
  <div v-if="modelValue.length" class="about mb-10px text-14px text-[#f2f2f2]" lt-md="text-[#999]">
    <ul class="flex flex-wrap">
      <li
        v-for="(item, index) in modelValue"
        :key="`${index}feurycsre`"
        class="not-last:mr-30px"
      >
        <NuxtLink :to="item.url" target="_blank" :title="item.title">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
