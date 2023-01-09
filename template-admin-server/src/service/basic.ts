/*
 * @Author: zhangyang
 * @Date: 2022-12-27 14:06:30
 * @LastEditTime: 2022-12-27 14:21:40
 * @Description:
 */
import { Logger } from '@midwayjs/decorator';
import type { ILogger } from '@midwayjs/logger';
import type { BaseCreate } from '../entities/BaseCreate';
import type { Repository, DataSource } from 'typeorm';
import { InjectDataSource } from '@midwayjs/typeorm';

export class BasicService<U extends BaseCreate, T extends Partial<U> = Partial<U>> {
  @Logger()
  logger: ILogger;

  @InjectDataSource()
  dataSource: DataSource;

  repo: Repository<U>;

  async create(item: T) {
    this.logger.error('create method must be implement ---', item);
  }

  async createBatch(items: T[]) {
    let res: any = true;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const item of items) {
        await this.create(item);
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

  async findOne(item: Partial<U>) {
    const query = this.repo.createQueryBuilder();
    query.select('*');
    for (const [key, value] of Object.entries(item)) {
      if (value) {
        query.andWhere(`${key} = :value`, { value });
      }
    }
    return query.getRawOne() as Promise<U | null>;
  }

  async findAll(item: Partial<U> & Paginition) {
    const query = this.repo.createQueryBuilder();
    query.select('*');
    for (const [key, value] of Object.entries(item)) {
      if (value) {
        query.andWhere(`${key} = :value`, { value });
      }
    }
    const pageNum = Number(item.pageNum) || 1;
    const pageSize = Number(item.pageSize) || 10;
    if (!item.noPagination) {
      const page = pageNum;
      const size = pageSize;

      const skip = (page - 1) * size;

      query.skip(skip);
      query.take(size);
    }

    const total = await query.getCount();
    const list = await query.getRawMany();

    return {
      pageNum,
      pageSize,
      total,
      list,
      noPagination: item.noPagination,
    };
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }

  async deleteBatch(ids: number[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    let res: any = true;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const id of ids) {
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
}
