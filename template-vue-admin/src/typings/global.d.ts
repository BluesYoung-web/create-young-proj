/*
 * @Author: zhangyang
 * @Date: 2022-03-09 17:55:56
 * @LastEditTime: 2023-01-09 10:05:44
 * @Description: 自定义表格组件相关
 */
import type { App, VNode } from 'vue';

declare global {
  interface BaseQuery {
    pageNum: number;
    pageSize: number;
    total: number;
    noPagination?: boolean;
  }

  type PagesData = {
    list: any[];
  } & BaseQuery;

  type EnableWrite<T extends any> = {
    -readonly [p in keyof T]: T[p];
  };

  type UserModule = (ctx: App<Element>, ...args: any[]) => void;
  type Cbk = () => void;
  
  type ResponseMsg = {
    code: number;
    msg: string;
    data: any;
  };

  type UserKey = {
    expires: string;
    token: string;
  };

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

  type CurrUserInfo = {
    avatar: string;
    id: number;
    introduction: string;
    mobile: string;
    nickname: string;
    roles: string[];
    roleSort: number;
    username: string;
  };
}
