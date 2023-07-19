/*
 * @Author: zhangyang
 * @Date: 2023-07-18 14:24:35
 * @LastEditTime: 2023-07-19 16:51:57
 * @Description:
 */
import type { SubscribeMessage } from '@/config';

/**
 * 订阅指定的消息
 */
export const subscribeMessage = (tmplIds: SubscribeMessage[]) =>
  new Promise((resolve) => {
    uni.requestSubscribeMessage({
      tmplIds,
      success: (res) => {
        console.log('消息订阅成功：', res);
      },
      fail: (err) => {
        console.log('消息订阅失败：', err);
      },
      complete: () => resolve(true),
    });
  });

/**
 * 获取系统信息 设置导航栏高度
 */
export const getSystemInfo = () => {
  const { systemInfo } = storeToRefs(useSystemInfo());
  return new Promise<UniApp.GetSystemInfoResult>((_resolve) => {
    uni.getSystemInfo({
      success: (e) => {
        console.log(e, 'getSystemInfo');
        systemInfo.value = e;
        // 获取手机状态栏高度
        let statusBar = e.statusBarHeight || 0;
        let customBar;

        // #ifndef MP
        customBar = statusBar + (e.platform == 'android' ? 50 : 45);
        // #endif

        // #ifdef MP-WEIXIN
        // 获取胶囊按钮的布局位置信息
        let menu = uni.getMenuButtonBoundingClientRect();
        // 导航栏高度 = 胶囊下距离 + 胶囊上距离 - 状态栏高度
        customBar = menu.bottom + menu.top - statusBar;
        // #endif

        // #ifdef MP-ALIPAY
        customBar = statusBar + (e.titleBarHeight || 0);
        // #endif

        const safeBottom = e.screenHeight - (e.safeArea ? (e.safeArea.height + e.safeArea.top) : 0);

        setNavbarHeihgt({
          statusBarH: statusBar,
          customBarH: customBar,
          safeBottom
        });
        _resolve(e);
      },
    });
  });
};
