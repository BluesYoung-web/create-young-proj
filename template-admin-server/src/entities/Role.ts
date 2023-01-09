/*
 * @Author: zhangyang
 * @Date: 2022-12-26 14:11:44
 * @LastEditTime: 2022-12-28 16:36:23
 * @Description:
 */
import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Api } from './Api';
import { BaseCreate } from './BaseCreate';
import { Menu } from './Menu';
import { User } from './User';

@Entity({
  engine: 'InnoDB',
})
export class Role extends BaseCreate {
  @Column({ length: '20' })
  name!: string;

  @Column({ length: '20', unique: true })
  keyword!: string;

  @Column({ default: '' })
  desc?: string;

  @OneToMany(() => User, user => user.role)
  users?: User[];

  @ManyToMany(() => Api, api => api.roles)
  @JoinTable()
  apis?: Api[];

  @ManyToMany(() => Menu, menu => menu.roles)
  @JoinTable()
  menus?: Menu[];
}
