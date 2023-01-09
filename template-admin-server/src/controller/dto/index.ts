/*
 * @Author: zhangyang
 * @Date: 2022-12-27 14:56:04
 * @LastEditTime: 2023-01-06 17:17:09
 * @Description:
 */
import { Rule, RuleType } from '@midwayjs/validate';
export class QueryDTO {
  @Rule(RuleType.number().default(1))
  pageNum: number;

  @Rule(RuleType.number().default(10))
  pageSize: number;

  @Rule(RuleType.number().optional().default(0))
  total: number;

  @Rule(RuleType.number().optional().allow(''))
  status: number;

  @Rule(RuleType.boolean().default(false))
  noPagination: boolean;
}

export class DiffDTO {
  @Rule(RuleType.array<number>().default([]))
  create: number[];

  @Rule(RuleType.array<number>().default([]))
  delete: number[];
}

export * from './user';
export * from './role';
export * from './api';
export * from './menu';
