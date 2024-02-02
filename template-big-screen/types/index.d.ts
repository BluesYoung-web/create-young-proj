/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-24 16:03:06
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-10-02 10:02:27
 * @Description:
 */

interface ISocialCondition {
  values: number[]
  increment: number[]
  industry: number[]
}

interface IPowerGridConstruction {
  values: number[]
  increment: number[]
  // 省份
  province: number[]
}

interface IElectricityUsage {
  values: number[]
  increment: number[]
  electricity: number[]
}

interface IManagementImprovement {
  values: number[]
  increment: number[]
  data: number
}

interface IGridReliability {
  values: number[]
  data1: number[]
  data2: number[]
}

interface ISalesOfElectricityAndLineLoss {
  values: number[]
  increment: number[]
  data1: number[]
  data2: number[]
}
