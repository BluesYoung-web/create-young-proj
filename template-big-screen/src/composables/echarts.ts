/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-24 16:34:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 12:09:50
 * @Description:
 */
export function useEcharts() {
  const options = ref<EChartsOption>()
  function setOptions(data: EChartsOption) {
    options.value = data
  }
  return {
    options,
    setOptions,
  }
}
