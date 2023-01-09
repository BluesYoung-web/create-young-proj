/*
 * @Author: zhangyang
 * @Date: 2022-12-26 14:02:31
 * @LastEditTime: 2022-12-28 17:57:36
 * @Description:
 */
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseCreate } from './BaseCreate';
import { Role } from './Role';

@Entity({
  engine: 'InnoDB',
})
export class Api extends BaseCreate {
  @Column({ length: '20' })
  category!: string;

  @Column({ length: '30', unique: true })
  path!: string;

  @Column({ length: '10' })
  method!: string;

  @Column({ length: '20', default: '' })
  desc?: string;

  @ManyToMany(() => Role, role => role.apis)
  roles?: Role[];
}
