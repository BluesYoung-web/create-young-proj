<!--
 * @Author: zhangyang
 * @Date: 2023-09-27 14:40:13
 * @LastEditTime: 2023-11-07 17:56:32
 * @Description:
-->
<script lang="ts" setup>
const { logo_url } = storeToRefs(useNavStore())
const { showAd } = storeToRefs(useAdStore())
</script>

<template>
  <div class="w-full top-0 fixed bg-white z-10 shadow" lt-md="w-100vw shadow-none" :class="[showAd ? 'h-160px lt-md:h-80px' : 'h-80px lt-md:h-44px']">
    <TopExtra v-if="showAd" />
    <div class="container h-80px m-auto flex justify-between items-center" lt-md="h-44px">
      <div class="left h-full flex items-center">
        <NuxtLink class="logo" to="/">
          <!-- 禁用懒加载插件，手动处理图片 -->
          <img class="cursor-pointer" width="143" height="42" lt-md="px-10px h-30px w-auto" :src="getFullServerUrl(logo_url)" alt="" data-not-lazy loading="eager">
        </NuxtLink>
        <TopNav />
      </div>
    </div>
  </div>
</template>
