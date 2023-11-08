<!--
 * @Author: zhangyang
 * @Date: 2022-08-12 17:28:06
 * @LastEditTime: 2023-11-08 10:59:37
 * @Description:
-->
<script lang="ts" setup>
defineProps<{
  modelValue: FriendLinkItem[]
}>()
</script>

<template>
  <div v-if="modelValue.length" class="flex text-14px items-center text-#f2f2f2 mb-10px">
    <p class="h-24px lh-24px mr-8px">
      友情链接：
    </p>
    <div class="friend-link">
      <ul class="flex flex-wrap">
        <li
          v-for="(link, index) in modelValue"
          :key="`${index}ewrwecfrg`"
          class="not-last:border-r px-18px lh-14px first:pr-18px !first:pl-0 last:pl-18px last:pr-0"
        >
          <NuxtLink
            :to="link.href"
            :title="link.title"
            target="_blank"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
