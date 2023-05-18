/*
 * @Author: zhangyang
 * @Date: 2023-05-18 16:06:06
 * @LastEditTime: 2023-05-18 16:06:07
 * @Description: 
 */
import { MethodObj } from '.';

declare global {
  type UserItem = {
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

  type RoleItem = {
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

  type ApiItem = {
    id: number;
    path: string;
    desc: string;
    category: string;
    method: keyof typeof MethodObj;
    roleIds: number[];
    creator?: string;
    title?: string;
  };
}