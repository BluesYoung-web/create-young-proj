/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:01:00
 * @LastEditTime: 2023-07-19 16:50:39
 * @Description:
 */
import { randomId } from '@bluesyoung/utils'

export interface LocationInfo {
  longitude: string | number
  latitude: string | number
  city?: string
  timer: number
}
export interface NavInfo {
  /**
   * 系统状态栏高度
   */
  statusBarH: number
  /**
   * 自定义导航栏高度 = 胶囊下距离 + 胶囊上距离 - 状态栏高度
   */
  customBarH: number
  /**
   * 底部安全距离
   */
  safeBottom: number
}

export const getLocationInfo = () => uni.getStorageSync(YoungStorageKeys.位置信息) as LocationInfo
export function setLocationInfo(v: LocationInfo) {
  return uni.setStorageSync(YoungStorageKeys.位置信息, v)
}
export const removeLocationInfo = () => uni.removeStorageSync(YoungStorageKeys.位置信息)

export const getUuid = () => uni.getStorageSync(YoungStorageKeys.唯一标识) as string
export function setUuid() {
  return uni.setStorageSync(YoungStorageKeys.唯一标识, randomId() + randomId() + randomId() + randomId())
}

export const setNavbarHeihgt = (v: NavInfo) => uni.setStorageSync(YoungStorageKeys.导航栏高度, v)
export const getNavbarHeihgt = () => uni.getStorageSync(YoungStorageKeys.导航栏高度) as NavInfo
