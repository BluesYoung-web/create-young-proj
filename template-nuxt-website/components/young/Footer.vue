<!--
 * @Author: zhangyang
 * @Date: 2023-09-27 14:40:31
 * @LastEditTime: 2023-10-11 16:07:14
 * @Description:
-->
<script lang="ts" setup>
const logo_bottom = ref('')
const friend_links = ref<FriendLinkItem[]>([])
const follow_us = ref<FollowItem[]>([])
const about_nav = ref<AboutNavItem[]>([])

const { data } = await useFetch('/api/get_footer_info')

if (!data.value)
  throw createError('底部信息获取失败')

const beian = data.value.beian
logo_bottom.value = data.value.logo_bottom
friend_links.value = data.value.friend_links
follow_us.value = data.value.follow_us
about_nav.value = data.value.about_nav
</script>

<template>
  <footer class="w-full " md="bg-[#4E5053]">
    <div class="container py-50px mx-auto flex items-center h-[280px]" lt-md="!hidden">
      <div class="img w-240px">
        <NuxtLink to="/">
          <img :src="logo_bottom" title="底部logo" alt="">
        </NuxtLink>
      </div>
      <div class="info ml-117px text-white">
        <FriendLink v-model="friend_links" />
        <Follow v-model="follow_us" />
        <AboutNav v-model="about_nav" />

        <div class="text-12px font-500 text-gray-400 reset-img" v-html="beian" />
      </div>
    </div>
    <AboutNav v-model="about_nav" md="!hidden" class="container mx-auto px-10px" />
    <div class="pt-0 pb-92px text-12px font-500 text-gray-400 reset-img container mx-auto px-10px" md="!hidden" v-html="beian" />
  </footer>
</template>
