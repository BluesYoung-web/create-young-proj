<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 14:47:12
 * @LastEditTime: 2023-07-21 16:22:03
 * @Description:
-->
<script lang="ts" setup>
import { isHttpUrl } from '@bluesyoung/utils';
defineProps<{ to: string }>();
</script>

<template>
  <a v-if="isHttpUrl(to)" :href="to" target="_blank" rel="noopener" referrerpolicy="no-referrer">
    <div class="flex items-center">
      <slot />
    </div>
  </a>
  <NuxtLink v-else :to="to">
    <div class="flex items-center">
      <slot />
    </div>
  </NuxtLink>
</template>
