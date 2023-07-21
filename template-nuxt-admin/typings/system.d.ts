/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:03:42
 * @LastEditTime: 2023-07-21 14:25:16
 * @Description:
 */

type NavArrItem = {
  id: string | number;
  title: string;
  name: string;
  component: string;
  parent_id: string | number;
  breadcrumb: number;
  creator: string;
  visible: number;
  icon?: any;
  path: string;
  permission: string;
  redirect: string;
  sort: number;
  status: number;
  created_at: string | number;
  updated_at: string | number;
  children?: NavArrItem[];
} & Record<string, any>;
