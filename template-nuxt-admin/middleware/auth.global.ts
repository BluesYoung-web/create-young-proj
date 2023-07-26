/*
 * @Author: zhangyang
 * @Date: 2023-07-21 10:02:19
 * @LastEditTime: 2023-07-26 10:47:14
 * @Description:
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { addView } = useTagsStore();

  // 页面无需登录
  if (to.meta.auth === false) {
    addView(to);
    return;
  }

  const { hasLogin } = storeToRefs(useUserStore());
  const { nav_arr } = storeToRefs(useNavStore());

  if (!hasLogin.value && to.path !== '/login') {
    // 页面需要登录，但是未登录
    showFailToast('未登录或登录过期，请重新登录');
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  } else if (hasLogin.value && to.path === '/login') {
    // 已登录进入登录页
    return navigateTo('/');
  } else {
    nav_arr.value.length === 0 && (await generateNavData());
    addView(to);
    return;
  }
});
