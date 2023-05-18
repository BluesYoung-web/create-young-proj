/*
 * @Author: zhangyang
 * @Date: 2022-03-01 14:01:31
 * @LastEditTime: 2023-05-18 16:21:55
 * @Description: 网络请求
 */
import { useHttp } from '@bluesyoung/http';
import { getToken } from '@/stores';
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading';
import { useGetReq, usePostReq, usePatchReq, useDeleteReq } from '@/apis';

let loading: LoadingInstance;

const startLoading = () => {
  loading = ElLoadingService({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};

const endLoading = () => loading?.close?.();

export const http = useHttp<ResponseMsg>({
  timeout: -1,
  loading: {
    start: startLoading,
    end: endLoading,
  },
  fail: (err: any) => {
    console.log('🚀 ~ file: 3-net.ts:60 ~ err', err, typeof err);
    if (err?.response?.status === 401) {
      ElMessage.error('无权限，请联系管理员');
    }

    if (typeof err === 'string') {
      // 通用失败，弹出提示信息
      ElMessage.error(err);
    }

    if (err instanceof Error) {
      ElMessage.error(
        // @ts-ignore 接口出错
        err?.response?.data?.message || err?.response?.data?.msg || err.message || '网络错误！',
      );
    }

    throw err;
  },
  checkFn: ({ code, msg, data }) => {
    if (code === 0) {
      // 通用成功
      return data;
    } else if (code === -1) {
      // 通用失败
      throw msg;
    } else {
      // 特殊状态码
      throw code;
    }
  },
  headers: {
    getAuthHeaders: () => {
      const token = getToken();
      return {
        Authorization: `Bearer ${token}`,
      };
    },
  },
});

export const apis = http.__mixin__({
  get: useGetReq(),
  post: usePostReq(),
  patch: usePatchReq(),
  delete: useDeleteReq(),
});

export const install: UserModule = (ctx) => {};
