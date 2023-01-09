/*
 * @Author: zhangyang
 * @Date: 2022-12-27 14:20:09
 * @LastEditTime: 2023-01-09 14:36:32
 * @Description:
 */
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import type { Repository } from 'typeorm';
import { Api, Menu, Role } from '../entities';
import { BasicService } from './basic';

export type CreateRoleItem = Partial<Role> & {
  /**
   * 接口 id 数组
   */
  aid?: number[];
  /**
   * 菜单 id 数组
   */
  mid?: number[];
};

@Provide()
export class RoleService extends BasicService<Role, CreateRoleItem> {
  @InjectEntityModel(Role)
  repo: Repository<Role>;

  async create(item: CreateRoleItem) {
    const role = new Role();
    for (const [key, value] of Object.entries(item)) {
      if (key === 'aid' && Array.isArray(value)) {
        const api_repo = this.dataSource.getRepository(Api);

        for (const aid of value) {
          const u = await api_repo.findOne({ where: { id: aid as number } });
          if (u) {
            if (role.apis) {
              role.apis.push(u);
            } else {
              role.apis = [u];
            }
          } else {
            throw new Error(`apiId: ${aid} doesn't exsist`);
          }
        }
      } else if (key === 'mid' && Array.isArray(value)) {
        const menu_repo = this.dataSource.getRepository(Menu);
        for (const mid of value) {
          const u = await menu_repo.findOne({ where: { id: mid as number } });
          if (u) {
            if (role.menus) {
              role.menus.push(u);
            } else {
              role.menus = [u];
            }
          } else {
            throw new Error(`menuId: ${mid} doesn't exsist`);
          }
        }
      } else {
        role[key] = value;
      }
    }
    await this.repo.save(role);
  }

  async getAccessMenus(id: number) {
    const query = this.repo.createQueryBuilder('role');
    query.leftJoinAndSelect('role.menus', 'menus');
    query.leftJoinAndSelect('menus.parentId', 'parentId');
    query.where(`role.id = :id`, { id });
    query.andWhere(`menus.status = 1`);
    query.orderBy('parentId.id');
    query.orderBy('menus.sort');

    const menus = (await query.getOne())?.menus ?? [];
    for (const menu of menus) {
      menu.id = Number(menu.id);
      // @ts-expect-error
      menu.parentId = parseInt(menu?.parentId?.id ?? 0, 10);
    }
    return menus;
  }

  async getAccessMenusTree(id: number) {
    const menus = await this.getAccessMenus(id);
    this.logger.info('access menus: ', menus);

    /**
     * 收集 parentId
     * 存储 id 与 menu 的映射
     */
    const menuMap = new Map<number, Menu>();
    menus.forEach((item) => {
      if (+item.parentId !== 0) {
        menuMap.set(item.id, item);
      }
    });

    /**
     * 遍历菜单
     */
    for (const menu of menus) {
      if (+menu.parentId === 0) {
        menu.children = [];
        menuMap.set(menu.id, menu);
      } else {
        const parentMenu = menuMap.get(+menu.parentId);
        if (parentMenu) {
          if (!parentMenu.children) {
            parentMenu.children = [];
          }
          if (menuMap.has(menu.id)) {
            parentMenu.children.push(menuMap.get(menu.id));
          } else {
            parentMenu.children.push(menu);
          }
        }
      }
    }

    return Array.from(menuMap.values()).filter((item) => +item.parentId === 0);
  }

  async getAccessApis(id: number) {
    const query = this.repo.createQueryBuilder('role');
    query.leftJoinAndSelect('role.apis', 'apis');
    query.where(`role.id = :id`, { id });
    query.andWhere(`apis.status = 1`);
    const apis = (await query.getOne())?.apis ?? [];

    return apis.filter((api) => api.status === 1);
  }

  async findAll(item: CreateRoleItem & Paginition) {
    const query = this.repo.createQueryBuilder();
    query.select('*');

    const { noPagination, pageNum, pageSize, name, keyword, status } = item;

    if (['', undefined, null].every((i) => status !== i) && !Number.isNaN(status)) {
      query.andWhere(`status = :status`, { status });
    }

    if (name) {
      query.andWhere(`name like '%${name}%'`);
    }

    if (keyword) {
      query.andWhere(`keyword like '%${keyword}%'`);
    }

    const page = Number(pageNum) || 1;
    const size = Number(pageSize) || 10;

    if (!item.noPagination) {
      const skip = (page - 1) * size;

      query.skip(skip);
      query.take(size);
    }

    const total = await query.getCount();
    const list = await query.getRawMany();

    list.forEach((role) => (role.id = Number(role.id)));

    return {
      pageNum: page,
      pageSize: size,
      total,
      noPagination,
      list,
    };
  }

  async addMenus(id: number, menusId: number[]) {
    const role = await this.getById(id);
    let res: any = true;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const mid of menusId) {
        const menu = await this.dataSource.getRepository(Menu).findOne({
          where: { id: mid },
        });
        if (menu) {
          if (role.menus) {
            role.menus.push(menu);
          } else {
            role.menus = [menu];
          }
        } else {
          throw new Error(`menuId: ${mid} 不存在`);
        }
      }
      await this.repo.save(role);
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

  async delMenus(id: number, menusId: number[]) {
    const role = await this.getById(id);
    if (role.menus) {
      role.menus = role.menus.filter((i) => !menusId.includes(Number(i.id)));
    }
    await this.repo.save(role);
  }

  async addApis(id: number, apisId: number[]) {
    const role = await this.getById(id);
    let res: any = true;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const aid of apisId) {
        const api = await this.dataSource.getRepository(Api).findOne({
          where: { id: aid },
        });
        if (api) {
          if (role.apis) {
            role.apis.push(api);
          } else {
            role.apis = [api];
          }
        } else {
          throw new Error(`apiId: ${aid} 不存在`);
        }
      }
      await this.repo.save(role);
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

  async delApis(id: number, apisId: number[]) {
    const role = await this.getById(id);
    if (role.apis) {
      role.apis = role.apis.filter((i) => !apisId.includes(Number(i.id)));
    }
    await this.repo.save(role);
  }

  async getById(id: number) {
    const role = await this.repo.findOne({
      where: { id },
      relations: ['menus', 'apis'],
    });
    if (!role) {
      throw new Error(`roleId: ${id} 不存在`);
    }
    return role;
  }

  async update(id: number, item: CreateRoleItem) {
    const m = await this.getById(id);
    for (const [key, value] of Object.entries(item)) {
      if (value !== undefined && value !== null) {
        m[key] = value;
      }
    }
    await this.repo.save(m);
  }
}
