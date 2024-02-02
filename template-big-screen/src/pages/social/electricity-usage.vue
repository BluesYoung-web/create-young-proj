<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:43:35
 * @LastEditTime: 2024-02-02 14:43:36
 * @Description:
-->
<script setup lang='ts'>
import echarts from '~/components/YoungECharts/config'

const { data, options } = useLoadData(apis.get.getElectricityUsage, (res) => {
  return {
    grid: {
      left: '2%',
      right: '4%',
      top: '30%',
      bottom: '0%',
      containLabel: true,
    },
    title: {
      text: '全社会用电量',
      left: 'center',
      top: '0',
      textStyle: {
        fontSize: '12px',
        width: 250,
        overflow: 'break',
        color: '#aed3dd',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      show: false,
    },
    xAxis: [
      {
        type: 'category',
        data: ['福建', '浙江', '安徽', '上海', '江苏'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '用电量',
        min: 0,
        max: 4000,
      },
      {
        type: 'value',
        name: '增长率',
        min: 0,
        max: 8,
      },
    ],
    series: [
      {
        name: '用电量',
        type: 'bar',
        tooltip: {
          valueFormatter(value) {
            return `${value as number}`
          },
        },
        data: res.electricity,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#db8195',
            },
            {
              offset: 1,
              color: '#603969',
            },
          ]),
        },
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter(value) {
            return `${value as number}`
          },
        },
        itemStyle: {
          color: '#855661',
        },
        data: res.electricity.map(item => Math.ceil((item / 500))),
      },
    ],
  }
})
</script>

<template>
  <div class="h-full flex flex-col">
    <YoungSectionHeader index="3" title="全社会用电量" />
    <div v-if="data" class="h-full flex flex-1 py-4">
      <YoungSectionContainer>
        <div class="h-full w-full center">
          <div class="h-60% w-full between flex-col">
            <div class="w-full between">
              <div>
                <div v-ellipsis>
                  本月全网用电量(亿千瓦时)
                </div>
                <YoungCountUp :count="data?.values?.[0]" :decimal-places="2" />
              </div>
              <YoungCountUp :count="data?.increment?.[0]" :decimal-places="1" showfix />
            </div>
            <div class="w-full between">
              <div>
                <div v-ellipsis>
                  本年用电负荷(万千瓦时)
                </div>
                <YoungCountUp :count="data?.values?.[1]" />
              </div>
              <YoungCountUp :count="data?.increment?.[1]" :decimal-places="1" showfix />
            </div>
          </div>
        </div>
      </YoungSectionContainer>
      <div class="h-full w-50% center">
        <YoungECharts :options="options" height="200px" width="250px" />
      </div>
    </div>
  </div>
</template>
