/*
 * @Author: zhangyang
 * @Date: 2023-07-18 16:59:34
 * @LastEditTime: 2023-07-18 16:59:35
 * @Description:
 */
import type { Http } from '../lib';

export const usePost = (http: Http) => {
  const FreeReq: Http['freeReq'] = (args) => http.freeReq({ method: 'POST', ...args });
  const AuthReq: Http['authReq'] = (args) => http.authReq({ method: 'POST', ...args });

  return {
    createRepo: async (name: string) => {
      await AuthReq({
        url: `/user/repos`,
        params: {
          name,
        },
      });
    },
  };
};
