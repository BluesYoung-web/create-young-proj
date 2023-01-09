/*
 * @Author: zhangyang
 * @Date: 2022-03-01 14:03:04
 * @LastEditTime: 2023-01-06 16:47:05
 * @Description: 部分类型定义
 */
export type UserItem = {
  id: number;
  username: string;
  nickname: string;
  mobile: string;
  roleId: number;
  status: number;
  role_name?: string;
  creator?: string;
  newPassword?: string;
  initPassword?: string;
};

export type RoleItem = {
  createdAt?: string;
  creator?: string;
  desc: string;
  id: number;
  keyword: string;
  name: string;
  not_dev?: number;
  sort?: number;
  status: number;
  updatedAt?: string;
};

export const MethodObj = {
  GET: 'info',
  POST: 'success',
  PATCH: 'warning',
  PUT: '',
  DELETE: 'danger',
} as const;

export type ApiItem = {
  id: number;
  path: string;
  desc: string;
  category: string;
  method: keyof typeof MethodObj;
  roleIds: number[];
  creator?: string;
  title?: string;
};
