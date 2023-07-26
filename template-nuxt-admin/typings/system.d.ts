/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:03:42
 * @LastEditTime: 2023-07-26 11:49:13
 * @Description:
 */
import { MethodObj } from '~/composables/config';
declare global {
  type NavArrItem = {
    breadcrumb: number;
    component: string;
    createdAt: string;
    creator: string;
    icon?: any;
    id: number;
    name: string;
    not_dev: number;
    parentId: number;
    path: string;
    permission: string;
    redirect: string;
    sort: number;
    status: number;
    title?: string;
    updatedAt: string;
    visible: number;
    children?: NavArrItem[] | [];
  } & Record<string, any>;

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
}
