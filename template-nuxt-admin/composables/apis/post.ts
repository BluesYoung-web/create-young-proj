/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:21:02
 * @LastEditTime: 2023-07-21 10:43:28
 * @Description:
 */
import type { YoungHttp, YoungHttpFreeReq, YoungHttpAuthReq } from '@bluesyoung/http';

export const usePost = (http: YoungHttp) => {
  const FreeReq: YoungHttpFreeReq = (args) => http.freeReq({ method: 'POST', ...args });
  const AuthReq: YoungHttpAuthReq = (args) => http.authReq({ method: 'POST', ...args });

  return {

  };
};
