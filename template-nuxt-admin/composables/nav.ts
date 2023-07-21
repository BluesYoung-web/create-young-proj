/*
 * @Author: zhangyang
 * @Date: 2023-06-01 12:03:44
 * @LastEditTime: 2023-07-21 09:04:01
 * @Description:
 */
export const useNavStore = defineStore('useNavStore', () => {
  const title = ref('');
  const sub_title = ref('');
  const nav_arr = ref<NavItem[]>([]);

  const active_nav = ref('');

  const isLoading = ref(false);

  watchEffect(() => {
    if (isLoading.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  return {
    title,
    sub_title,
    nav_arr,
    active_nav,
    isLoading,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot));
}
