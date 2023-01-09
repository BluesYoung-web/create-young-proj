/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:23:19
 * @LastEditTime: 2023-01-09 10:17:23
 * @Description:
 */
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import type { Repository } from 'typeorm';
import { Role, User } from '../entities';
import { BasicService } from './basic';

export type CreateUserItem = Partial<User> & { rid?: number };

@Provide()
export class UserService extends BasicService<User, CreateUserItem> {
  @InjectEntityModel(User)
  repo: Repository<User>;

  async create(item: CreateUserItem) {
    const user = new User();
    for (const [key, value] of Object.entries(item)) {
      if (key === 'rid') {
        const role = await this.dataSource.getRepository(Role).findOne({
          where: {
            id: value as number,
          },
        });
        if (role) {
          user.role = role;
        } else {
          throw new Error(`roleId: ${value} doesn't exsist`);
        }
      } else {
        user[key] = value;
      }
    }
    await this.repo.save(user);
  }

  async findAll(item: Partial<User> & Paginition) {
    const query = this.repo.createQueryBuilder();
    query.select('*');

    const { noPagination, pageNum, pageSize, username, mobile, status } = item;

    if (['', undefined, null].every((i) => status !== i) && !Number.isNaN(status)) {
      query.andWhere(`status = :status`, { status });
    }

    if (username) {
      query.andWhere(`username like '%${username}%'`);
    }

    if (mobile) {
      query.andWhere(`mobile like '%${mobile}%'`);
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

    const roleList = await this.dataSource.getRepository(Role).find();
    const roleObj: Record<string, string> = {};
    for (const role of roleList) {
      roleObj[role.id] = role.name;
    }
    for (const user of list) {
      delete user.password;
      user.id = Number(user.id);
      user.roleId = Number(user.roleId);
      user.role_name = roleObj[user.roleId];
    }

    return {
      pageNum: page,
      pageSize: size,
      total,
      noPagination,
      list,
    };
  }

  async update(id: number, item: CreateUserItem) {
    const m = await this.getById(id);
    for (const [key, value] of Object.entries(item)) {
      if (value !== undefined && value !== null) {
        if (key === 'rid') {
          const role = await this.dataSource.getRepository(Role).findOne({
            where: { id: Number(value) },
          });
          if (role) {
            m.role = role;
          } else {
            throw new Error(`roleId: ${value} 不存在！`);
          }
        } else {
          m[key] = value;
        }
      }
    }
    await this.repo.save(m);
  }

  async getById(id: number) {
    const role = await this.repo.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!role) {
      throw new Error(`userId: ${id} 不存在`);
    }
    return role;
  }
}
