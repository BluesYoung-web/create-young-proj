/*
 * @Author: zhangyang
 * @Date: 2023-06-21 12:03:42
 * @LastEditTime: 2023-07-24 14:05:13
 * @Description:
 */
export const useUserStore = defineStore('useUserStore', () => {
  const cookie = useLocalStorage<UserLoginRes>('token', {} as UserLoginRes);

  const hasLogin = computed(() => !!cookie.value?.uuid);
  const avatar = computed(() => cookie.value?.headimgurl);
  const nick = computed(() => cookie.value?.nickname);
  const token = computed(() => cookie.value?.token);

  const SaveFlag = useLocalStorage('n天免登', true);

  return {
    cookie,
    hasLogin,
    avatar,
    nick,
    token,
    SaveFlag,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
