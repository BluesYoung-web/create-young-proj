/*
 * @Author: zhangyang
 * @Date: 2022-12-26 14:05:04
 * @LastEditTime: 2023-01-06 17:16:52
 * @Description:
 */
import { Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 基础表结构
 */
export abstract class BaseCreate {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ update: false, type: 'datetime', default: () => 'NOW()' })
  createdAt?: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updateAt?: string;

  @Column({ length: '20', default: '' })
  creator?: string;

  @Column({ type: 'tinyint', default: 1 })
  status?: number | '';

  @Column({ default: 0 })
  sort?: number;
}
