<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:46:46
 * @LastEditTime: 2024-02-02 14:46:47
 * @Description:
-->
<script setup lang='ts'>
const { options, data } = useLoadData<IManagementImprovement>(apis.get.getManagementImprovement, (res) => {
  return {
    grid: {
      left: '2%',
      right: '4%',
      top: '0%',
      bottom: '0%',
      containLabel: true,
    },
    series: [
      {
        type: 'gauge',
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#fe6b93'],
              [0.7, '#12c4fd'],
              [1, '#9851eb'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          distance: -10,
          lineStyle: {
            color: '#173950',
            width: 1,
          },
        },
        splitLine: {
          distance: -5,
          length: 5,
          lineStyle: {
            color: '#173950',
            width: 1,
          },
        },
        axisLabel: {
          color: 'inherit',
          distance: 20,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} %',
          color: 'inherit',
          fontSize: 16,
          offsetCenter: [0, '70%'],
        },
        title: {
          color: 'inherit',
          offsetCenter: [0, '40%'],
        },
        data: [
          {
            value: res.data,
            name: '可用率',
          },
        ],
      },
    ],
  }
})
</script>

<template>
  <div v-if="data" class="h-full flex flex-col">
    <YoungSectionHeader title="管理提升" index="4" />
    <div class="h-full flex flex-1 py-4">
      <div class="h-full w-50% center">
        <YoungECharts :options="options" width="250px" height="200px" />
      </div>
      <YoungSectionContainer right>
        <div class="h-full w-full center">
          <div class="h-60% w-full between flex-col">
            <div class="w-full between">
              <div>
                <div v-ellipsis>
                  预算执行情况(万元)
                </div>
                <YoungCountUp :count="data?.values?.[0]" :decimal-places="2" />
              </div>
              <YoungCountUp :count="data?.increment?.[0]" :decimal-places="1" showfix />
            </div>
            <div class="w-full between">
              <div>
                <div v-ellipsis>
                  本月运维费用(万元)
                </div>
                <YoungCountUp :count="data?.values?.[1]" :decimal-places="2" />
              </div>
              <YoungCountUp :count="data?.increment?.[1]" :decimal-places="1" showfix />
            </div>
          </div>
        </div>
      </YoungSectionContainer>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
