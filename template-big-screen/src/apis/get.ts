/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:09:37
 * @LastEditTime: 2024-02-01 18:09:15
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq } from '@bluesyoung/http'
import * as Mock from 'mockjs'

function generateRandomIntegersWithSum(sum: number) {
  const result = []

  // 生成两个随机整数
  result.push(Mock.Random.integer(1, sum - 2))
  result.push(Mock.Random.integer(1, sum - result[0] - 1))

  // 计算第三个整数，使总和等于指定的值
  result.push(sum - result[0] - result[1])

  // 打乱数组顺序，以确保随机性
  Mock.Random.shuffle(result)

  return result
}

export function useGet(http: YoungHttp) {
  const FreeReq: YoungHttpFreeReq = args => http.freeReq({ method: 'GET', ...args })
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'GET', ...args })

  return {
    getSocialCondition: async () => {
      return {
        values: Array.from({ length: 3 }).map(() => Mock.Random.integer(100000, 9999999)),
        increment: Array.from({ length: 3 }).map(() => Mock.Random.float(0, 10, 0, 2)),
        industry: generateRandomIntegersWithSum(100),
      } as ISocialCondition
    },
    getPowerGridConstruction: async () => {
      const res = {
        values: Array.from({ length: 2 }, () => Mock.Random.float(10000, 99999, 0, 2)),
        increment: Array.from({ length: 2 }, () => Mock.Random.float(0, 15, 0, 1)),
        province: Array.from({ length: 5 }, () => Mock.Random.integer(5, 100)),
      } as IPowerGridConstruction

      return res
    },
    getElectricityUsage: async () => {
      return {
        values: [Mock.Random.float(100, 10000, 0, 2), Mock.Random.integer(1000, 10000000)],
        increment: [Mock.Random.float(0, 10, 0, 2), Mock.Random.float(0, 10, 0, 2)],
        electricity: Array.from({ length: 5 }, () => Mock.Random.integer(500, 4000)),
      } as IElectricityUsage
    },
    getManagementImprovement: async () => {
      return {
        values: Array.from({ length: 2 }, () => Mock.Random.float(100, 9999, 0, 2)),
        increment: Array.from({ length: 2 }, () => Mock.Random.float(0, 15, 0, 1)),
        data: Mock.Random.integer(5, 100),
      } as IManagementImprovement
    },
    getGridReliability: async () => {
      return {
        values: Array.from({ length: 3 }).map(() => Mock.Random.integer(0, 10)),
        data1: Array.from({ length: 12 }).map(() => Mock.Random.integer(1, 8)),
        data2: Array.from({ length: 12 }).map(() => Mock.Random.integer(1, 8)),
      } as IGridReliability
    },
    getSalesOfElectricityAndLineLoss: async () => {
      return {
        values: Array.from({ length: 3 }).map(() => Mock.Random.integer(1000, 99999)),
        increment: Array.from({ length: 3 }).map(() => Mock.Random.float(0, 10, 0, 2)),
        data1: Array.from({ length: 5 }).map(() => Mock.Random.integer(1, 15)),
        data2: Array.from({ length: 5 }).map(() => Mock.Random.integer(1, 7)),
      } as ISalesOfElectricityAndLineLoss
    },
  }
}
