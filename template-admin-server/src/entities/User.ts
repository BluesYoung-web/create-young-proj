/*
 * @Author: zhangyang
 * @Date: 2022-12-26 14:11:58
 * @LastEditTime: 2022-12-28 15:51:23
 * @Description:
 */
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseCreate } from './BaseCreate';
import { Role } from './Role';

@Entity({
  engine: 'InnoDB',
})
export class User extends BaseCreate {
  @Column({ length: '20', unique: true })
  username!: string;

  @Column({ length: '11' })
  mobile!: string;

  @Column({ length: '20', default: '' })
  nickname?: string;

  @Column({ default: '' })
  avatar?: string;

  @Column({ length: '50', default: '' })
  introduction?: string;

  @Column({ select: false })
  password!: string;

  @ManyToOne(() => Role, role => role.users, { cascade: true })
  role!: Role;
}
