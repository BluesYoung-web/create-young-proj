/*
 * @Author: zhangyang
 * @Date: 2023-06-21 12:03:42
 * @LastEditTime: 2023-09-08 10:33:28
 * @Description:
 */
export const useUserStore = defineStore('useUserStore', () => {
  const cookie = useLocalStorage<UserLoginRes>('token', {} as UserLoginRes)

  const avatar = computed(() => cookie.value?.headimgurl)
  const nick = computed(() => cookie.value?.nickname)
  const token = computed(() => {
    if (!validateToken())
      removeToken()

    return cookie.value?.token
  })
  const hasLogin = computed(() => !!token.value)

  const SaveFlag = useLocalStorage('n天免登', true)
  const Exptime = useLocalStorage('token过期时间', 0)

  function validateToken() {
    const now = Date.now()
    const exp = Exptime.value
    return now < exp
  }

  function removeToken() {
    cookie.value = undefined
  }

  return {
    cookie,
    hasLogin,
    avatar,
    nick,
    token,
    SaveFlag,
    Exptime,
    removeToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
