/*
 * @Author: zhangyang
 * @Date: 2023-06-01 12:03:44
 * @LastEditTime: 2023-07-24 12:12:08
 * @Description:
 */
export const useNavStore = defineStore('useNavStore', () => {
  const title = ref('');
  const sub_title = ref('');
  const nav_arr = ref<NavArrItem[]>([]);
  const flat_nav_arr = ref<NavArrItem[]>([]);

  const active_nav = ref('');

  const isLoading = ref(false);
  const isCollapse = ref(false);

  watch(
    () => WindowSize['lt-md'],
    (v) => {
      isCollapse.value = v;
    },
  );

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
    flat_nav_arr,
    isLoading,
    isCollapse,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot));
}
