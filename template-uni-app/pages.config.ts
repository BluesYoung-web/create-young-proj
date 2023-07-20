/*
 * @Author: zhangyang
 * @Date: 2023-07-19 19:54:37
 * @LastEditTime: 2023-07-19 20:03:44
 * @Description:
 */
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  lazyCodeLoading: 'requiredComponents',
  pages: [],
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index',
        text: '首页',
      },
      {
        pagePath: 'pages/my',
        text: '我的',
      },
    ],
  },
  globalStyle: {
    pageOrientation: 'portrait',
    navigationBarTitleText: 'demo',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#0D0D0D',
    navigationStyle: 'custom',
    backgroundColor: '#F2EAE0',
    backgroundColorTop: '#F2EAE0',
    backgroundColorBottom: '#F4F5F6',
    'mp-360': {
      navigationStyle: 'custom',
    },
    h5: {
      maxWidth: 1190,
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: '#FFFFFF',
    },
  },
  easycom: {
    autoscan: true,
    custom: {
      '^young-(.*)': '@/components/young-$1/young-$1.vue',
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
});
