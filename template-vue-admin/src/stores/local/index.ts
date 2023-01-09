/*
 * @Author: zhangyang
 * @Date: 2022-10-20 08:52:37
 * @LastEditTime: 2023-01-09 09:18:45
 * @Description:
 */
import { YoungLocalStorage } from '@bluesyoung/utils';

export const YoungStorage = new YoungLocalStorage();

const TOKEN_KEY = 'bluesyoung-web.com/music/admin';

export const getToken = () => {
  return YoungStorage.get<UserKey>(TOKEN_KEY)?.token;
};

export const setToken = (data: UserKey) => {
  return YoungStorage.set(TOKEN_KEY, data);
};

export const removeToken = () => {
  return YoungStorage.remove(TOKEN_KEY);
};
