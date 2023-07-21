/*
 * @Author: zhangyang
 * @Date: 2023-05-28 16:01:24
 * @LastEditTime: 2023-07-21 08:59:56
 * @Description:
 */
import { randomId } from '@bluesyoung/utils';

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
};

/**
 * 响应式的屏幕大小
 */
export const WindowSize = reactive({
  'lt-sm': useMediaQuery('(max-width: 639.9px)'),
  'sm': useMediaQuery('(min-width: 640px)'),
  'lt-md': useMediaQuery('(max-width: 767.9px)'),
  'md': useMediaQuery('(min-width: 768px)'),
  'lt-lg': useMediaQuery('(max-width: 1023.9px)'),
  'lg': useMediaQuery('(min-width: 1024px)'),
  'lt-xl': useMediaQuery('(max-width: 1279.9px)'),
  'xl': useMediaQuery('(min-width: 1280px)'),
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
};

/**
 * 当前浏览器是否支持下载
 */
export function isSupportDownload() {
  const NotAllowed = [
    /Alipay/img,
    /BYTEDANCE/img,
    /DINGTALK/img,
    /MICROMESSENGER/img
  ];

  return !NotAllowed.some((reg) => reg.test(navigator.userAgent));
};

/**
 * 登录校验
 */
export function checkLogin(force = true) {
  const { hasLogin } = storeToRefs(useUserStore());

  if (!hasLogin.value) {
    force && showDialog({
      title: '温馨提示',
      message: '未登录，请登录后再继续！',
      showCancelButton: true
    }).then(() => {
      navigateTo(`/login?redirect=${encodeURIComponent(location.href.replace(location.origin, ''))}`);
    }).catch(() => {
      navigateTo({
        path: '/',
        replace: true
      });
    });
    return false;
  } else {
    return true;
  }
};

/**
 * 页面滚动是否超过一定距离
 */
export function useScrollOver(distance = 40) {
  const { y } = useScroll(window);
  const scrolled = computed(() => y.value > distance);

  return {
    scrolled,
  };
};
