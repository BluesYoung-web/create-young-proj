/*
 * @Author: zhangyang
 * @Date: 2023-07-18 14:51:02
 * @LastEditTime: 2023-07-20 15:35:06
 * @Description:
 */

/**
 * 模板消息的枚举
 * todo: 按需替换
 */
export enum SubscribeMessage {
  模板消息1 = '消息1xxxxxxxxxxxxxxxxxx',
  模板消息2 = '消息2xxxxxxxxxxxxxxxxxx',
}

/**
 * 授权定位相关
 */
export enum AuthLocationEvents {
  同意授权 = 'sure_location',
  启用授权 = 'enable_location',
}

/**
 * 存储键名
 */
export enum YoungStorageKeys {
  位置信息 = 'location',
  唯一标识 = 'uuid',
  导航栏高度 = 'navbarHeight',
}

/**
 * 页面地址枚举
 */
export enum Pages {
  首页 = '/pages/index',
  个人中心 = '/pages/my',
  测试子页面 = '/pages/demo/index',
}
/**
 * tabbar 页面
 */
export const TabbarArr = [Pages.首页, Pages.个人中心];

export enum UIEvents {}
