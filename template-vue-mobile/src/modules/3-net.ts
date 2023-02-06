/*
 * @Author: zhangyang
 * @Date: 2022-03-01 14:01:31
 * @LastEditTime: 2023-01-13 15:54:59
 * @Description: 网络请求
 */
import { useHttp } from '@bluesyoung/http';

let loadingInstance: ReturnType<typeof showLoadingToast>;

export const startLoading = () => {
  loadingInstance = showLoadingToast({
    message: '拼命加载中...',
    forbidClick: true,
  });
};

export const endLoading = () => loadingInstance?.close?.();

export const http = useHttp({
  timeout: -1,
  loading: {
    start: startLoading,
    end: endLoading,
  },
  fail(err) {
    console.log('🚀 ~ file: 3-net.ts:60 ~ err', err, typeof err);
    if (typeof err === 'string') {
      // 通用失败，弹出提示信息
      showFailToast(err);
    }

    if (err instanceof Error) {
      showFailToast(
        // @ts-ignore 接口出错
        err?.response?.data?.message || err?.response?.data?.msg || err.message || '网络错误！',
      );
    }

    throw err;
  },
});

export const apis = http.__mixin__({});

export const install: UserModule = (ctx) => {};
