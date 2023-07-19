/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:01:00
 * @LastEditTime: 2023-07-18 15:17:10
 * @Description:
 */
import { YoungStorageKeys } from '@/config';
import { randomId } from '@bluesyoung/utils';

export type LocationInfo = {
  longitude: string | number;
  latitude: string | number;
  city?: string;
  timer: number;
};
export type NavInfo = {
  statusBarH: number;
  customBarH: number;
};

export const getLocationInfo = () => uni.getStorageSync(YoungStorageKeys.位置信息) as LocationInfo;
export const setLocationInfo = (v: LocationInfo) =>
  uni.setStorageSync(YoungStorageKeys.位置信息, v);
export const removeLocationInfo = () => uni.removeStorageSync(YoungStorageKeys.位置信息);

export const getUuid = () => uni.getStorageSync(YoungStorageKeys.唯一标识) as string;
export const setUuid = () =>
  uni.setStorageSync(YoungStorageKeys.唯一标识, randomId() + randomId() + randomId() + randomId());

export const setNavbarHeihgt = (v: NavInfo) => uni.setStorageSync(YoungStorageKeys.导航栏高度, v);
export const getNavbarHeihgt = () => uni.getStorageSync(YoungStorageKeys.导航栏高度) as NavInfo;
