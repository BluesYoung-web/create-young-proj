/*
 * @Author: zhangyang
 * @Date: 2023-07-21 10:02:19
 * @LastEditTime: 2023-07-21 10:10:08
 * @Description:
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  // 页面无需登录
  if (to.meta.auth === false) {
    return;
  }

  const { hasLogin } = storeToRefs(useUserStore());

  if (!hasLogin.value && to.path !== '/login') {
    // 页面需要登录，但是未登录
    showFailToast('未登录或登录过期，请重新登录');
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  } else if (hasLogin.value && to.path === '/login') {
    // 已登录进入登录页
    return navigateTo('/');
  } else {
    return;
  }
});
