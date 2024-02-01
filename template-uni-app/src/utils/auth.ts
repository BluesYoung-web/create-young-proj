/*
 * @Author: zhangyang
 * @Date: 2023-07-18 14:28:16
 * @LastEditTime: 2024-02-01 10:31:14
 * @Description: 权限相关
 */
/**
 * 获取微信授权码
 */
export async function getWxCode() {
  return new Promise<string>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res.errMsg === 'login:ok')
          resolve(res.code)
        else
          reject('wechat auth fail')
      },
      fail: () => {
        reject('wechat auth fail')
      },
    })
  })
}

/**
 * 定位
 */
export function locate(cancelback = true) {
  return new Promise<UniApp.GetLocationSuccess & { timer?: number }>((_resolve, _reject) => {
    const position = getLocationInfo()
    // 系统 getLocation 30s 获取一次  这里延续到 60s
    if (new Date().getTime() - position.timer < 1000 * 60) {
      setLocationInfo(position)
      _resolve(position as unknown as UniApp.GetLocationSuccess)
    }
    else {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          setLocationInfo({
            latitude: res.latitude,
            longitude: res.longitude,
            timer: Date.now(),
          })

          console.log(res, 'location')
          _resolve(res)
        },
        fail: (res: UniApp.GetLocationSuccess & { errMsg: string }) => {
          console.log(res, 'location')
          if (cancelback)
            _reject(res)
          else
            _resolve(position as unknown as UniApp.GetLocationSuccess)
        },
      })
    }
  })
}

/**
 * 授权定位
 * @param {boolean} cancelback  取消授权时是否有回调值
 */
export async function authLocation(cancelback = true, isShowModal = true) {
  return new Promise<UniApp.GetLocationSuccess>(async (resolve, reject) => {
    // #ifdef MP
    uni.getSetting({
      withSubscriptions: true,
      success: async (conf) => {
        if (conf.authSetting['scope.userLocation']) {
          // 同意过定位授权
          const position = await locate()
          uni.$emit(AuthLocationEvents.同意授权, true)
          resolve(position)
        }
        else {
          try {
            const position = await locate()
            uni.$emit(AuthLocationEvents.同意授权, true)
            resolve(position)
          }
          catch (error) {
            console.log(error)
            if (isShowModal) {
              // 是否显示弹窗
              showModal({
                title: '获取位置时发生异常，您可点击小程序右上角-设置-允许获取位置',
                confirmText: '去设置',
                success: (res) => {
                  if (res.confirm) {
                    uni.openSetting({
                      success: async (e) => {
                        console.log(
                          e.authSetting['scope.userLocation'],
                          'e.authSetting[\'scope.userLocation\']',
                        )
                        if (e.authSetting['scope.userLocation']) {
                          const position = await locate()
                          resolve(position)
                        }
                        else {
                          reject(false)
                        }
                      },
                    })
                  }
                  else {
                    removeLocationInfo()
                    cancelback && uni.$emit(AuthLocationEvents.启用授权, false)
                    reject(false)
                  }
                },
                fail: () => {
                  reject(false)
                },
              })
            }
            else {
              reject(false)
            }
          }
        }
      },
      fail: (conf) => {
        uni.$emit(AuthLocationEvents.启用授权)
        reject(false)
      },
    })
    // #endif
    // #ifndef MP
    console.error('this method can only used in miniprogram !')
    reject(false)
    // #endif
  })
}

/**
 * 获取本机支持的生物认证信息
 */
export async function getAuthInfo() {
  return new Promise<UniApp.CheckIsSupportSoterAuthenticationRes['supportMode'] | false>(
    (resolve) => {
      // #ifdef APP-PLUS || MP-WEIXIN
      uni.checkIsSupportSoterAuthentication({
        success(res) {
          resolve(res.supportMode)
        },
        fail(err) {
          console.log('🚀 ~ file: auth.ts:234 ~ fail ~ err:', err)
          resolve(false)
        },
      })
      // #endif

      // #ifndef APP-PLUS || MP-WEIXIN
      resolve(false)
      console.error('this method can only used in app and mp-weixin !')
      // #endif
    },
  )
}

/**
 * 检查本机是否录入过指纹
 */
export async function checkFingerPrint() {
  return new Promise<boolean>((resolve) => {
    // #ifdef APP-PLUS || MP-WEIXIN
    uni.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success: () => resolve(true),
      fail: () => resolve(false),
    })
    // #endif
    // #ifndef APP-PLUS || MP-WEIXIN
    resolve(false)
    // #endif
  })
}

/**
 * 指纹认证
 */
export async function fingerPrintAuth(signStr: string, authContent = '请验证本机指纹') {
  return new Promise<boolean>(async (resolve) => {
    // #ifdef APP-PLUS || MP-WEIXIN
    const authMethods = await getAuthInfo()
    if (authMethods && authMethods.includes('fingerPrint')) {
      uni.checkIsSupportSoterAuthentication({
        async success(res) {
          if (res.supportMode.includes('fingerPrint') && (await checkFingerPrint())) {
            uni.startSoterAuthentication({
              requestAuthModes: ['fingerPrint'],
              challenge: signStr,
              authContent,
              success(res) {
                console.log('success', res)
                resolve(true)
              },
              fail(err) {
                console.log('fail', err)
                resolve(false)
              },
            })
          }
          else {
            resolve(false)
          }
        },
        fail(err) {
          console.log('fail', err)
          resolve(false)
        },
      })
    }
    else {
      resolve(false)
    }
    // #endif
    // #ifndef APP-PLUS || MP-WEIXIN
    resolve(false)
    // #endif
  })
}
