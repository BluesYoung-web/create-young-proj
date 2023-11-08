<!--
 * @Author: zhangyang
 * @Date: 2023-10-11 17:30:55
 * @LastEditTime: 2023-11-08 10:56:14
 * @Description:
-->
<script lang="ts" setup>
import { deepClone } from '@bluesyoung/utils'

const route = useRoute()

const { logo_url, kj_logo_url, nav_arr, seo } = storeToRefs(useNavStore())
const { showAd, img_ad, img_btn } = storeToRefs(useAdStore())

const [
  { data: nav_data },
  { data: seo_info },
] = await Promise.all([
  useFetch('/api/get_head_nav'),
  useFetch('/api/get_seo_info', {
    params: {
      page: route.path,
    },
  }),
])

if (!nav_data.value || !seo_info.value)
  throw createError('数据获取失败')

logo_url.value = getFullServerUrl(nav_data.value.logo_url)
kj_logo_url.value = getFullServerUrl(nav_data.value.kj_logo_url)
nav_arr.value = nav_data.value.nav_arr
showAd.value = nav_data.value.showAd
img_ad.value = nav_data.value.img_ad
img_btn.value = nav_data.value.img_btn
seo.value = deepClone(seo_info.value!)

useHead({
  meta: [
    { name: 'keywords', content: seo.value.keywords },
  ],
})

useSeoMeta({
  title: seo.value.title,
  ogTitle: seo.value.title,
  twitterTitle: seo.value.title,
  description: seo.value.description,
  ogDescription: seo.value.description,
  twitterDescription: seo.value.description,
  ogImage: logo_url.value,
  twitterImage: logo_url.value,
  twitterCard: 'summary_large_image',
  ogUrl: nav_data.value.site_url,
  ogType: 'website',
})

const isFull = computed(() => route.query.full || route.meta.full)
</script>

<template>
  <!-- PC 顶部导航栏 & 移动端首页导航栏 -->
  <YoungHeader />

  <main class="m-auto" :class="[showAd ? 'mt-160px min-h-[calc(100vh-160px)] lt-md:mt-80px lt-md:min-h-[calc(100vh-80px)]' : 'mt-80px min-h-[calc(100vh-80px)] lt-md:mt-44px min-h-[calc(100vh-44px)]']">
    <div class="m-auto" lt-md="px-10px" :class="[isFull ? 'w-full' : 'container']">
      <NuxtPage />
    </div>
  </main>

  <!-- 底部 -->
  <LazyYoungFooter />
  <!-- 移动端 tabbar -->
  <LazyYoungTabbar />
</template>
