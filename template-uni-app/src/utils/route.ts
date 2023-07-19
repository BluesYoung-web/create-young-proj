/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:24:39
 * @LastEditTime: 2023-07-19 16:51:49
 * @Description:
 */
import type { Pages } from '@/config';

interface IRoute {
  /**
   * 路由类型
   */
  type: ENUM_ROUTE_TYPE;
  /**
   * 路由路径
   */
  url: string;
  /**
   * 路由参数
   */
  params?: Record<string, any>;
  /**
   * 回退的层数 uni.navigateBack
   * @default 1
   */
  delta?: number;
  /**
   * 是否编码
   */
  encode?: boolean;
}

/**
 * 路由类型
 */
enum ENUM_ROUTE_TYPE {
  TO = 'navigateTo',
  REDIRECT = 'redirectTo',
  TAB = 'switchTab',
  RELAUNCH = 'reLaunch',
  BACK = 'navigateBack',
}

const params2Url = (params: Record<string, any>, encode = false) => {
  const arr = [];
  for (const key in params) {
    arr.push(`${key}=${encode ? encodeURIComponent(params[key]) : params[key]}`);
  }
  return arr.join('&');
};

/**
 * 路由跳转
 */
export function route({ type, url, params, delta = 1, encode }: IRoute) {
  if (type !== ENUM_ROUTE_TYPE.BACK && params) {
    url = `${url}?${params2Url(params, encode)}`;
  }

  switch (type) {
    case ENUM_ROUTE_TYPE.TO:
      uni.navigateTo({
        url,
      });
      break;

    case ENUM_ROUTE_TYPE.REDIRECT:
      uni.redirectTo({
        url,
      });
      break;

    case ENUM_ROUTE_TYPE.TAB:
      uni.switchTab({
        url,
      });
      break;

    case ENUM_ROUTE_TYPE.RELAUNCH:
      uni.reLaunch({
        url,
      });
      break;
    case ENUM_ROUTE_TYPE.BACK:
      uni.navigateBack({
        delta,
      });
      break;

    default:
      break;
  }
}

export function to(url: Pages, params?: Record<string, any>, encode?: boolean) {
  if (TabbarArr.includes(url)) {
    tabbar(url, params, encode);
  } else {
    route({
      type: ENUM_ROUTE_TYPE.TO,
      url,
      params,
      encode,
    });
  }
}

export function redirect(url: Pages, params?: Record<string, any>, encode?: boolean) {
  if (TabbarArr.includes(url)) {
    tabbar(url, params, encode);
  } else {
    route({
      type: ENUM_ROUTE_TYPE.REDIRECT,
      url,
      params,
      encode,
    });
  }
}

export function tabbar(url: Pages, params?: Record<string, any>, encode?: boolean) {
  if (TabbarArr.includes(url)) {
    route({
      type: ENUM_ROUTE_TYPE.TAB,
      url,
      params,
      encode,
    });
  } else {
    to(url, params, encode);
  }
}

export function relaunch(url: Pages, params?: Record<string, any>, encode?: boolean) {
  route({
    type: ENUM_ROUTE_TYPE.RELAUNCH,
    url,
    params,
    encode,
  });
}

export function back(delta?: number) {
  route({
    type: ENUM_ROUTE_TYPE.BACK,
    delta,
    url: '',
  });
}
