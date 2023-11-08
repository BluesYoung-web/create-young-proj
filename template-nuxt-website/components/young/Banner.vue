<!--
 * @Author: zhangyang
 * @Date: 2023-05-26 16:12:47
 * @LastEditTime: 2023-11-02 17:18:29
 * @Description:
-->
<script lang="ts" setup>
import type SwiperClass from 'swiper/types/swiper-class'

const props = defineProps<{
  banners: BannerItem[]
  hideTitle?: boolean
  preload?: boolean
}>()

const swiperContainer = ref<SwiperClass>()
const swiperRef = ref<any>({})

function videoPlay() {
  swiperContainer.value?.autoplay?.stop?.()
}
function videoPause() {
  swiperContainer?.value?.autoplay?.start?.()
}

function onSwiper(swiper: SwiperClass) {
  swiperContainer.value = swiper
}

const autoPlay = computed(() => props.banners.length > 1)
</script>

<template>
  <Swiper
    v-if="banners.length > 0" ref="swiperContainer" class="text-center relative"
    :slides-per-view="1" :pagination="autoPlay ? { clickable: true } : false" :scrollbar="{ draggable: true }"
    :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]" :allow-touch-move="true"
    :loop="autoPlay" :autoplay="autoPlay" :observer="true" :observe-parents="true" @swiper="(s) => onSwiper(s)"
  >
    <SwiperSlide
      v-for="(banner, index) in banners" :key="`${index}dase3wtgfdv`" :swiper-ref="swiperRef"
    >
      <video
        v-if="banner.is_video" class="w-full mx-auto" controls :src="getFullServerUrl(banner.img_url)" :poster="getFullServerUrl(`${banner.img_url}?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,ar_auto`, false)"
        webkit-playsinline="webkit-playsinline"
        playsinline
        @play="videoPlay" @pause="videoPause"
      />
      <img
        v-else class="w-full h-full"
        :src="getFullServerUrl(banner.img_url)"
        alt=""
        referrerpolicy="no-referrer"
        :class="{ 'cursor-pointer': banner.android_url || banner.ios_url }"
        :loading="index === 0 ? preload ? 'eager' : 'lazy' : 'lazy'"
        data-not-lazy
        @click="goDownload(banner.android_url, banner.ios_url)"
      >
      <div
        v-if="!hideTitle && banner.title"
        class="absolute top-0 bg-white opacity-80 w-full text-18px font-500 text-[#333] lh-27px py-20px text-left indent"
        lt-md="hidden"
      >
        {{ banner.title }}
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
:deep(.swiper-pagination) {
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  z-index: 11;
}

:deep(.swiper-pagination-bullet) {
  width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));
  height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));
  display: inline-block;
  border-radius: 50%;
  background: var(--swiper-pagination-bullet-inactive-color, #000);
  opacity: var(--swiper-pagination-bullet-inactive-opacity, .4);
  @apply m-1 cursor-pointer;
}

:deep(.swiper-pagination-bullet-active) {
  background: #007aff;
}

:deep(.swiper-wrapper) {
  @apply flex items-center;
}

:deep(.swiper-scrollbar) {
  display: none;
}
</style>
