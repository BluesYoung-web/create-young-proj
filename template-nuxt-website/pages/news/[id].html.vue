<!--
 * @Author: zhangyang
 * @Date: 2022-08-15 10:04:05
 * @LastEditTime: 2023-11-08 10:51:31
 * @Description:
-->
<script lang="ts" setup>
const { active_nav } = storeToRefs(useNavStore())

definePageMeta({
  name: '文章详情',
})

if (process.client)
  active_nav.value = '/news.html'

const route = useRoute()
const { id } = route.params

const bread_nav: BreadNavItem[] = [
  { title: '首页', href: '/' },
  { title: '资讯', href: '/news.html' },
  { title: '新闻', href: `/news/${id}.html` },
]

useHead({
  meta: [
    {
      name: 'keywords',
      content: '我是关键字',
    },
  ],
})

useSeoMeta({
  title: '我是标题',
  ogTitle: '我是标题',
  twitterTitle: '我是标题',
  description: '我是描述',
  ogDescription: '我是描述',
  twitterDescription: '我是描述',
  twitterCard: 'summary_large_image',
  ogType: 'article',
})
</script>

<template>
  <div>
    <div class="pt-20px flex justify-between text-16px lh-24px font-400 color-[#333]" lt-md="pt-0">
      <BreadNav :nav-arr="bread_nav" />
    </div>
    <div class="w-[62.5%] mx-auto mb-80px reset-img" lt-md="w-full">
      params：
      - id: {{ id }}
    </div>
  </div>
</template>
