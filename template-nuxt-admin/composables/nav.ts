/*
 * @Author: zhangyang
 * @Date: 2023-06-01 12:03:44
 * @LastEditTime: 2023-07-28 17:43:00
 * @Description:
 */
export const useNavStore = defineStore('useNavStore', () => {
  const title = ref('');
  const sub_title = ref('');
  /**
   * 树形导航数组(仅可见)
   */
  const nav_arr = ref<NavArrItem[]>([]);
  /**
   * 拍平之后的导航数组(仅可见，用于快速搜索)
   */
  const flat_nav_arr = ref<NavArrItem[]>([]);
  /**
   * 拥有权限的路由
   */
  const auth_routes = ref<string[]>([]);

  const active_nav = ref('');

  const isLoading = ref(false);
  const isCollapse = ref(false);

  watch(
    () => WindowSize['lt-lg'],
    (v) => {
      isCollapse.value = v;
    },
    {
      immediate: true,
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
    auth_routes,
    isLoading,
    isCollapse,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot));
}
