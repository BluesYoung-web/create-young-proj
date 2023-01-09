/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:08:29
 * @LastEditTime: 2022-12-27 14:28:06
 * @Description:
 */

/**
 * 接口响应的数据结构
 */
interface ResponseMsg {
  /**
   * 状态码
   */
  code: Code;
  /**
   * 消息提示
   */
  msg: string;
  /**
   * 响应的数据
   */
  data: any;
}

interface Paginition {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  noPagination?: boolean;
}
