/*
 * @Author: zhangyang
 * @Date: 2022-12-27 14:53:51
 * @LastEditTime: 2023-01-09 14:15:20
 * @Description:
 */
import { OmitDto, Rule, RuleType } from '@midwayjs/validate';
import { QueryDTO } from '.';

export class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}

export class UserCreateDTO {
  @Rule(RuleType.number().required())
  roleId: number;

  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().optional().allow(''))
  nickname: string;

  @Rule(RuleType.string().required())
  initPassword: string;

  @Rule(RuleType.string().length(11).required())
  mobile: string;
}

export class UserUpdateDTO extends OmitDto(UserCreateDTO, ['initPassword']) {
  @Rule(RuleType.number().optional().allow(''))
  roleId: number;

  @Rule(RuleType.string().optional().allow(''))
  newPassword: string;

  @Rule(RuleType.number().optional().allow(''))
  status: number;
}

export class UserQueryDTO extends QueryDTO {
  @Rule(RuleType.string().optional().allow(''))
  username: string;

  @Rule(RuleType.string().optional().allow(''))
  mobile: string;
}
