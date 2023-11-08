/*
 * @Author: zhangyang
 * @Date: 2023-09-27 17:12:10
 * @LastEditTime: 2023-09-27 17:12:14
 * @Description:
 */
export const useAdStore = defineStore('ad', () => {
  const showAd = ref(false)
  const img_ad = ref('')
  const img_btn = ref('')

  return {
    showAd,
    img_ad,
    img_btn,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdStore, import.meta.hot))
