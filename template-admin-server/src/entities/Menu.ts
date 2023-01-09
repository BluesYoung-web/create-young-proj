/*
 * @Author: zhangyang
 * @Date: 2022-12-26 14:12:16
 * @LastEditTime: 2022-12-27 11:43:21
 * @Description:
 */
import { Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseCreate } from './BaseCreate';
import { Role } from './Role';

@Entity({
  engine: 'InnoDB',
})
@Tree('closure-table')
export class Menu extends BaseCreate {
  @Column({ length: '20' })
  name!: string;

  @Column({ length: '20' })
  title!: string;

  @Column({ length: '30' })
  component!: string;

  @Column({ default: '' })
  icon?: string;

  @Column({ type: 'tinyint', default: 1 })
  visible?: number;

  @TreeParent()
  parentId?: Menu;

  @TreeChildren()
  children?: Menu[];

  @ManyToMany(() => Role, role => role.menus)
  roles?: Role[];
}
