/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:09:37
 * @LastEditTime: 2023-07-24 12:05:19
 * @Description:
 */
import type { YoungHttp, YoungHttpFreeReq, YoungHttpAuthReq } from '@bluesyoung/http';

export const useGet = (http: YoungHttp) => {
  const FreeReq: YoungHttpFreeReq = (args) => http.freeReq({ method: 'GET', ...args });
  const AuthReq: YoungHttpAuthReq = (args) => http.authReq({ method: 'GET', ...args });

  return {
    getUserInfo: async () => {
      const res = await AuthReq({ url: '/v1/user/info' });
      return res.data;
    },
    /**
     * 发送短信验证码
     */
    sendCode: async (phone: string) => {
      showToast(`todo: ${phone}发送短信验证码`);
      // await FreeReq({ url: '/v1/user/sendCode', params: { phone } });
    }
  };
};
