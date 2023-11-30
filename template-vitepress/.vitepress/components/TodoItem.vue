<!--
 * @Author: zhangyang
 * @Date: 2023-11-17 10:56:27
 * @LastEditTime: 2023-11-17 14:05:37
 * @Description:
-->
<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center cursor-pointer my-2" @click="checked = !checked">
    <div class="mr-2">
      {{ checked ? '✅' : '⬜️' }}
    </div>
    <slot />
  </div>
</template>
