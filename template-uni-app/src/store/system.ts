/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:20:04
 * @LastEditTime: 2023-08-25 16:20:11
 * @Description:
 */
import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
import { defineStore } from 'pinia'

export const useSystemInfo = defineStore('useSystemInfo', () => {
  const systemInfo = ref<UniApp.GetSystemInfoResult>()
  const pagesInfo = ref<PageMetaDatum[]>([])

  return { systemInfo, pagesInfo }
})

export const useHttpLoading = defineStore('useHttpLoading', () => {
  const fullscreenLoading = ref(false)
  const smallLoading = ref(false)
  return { smallLoading, fullscreenLoading }
})
