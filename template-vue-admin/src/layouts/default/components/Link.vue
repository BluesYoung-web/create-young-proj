<!--
 * @Author: zhangyang
 * @Date: 2022-10-25 17:32:07
 * @LastEditTime: 2023-01-05 16:54:27
 * @Description: 
-->
<template>
  <a v-if="linkProps(to) === 'a'" :href="to" target="_blank" rel="noopener">
    <div class="flex items-center">
      <slot />
    </div>
  </a>
  <router-link v-else :to="to">
    <div class="flex items-center">
      <slot />
    </div>
  </router-link>
</template>
<script lang="ts" setup>
import { isHttpUrl } from '@bluesyoung/utils';
const props = defineProps<{ to: string }>();
const linkProps = (url: string) => isHttpUrl(url) ? 'a' : 'router-link';
</script>