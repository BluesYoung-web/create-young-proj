/*
 * @Author: zhangyang
 * @Date: 2023-06-20 17:14:58
 * @LastEditTime: 2023-07-21 09:49:17
 * @Description:
 */
import { useHttp } from '@bluesyoung/http';
import { useGet, usePost } from './apis';

export const startLoading = () => {
  const { isLoading } = storeToRefs(useNavStore());
  isLoading.value = true;
};

export const endLoading = () => {
  const { isLoading } = storeToRefs(useNavStore());
  isLoading.value = false;
};

const http = useHttp({
  timeout: -1,
  loading: {
    start: startLoading,
    end: endLoading,
  },
  fail: (err: any) => {
    console.log("🚀 ~ file: api.ts:28 ~ err:", err)
    const { cookie } = storeToRefs(useUserStore());
    if (err?.response?.status === 401) {
      showDialog({
        title: '温馨提示',
        message: '未登录或登录过期，请登录后再继续！',
        showCancelButton: true
      }).then(() => {
        cookie.value && (cookie.value.uuid = '');
        navigateTo(`/login?redirect=${encodeURIComponent(location.href.replace(location.origin, ''))}`);
      }).catch(() => {
        navigateTo({
          path: '/',
          replace: true
        });
      });

      throw err;
    }

    if (typeof err === 'string') {
      // 通用失败，弹出提示信息
      showNotify({
        type: 'danger',
        message: err
      });
    }
    if (err instanceof Error) {
      showNotify({
        type: 'danger',
        // @ts-ignore 接口出错
        message: err?.response?.data?.message || err?.response?.data?.msg || err?.response?.data || err.message || '网络错误！',
      });
    }

    throw err;
  },
  headers: {
    getAuthHeaders: () => {
      const { token } = storeToRefs(useUserStore());
      return {
        token: token.value
      };
    }
  }
});

export const apis = http.__mixin__({
  get: useGet(http),
  post: usePost(http),
});
