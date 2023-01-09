/*
 * @Author: zhangyang
 * @Date: 2022-12-27 14:31:57
 * @LastEditTime: 2022-12-27 15:19:51
 * @Description:
 */
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import type { Repository } from 'typeorm';
import { Api, Role } from '../entities';
import { BasicService } from './basic';

export type CreateApiItem = Partial<Api> & { rids?: number[] };

@Provide()
export class ApiService extends BasicService<Api, CreateApiItem> {
  @InjectEntityModel(Api)
  repo: Repository<Api>;

  async create(item: CreateApiItem) {
    const api = new Api();
    for (const [key, value] of Object.entries(item)) {
      if (key === 'rids' && Array.isArray(value)) {
        const roles: Role[] = [];
        for (const id of value) {
          const role = await this.dataSource.getRepository(Role).findOne({
            where: {
              id: id as number,
            },
          });
          if (role) {
            roles.push(role);
          } else {
            throw new Error(`roleId: ${value} doesn't exsist`);
          }
        }
        api.roles = roles;
      } else {
        api[key] = value;
      }
    }
    await this.repo.save(api);
  }

  async getAllTree() {
    const apis = await this.repo.find({
      where: {
        status: 1,
      },
      order: {
        id: 'ASC',
      },
    });
    const res: Record<string, Api[]> = {};
    for (const api of apis) {
      api.id = Number(api.id);
      const group = api.category;
      if (res[group]) {
        res[group].push(api);
      } else {
        res[group] = [api];
      }
    }
    return Object.entries(res).map(([key, value]) => {
      return {
        category: key,
        desc: key,
        title: `${key}分组`,
        id: value[0].id,
        children: value,
      };
    });
  }

  async findAll(item: CreateApiItem & Paginition) {
    const query = this.repo.createQueryBuilder();
    query.select('*');

    const { noPagination, pageNum, pageSize, path } = item;

    if (path) {
      query.andWhere(`path like '%${path}%'`);
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

    for (const api of list) {
      api.id = Number(api.id);
    }

    return {
      pageNum: page,
      pageSize: size,
      total,
      noPagination,
      list,
    };
  }

  async getById(id: number) {
    const api = await this.repo.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!api) {
      throw new Error(`apiId: ${id} 不存在`);
    }
    return api;
  }

  async deleteBatch(ids: number[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    let res: any = true;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const id of ids) {
        const api = await this.getById(id);
        api.roles = [];
        await this.repo.save(api);
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

  async update(id: number, item: CreateApiItem) {
    const m = await this.getById(id);
    for (const [key, value] of Object.entries(item)) {
      if (value !== undefined && value !== null) {
        if (key === 'rids' && Array.isArray(value)) {
          const roles: Role[] = [];
          for (const id of value) {
            const role = await this.dataSource.getRepository(Role).findOne({
              where: {
                id: id as number,
              },
            });
            if (role) {
              roles.push(role);
            } else {
              throw new Error(`roleId: ${value} doesn't exsist`);
            }
          }
          m.roles = [...new Set([...(m?.roles ?? []), ...roles])];
        } else {
          m[key] = value;
        }
      }
    }
    await this.repo.save(m);
  }
}
