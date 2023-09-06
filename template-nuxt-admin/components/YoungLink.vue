<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 14:47:12
 * @LastEditTime: 2023-07-26 10:39:40
 * @Description:
-->
<script lang="ts" setup>
import { isHttpUrl } from '@bluesyoung/utils'

defineProps<{ to: string }>()
</script>

<template>
  <a v-if="isHttpUrl(to)" :href="to" target="_blank" rel="noopener" referrerpolicy="no-referrer" class="w-full">
    <div class="flex items-center">
      <slot />
    </div>
  </a>
  <NuxtLink v-else :to="to" class="w-full">
    <div class="flex items-center">
      <slot />
    </div>
  </NuxtLink>
</template>
