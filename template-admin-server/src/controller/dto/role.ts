/*
 * @Author: zhangyang
 * @Date: 2022-12-28 16:13:54
 * @LastEditTime: 2022-12-28 16:44:28
 * @Description:
 */
import { Rule, RuleType } from '@midwayjs/validate';
import { QueryDTO } from '.';

export class RoleQueryDTO extends QueryDTO {
  @Rule(RuleType.string().optional().allow(''))
  name: string;

  @Rule(RuleType.string().optional().allow(''))
  keyword: string;
}

export class RoleCreateDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  keyword: string;

  @Rule(RuleType.string().optional().allow(''))
  desc: string;

  @Rule(RuleType.number().default(1).optional().allow(''))
  status: number;

  @Rule(RuleType.number().default(0).optional().allow(''))
  sort: number;
}

export class RoleUpdateDTO extends RoleCreateDTO {
  @Rule(RuleType.string().optional().allow(''))
  name: string;

  @Rule(RuleType.string().optional().allow(''))
  keyword: string;
}
