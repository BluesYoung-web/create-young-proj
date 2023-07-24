/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:21:02
 * @LastEditTime: 2023-07-24 12:08:30
 * @Description:
 */
import type { YoungHttp, YoungHttpFreeReq, YoungHttpAuthReq } from '@bluesyoung/http';
import { telMasaike } from '@bluesyoung/utils';

export const usePost = (http: YoungHttp) => {
  const FreeReq: YoungHttpFreeReq = (args) => http.freeReq({ method: 'POST', ...args });
  const AuthReq: YoungHttpAuthReq = (args) => http.authReq({ method: 'POST', ...args });

  return {
    login: async (args: LoginForm) => {
      console.log("🚀 ~ file: post.ts:15 ~ login: ~ args:", args);
      showToast('todo: user login');

      return {
        uuid: '9527',
        nickname: '用户xxx',
        headimgurl: 'https://avatars.githubusercontent.com/u/55608642?v=4',
        token: 'xxx',
        phone: telMasaike(args.mobile)
      } as UserLoginRes;
    }
  };
};
