/*
 * @Author: zhangyang
 * @Date: 2023-06-21 12:03:42
 * @LastEditTime: 2023-06-26 17:17:59
 * @Description: 
 */
export const useUserStore = defineStore('useUserStore', () => {
  const cookie = useCookie<UserLoginRes>('token');

  const hasLogin = computed(() => !!cookie.value?.uuid);
  const avatar = computed(() => cookie.value?.headimgurl);
  const nick = computed(() => cookie.value?.nickname);
  const token = computed(() => cookie.value?.token);

  return {
    cookie,
    hasLogin,
    avatar,
    nick,
    token
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}