/*
 * @Author: zhangyang
 * @Date: 2022-12-28 16:13:54
 * @LastEditTime: 2022-12-28 17:43:26
 * @Description:
 */
import { Rule, RuleType } from '@midwayjs/validate';
import { QueryDTO } from '.';

export class ApiQueryDTO extends QueryDTO {
  @Rule(RuleType.string().optional().allow(''))
  path: string;
}

export class ApiCreateDTO {
  @Rule(RuleType.string().required())
  category: string;

  @Rule(RuleType.string().required())
  desc: string;

  @Rule(RuleType.string().required())
  method: string;

  @Rule(RuleType.string().required())
  path: string;

  @Rule(RuleType.array<number>().default([]))
  roleIds: number[];
}

export class ApiUpdateDTO {
  @Rule(RuleType.string().optional().allow(''))
  category: string;

  @Rule(RuleType.string().optional().allow(''))
  desc: string;

  @Rule(RuleType.string().optional().allow(''))
  method: string;

  @Rule(RuleType.string().optional().allow(''))
  path: string;

  @Rule(RuleType.array<number>().default([]))
  roleIds: number[];
}
