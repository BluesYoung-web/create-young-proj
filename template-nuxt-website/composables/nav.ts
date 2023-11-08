/*
 * @Author: zhangyang
 * @Date: 2023-06-01 12:03:44
 * @LastEditTime: 2023-10-11 19:40:10
 * @Description:
 */
export const useNavStore = defineStore('useNavStore', () => {
  const logo_url = ref('')
  const kj_logo_url = ref('')
  const nav_arr = ref<NavItem[]>([])

  const active_nav = ref('')

  const seo = ref<SeoInfo>({
    title: '',
    keywords: '',
    description: '',
  })

  return {
    logo_url,
    kj_logo_url,
    nav_arr,
    active_nav,
    seo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))
