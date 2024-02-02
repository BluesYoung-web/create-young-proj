/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-28 10:03:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 15:35:58
 * @Description:
 */

type LoadData<T> = () => Promise<T>
type InitialOptionsWithData<T> = (data: T) => EChartsOption

/**
 * 定时刷新数据
 * @param getData 获取数据的Api
 * @param initialOptionsWithData 传入回调函数
 */
export function useLoadData<T>(getData: LoadData<T>, initialOptionsWithData: InitialOptionsWithData<T>) {
  const { options, setOptions } = useEcharts()

  const data = ref<T>()

  loadData()

  async function loadData() {
    const res = await getData()
    data.value = res
    setOptions(initialOptionsWithData(data.value))
  }

  useIntervalFn(async () => {
    await loadData()
  }, 5000)

  return {
    data,
    options,
  }
}
