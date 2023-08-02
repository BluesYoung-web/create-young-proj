/*
 * @Author: zhangyang
 * @Date: 2023-07-21 10:02:19
 * @LastEditTime: 2023-08-02 14:57:03
 * @Description:
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.matched.length === 0) {
    throw createError({ message: '页面不存在', statusCode: 404 });
  }

  const { hasLogin } = storeToRefs(useUserStore());
  const { nav_arr, flat_nav_arr } = storeToRefs(useNavStore());

  const changeTitle = () => {
    const nav = flat_nav_arr.value.find((item) => item.component === to.path);
    if (nav && nav.title) {
      to.meta.title = nav.title;
    }

    document.title = (to.meta.title as string) || window.__YOUNG_ENV__.NUXT_PUBLIC_TITLE;
  };

  const { addView } = useTagsStore();

  // 页面无需登录
  if (to.meta.auth === false) {
    changeTitle();
    addView(to);
    return;
  }

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
      changeTitle();
      addView(to);
      return;
    } else {
      throw createError({ message: '无权限，请联系系统管理员', statusCode: 403 });
    }
  }
});
