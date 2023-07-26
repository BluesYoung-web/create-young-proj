/*
 * @Author: zhangyang
 * @Date: 2023-05-28 16:01:24
 * @LastEditTime: 2023-07-25 16:26:19
 * @Description:
 */
import { randomId } from '@bluesyoung/utils';
import YoungChangePassword from '@/components/YoungChangePassword.vue';
import { createVNode, render } from 'vue';

/**
 * 补0函数
 */
export function addZero(s: number) {
  return s < 10 ? '0' + s : s;
}

/**
 * 生成数组的随机索引
 */
export function getRandomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

/**
 * 设备唯一标识
 */
export function getUUID() {
  return useLocalStorage('uuid', randomId() + randomId() + randomId() + randomId()).value;
}

/**
 * html 转 text
 */
export function html2text(html: string) {
  if (!html) {
    return '';
  }
  return html.toString().replace(/<[^>]+>/g, '');
}

/**
 * 响应式的屏幕大小
 */
export const WindowSize = reactive({
  'lt-sm': useMediaQuery('(max-width: 639.9px)'),
  sm: useMediaQuery('(min-width: 640px)'),
  'lt-md': useMediaQuery('(max-width: 767.9px)'),
  md: useMediaQuery('(min-width: 768px)'),
  'lt-lg': useMediaQuery('(max-width: 1023.9px)'),
  lg: useMediaQuery('(min-width: 1024px)'),
  'lt-xl': useMediaQuery('(max-width: 1279.9px)'),
  xl: useMediaQuery('(min-width: 1280px)'),
  'lt-2xl': useMediaQuery('(max-width: 1535.9px)'),
  '2xl': useMediaQuery('(min-width: 1536px)'),
});

/**
 * 分页是否超过一页
 */
export function moreThanOnePage(query: {
  total: number;
  limit: number;
}) {
  return query.total > query.limit;
}

/**
 * 当前浏览器是否支持下载
 */
export function isSupportDownload() {
  const NotAllowed = [/Alipay/gim, /BYTEDANCE/gim, /DINGTALK/gim, /MICROMESSENGER/gim];

  return !NotAllowed.some((reg) => reg.test(navigator.userAgent));
}

/**
 * 登录校验
 */
export function checkLogin(force = true) {
  const { hasLogin } = storeToRefs(useUserStore());

  if (!hasLogin.value) {
    force &&
      showDialog({
        title: '温馨提示',
        message: '未登录，请登录后再继续！',
        showCancelButton: true,
      })
        .then(() => {
          navigateTo(
            `/login?redirect=${encodeURIComponent(location.href.replace(location.origin, ''))}`,
          );
        })
        .catch(() => {
          navigateTo({
            path: '/',
            replace: true,
          });
        });
    return false;
  } else {
    return true;
  }
}

/**
 * 页面滚动是否超过一定距离
 */
export function useScrollOver(distance = 40) {
  const { y } = useScroll(window);
  const scrolled = computed(() => y.value > distance);

  return {
    scrolled,
  };
}

/**
 * 生成用户导航栏
 * todo: 实现
 */
export async function generateNavData(force = false) {
  const { hasLogin } = storeToRefs(useUserStore());
  if (!hasLogin.value) {
    showNotify({
      type: 'danger',
      message: '登录过期，请重新登录！'
    });

    return navigateTo('/login');
  }

  // 清除没有子元素的children
  const clearChildren = <T extends Record<string, any>>(arr: T[]) => {
    for (const item of arr) {
      if (item?.children?.length === 0) {
        delete item.children;
      } else if (item.children) {
        clearChildren(item.children);
      }
    }
    return arr;
  };

  const { nav_arr, flat_nav_arr, auth_routes } = storeToRefs(useNavStore());

  const tree = await apis.get.getUserMenuTree();
  const menu = Object.values(tree);

  /**
   * 最终导航数组
   */
  nav_arr.value = clearChildren(menu.filter((item) => +item.visible === 1));

  let role_route: string[] = [];
  const generateRoleRoute = (arr: NavArrItem[], num?: number): string[] => {
    if (num === 1) {
      role_route = [];
      flat_nav_arr.value = [];
    }
    for (const item of arr) {
      if (item.component) {
        role_route.push(item.component);
        +item.visible === 1 && flat_nav_arr.value.push(item);
      }
      // 子节点递归遍历
      if (Array.isArray(item.children) && item.children.length > 0) {
        const part = JSON.parse(JSON.stringify(item.children));
        // 尾递归优化
        generateRoleRoute(part);
      }
    }
    return role_route;
  };

  auth_routes.value = generateRoleRoute(menu, 1);
}

/**
 * 修改密码
 */
export function useChangePassword() {
  const appendTo = document.createElement('div');

  const vnode = createVNode(YoungChangePassword, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
    },
  });
  render(vnode, appendTo);

  document.body.appendChild(appendTo);

  vnode.component!.exposed?.show();
}
