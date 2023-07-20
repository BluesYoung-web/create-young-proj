/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:35:24
 * @LastEditTime: 2023-07-20 15:06:25
 * @Description:
 */
import { useHttp } from './lib';
import { useGet, usePost } from './requests';

const http = useHttp({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  loading: {
    start: () => {
      if (import.meta.env.VITE_CUSTOM_LOADING) {
        const { httpLoadingEl } = storeToRefs(useHttpLoading());
        httpLoadingEl.value?.start();
      } else {
        showLoading();
      }
    },
    end: () => {
      if (import.meta.env.VITE_CUSTOM_LOADING) {
        const { httpLoadingEl } = storeToRefs(useHttpLoading());
        httpLoadingEl.value?.end();
      } else {
        hideLoading();
      }
    },
  },
  headers: {
    getCommonHeaders: () => ({
      Accept: 'application/vnd.github.v3+json',
    }),
    getAuthHeaders: () => {
      const token = 'todo: change to the real token that you used';
      return {
        Authorization: `Bearer ${token}`,
      };
    },
  },
  fail: (err) => {
    // todo: 错误逻辑处理
    showErrorModal(err.toString());
  },
});

export const apis = {
  get: useGet(http),
  post: usePost(http),
};
