/*
 * @Author: zhangyang
 * @Date: 2022-12-29 11:13:21
 * @LastEditTime: 2022-12-29 11:53:07
 * @Description:
 */
import { Rule, RuleType } from '@midwayjs/validate';

export class MenuCreateDTO {
  @Rule(RuleType.number().optional().default(0))
  parentId: number;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().optional().allow(''))
  icon: string;

  @Rule(RuleType.number().optional().default(0))
  sort: number;

  @Rule(RuleType.string().required().allow(''))
  component: string;
}

export class MenuUpdateDTO extends MenuCreateDTO {
  @Rule(RuleType.number().optional().allow(''))
  parentId: number;

  @Rule(RuleType.number().optional().allow(''))
  visible: number;

  @Rule(RuleType.number().optional().allow(''))
  sort: number;

  @Rule(RuleType.number().optional().allow(''))
  status: number;
}
