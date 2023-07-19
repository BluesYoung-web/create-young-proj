/*
 * @Author: zhangyang
 * @Date: 2023-07-18 14:28:16
 * @LastEditTime: 2023-07-18 15:06:05
 * @Description: 权限相关
 */
import { getLocationInfo, removeLocationInfo, setLocationInfo } from '@/store';
import { showModal } from '.';

/**
 * 获取微信授权码
 */
export const getWxCode = async () =>
  new Promise<string>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res.errMsg === 'login:ok') {
          resolve(res.code);
        } else {
          reject('wechat auth fail');
        }
      },
      fail: () => {
        reject('wechat auth fail');
      },
    });
  });

/**
 * 定位
 */
export const locate = (cancelback = true) =>
  new Promise<UniApp.GetLocationSuccess & { timer?: number }>((_resolve, _reject) => {
    const position = getLocationInfo();
    // 系统 getLocation 30s 获取一次  这里延续到 60s
    if (new Date().getTime() - position.timer < 1000 * 60) {
      setLocationInfo(position);
      _resolve(position as unknown as UniApp.GetLocationSuccess);
    } else {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          setLocationInfo({
            latitude: res.latitude,
            longitude: res.longitude,
            timer: Date.now(),
          });

          console.log(res, 'location');
          _resolve(res);
        },
        fail: (res: UniApp.GetLocationSuccess & { errMsg: string }) => {
          console.log(res, 'location');
          if (cancelback) {
            _reject(res);
          } else {
            _resolve(position as unknown as UniApp.GetLocationSuccess);
          }
        },
      });
    }
  });

/**
 * 授权定位
 * @param {boolean} cancelback  取消授权时是否有回调值
 */
export const authLocation = async (cancelback = true, isShowModal = true) =>
  new Promise<UniApp.GetLocationSuccess>(async (resolve, reject) => {
    uni.getSetting({
      withSubscriptions: true,
      success: async (conf) => {
        if (conf.authSetting['scope.userLocation']) {
          // 同意过定位授权
          const position = await locate();
          uni.$emit('sure_location', true);
          resolve(position);
        } else {
          try {
            const position = await locate();
            uni.$emit('sure_location', true);
            resolve(position);
          } catch (error) {
            console.log(error);
            if (isShowModal) { // 是否显示弹窗
              showModal({
                title: '获取位置时发生异常，您可点击小程序右上角-设置-允许获取位置',
                confirmText: '去设置',
                success: (res) => {
                  if (res.confirm) {
                    uni.openSetting({
                      success: async (e) => {
                        console.log(e.authSetting['scope.userLocation'], `e.authSetting['scope.userLocation']`);
                        if (e.authSetting['scope.userLocation']) {
                          const position = await locate();
                          resolve(position);
                        } else {
                          reject(false);
                        }
                      },
                    });
                  } else {
                    removeLocationInfo();
                    cancelback && uni.$emit('enable_location', false);
                    reject(false);
                  }
                },
                fail: () => {
                  reject(false);
                },
              });
            } else {
              reject(false);
            }
          }
        }
      },
      fail: (conf) => {
        uni.$emit('enable_location');
        reject(false);
      },
    });
  });
