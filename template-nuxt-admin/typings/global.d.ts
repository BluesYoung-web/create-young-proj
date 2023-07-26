/*
 * @Author: zhangyang
 * @Date: 2023-07-26 11:57:29
 * @LastEditTime: 2023-07-26 14:01:32
 * @Description:
 */
interface BaseQuery {
  pageNum: number;
  pageSize: number;
  total: number;
  noPagination?: boolean;
}

type PagesData = {
  list: any[];
} & BaseQuery;
