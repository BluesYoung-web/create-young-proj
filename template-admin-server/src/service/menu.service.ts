/*
 * @Author: zhangyang
 * @Date: 2022-12-27 14:29:19
 * @LastEditTime: 2022-12-27 16:49:39
 * @Description:
 */
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import type { Repository } from 'typeorm';
import { Menu } from '../entities';
import { BasicService } from './basic';

export type CreateMenuItem = Partial<Menu> & { pid?: number };

@Provide()
export class MenuService extends BasicService<Menu, CreateMenuItem> {
  @InjectEntityModel(Menu)
  repo: Repository<Menu>;

  async create(item: CreateMenuItem) {
    const m = new Menu();
    for (const [key, value] of Object.entries(item)) {
      if (key === 'pid') {
        if (value === 0) {
          continue;
        }
        const p = await this.repo.findOne({ where: { id: value as number } });
        if (p) {
          m.parentId = p;
        } else {
          throw new Error(`parentId: ${value} doesn't exsist`);
        }
      } else {
        m[key] = value;
      }
    }
    await this.repo.save(m);
  }

  async update(id: number, item: CreateMenuItem) {
    const m = await this.getById(id);
    if (m) {
      for (const [key, value] of Object.entries(item)) {
        if (key === 'pid') {
          if (value === undefined) {
            continue;
          }
          if (value === 0) {
            m.parentId = null;
            continue;
          }
          const p = await this.repo.findOne({ where: { id: value as number } });
          if (p) {
            m.parentId = p;
          } else {
            throw new Error(`parentId: ${value} doesn't exsist`);
          }
        } else {
          m[key] = value;
        }
      }
      await this.repo.save(m);
    } else {
      throw new Error(`menuId: ${id}, 菜单不存在`);
    }
  }

  async deleteBatch(ids: number[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    let res: any = true;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const id of ids) {
        const menu = await this.getById(id);

        const childrenIds = menu.children?.map((i) => Number(i.id)) ?? [];

        // 删除角色与菜单之间的关联
        menu.roles = [];
        menu.parentId = null;
        // 断开 children 的关联
        menu.children = [];
        await this.repo.save(menu);

        // 递归删除子节点
        await this.deleteBatch(childrenIds);

        await this.delete(id);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      res = error;
    } finally {
      await queryRunner.release();
    }

    if (res !== true) {
      throw res;
    }
  }

  async getById(id: number) {
    const m = await this.repo.findOne({
      where: { id },
      relations: ['roles', 'children', 'parentId'],
    });
    if (!m) {
      throw new Error(`menuId: ${id} 不存在`);
    }
    return m;
  }

  async getAllTree() {
    // 获取树形结构的数据
    const menus = await this.dataSource.getTreeRepository(Menu).findTrees({
      relations: ['children', 'parentId'],
    });

    // 设置 parentId
    const setParentId = (item: Menu) => {
      item.id = Number(item.id);
      // @ts-expect-error
      item.parentId = Number(item?.parentId?.id ?? 0);
      if (item.children?.length) {
        for (const i of item.children) {
          setParentId(i);
        }
      }
    };
    for (const menu of menus) {
      setParentId(menu);
    }

    return menus;
  }
}
