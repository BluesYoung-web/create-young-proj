<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 11:30:45
 * @LastEditTime: 2024-02-02 11:30:46
 * @Description:
-->
<script setup lang='ts'>
import CountUp from 'vue-countup-v3'

withDefaults(defineProps<{
  count: number
  showfix?: boolean
  decimalPlaces?: number
}>(), {
  decimalPlaces: 0,
  showfix: false,
})
</script>

<template>
  <CountUp :end-val="count" :decimal-places="decimalPlaces">
    <template v-if="showfix" #prefix>
      <span>+</span>
    </template>
    <template v-if="showfix" #suffix>
      <span>%</span>
    </template>
  </CountUp>
</template>
