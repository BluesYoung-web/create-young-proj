<!--
 * @Author: zhangyang
 * @Date: 2022-08-12 17:44:54
 * @LastEditTime: 2023-11-08 10:59:26
 * @Description:
-->
<script lang="ts" setup>
defineProps<{
  modelValue: FollowItem[]
}>()
</script>

<template>
  <div v-if="modelValue.length" class="follow flex flex-wrap items-center mb-10px text-14px text-#f2f2f2">
    <div class="mr-16px">
      关注我们：
    </div>
    <div
      v-for="(item, index) in modelValue"
      :key="`${index}daseeffret34;q`"
      class="mr-15px w-30px relative"
    >
      <NuxtLink
        :to="item?.jump ?? '#'"
        target="_blank"
        @mouseenter="item.hidden = true"
        @mouseleave="item.hidden = false"
      >
        <img
          class="w-26px"
          :src="item.icon"
          alt=""
          loading="lazy"
        >
      </NuxtLink>
      <div
        class="absolute w-100px"
        :class="{ hidden: !item.hidden }"
      >
        <img
          :src="item.qrcode"
          alt=""
          loading="lazy"
        >
      </div>
    </div>
  </div>
</template>
