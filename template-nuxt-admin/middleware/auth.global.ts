/*
 * @Author: zhangyang
 * @Date: 2023-07-21 10:02:19
 * @LastEditTime: 2023-07-31 12:16:20
 * @Description:
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.matched.length === 0) {
    throw createError({ message: '页面不存在', statusCode: 404 });
  }

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
    if (hasPermission(to.path)) {
      addView(to);
      return;
    } else {
      throw createError({ message: '无权限，请联系系统管理员', statusCode: 403 });
    }
  }
});
