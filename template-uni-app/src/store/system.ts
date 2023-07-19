/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:20:04
 * @LastEditTime: 2023-07-18 15:20:04
 * @Description:
 */
import { defineStore } from 'pinia';

export const useSystemInfo = defineStore('useSystemInfo', () => {
  const systemInfo = ref<UniApp.GetSystemInfoResult>();
  return { systemInfo };
});
