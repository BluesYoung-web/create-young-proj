/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:35:24
 * @LastEditTime: 2023-07-18 17:15:53
 * @Description:
 */
import { hideLoading, showErrorModal, showLoading } from '@/utils';
import { useHttp } from './lib';
import { useGet, usePost } from './requests';

const http = useHttp({
  baseURL: 'https://api.github.com',
  loading: {
    start: showLoading,
    end: hideLoading
  },
  headers: {
    getCommonHeaders: () => ({
      Accept: 'application/vnd.github.v3+json'
    }),
    getAuthHeaders: () => {
      const token = 'todo: change to the real token that you used';
      return {
        Authorization: `Bearer ${token}`
      };
    }
  },
  fail: (err) => {
    // todo: 错误逻辑处理
    showErrorModal(err.toString());
  }
});


export const apis = {
  get: useGet(http),
  post: usePost(http)
};
