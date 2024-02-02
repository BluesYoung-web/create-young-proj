<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:49:50
 * @LastEditTime: 2024-02-02 14:49:51
 * @Description:
-->
<script setup lang='ts'>
import echarts from '~/components/YoungECharts/config'

const { data, options } = useLoadData(apis.get.getSalesOfElectricityAndLineLoss, (res) => {
  return {
    color: ['#80FFA5', '#00DDFF'],
    title: {
      text: '全网线损率',
      left: 'center',
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
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['福建', '浙江', '安徽', '上海', '江苏'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '网损率',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: res.data1,
      },
      {
        name: '增长率',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: res.data2,
      },
    ],
  }
})
</script>

<template>
  <div v-if="data" class="h-full flex flex-col">
    <YoungSectionHeader index="6" title="售电及线损" />
    <div class="h-full flex flex-1 py-4">
      <div class="h-full w-50% center">
        <YoungECharts :options="options" width="250px" height="200px" />
      </div>
      <YoungSectionContainer right>
        <div class="h-full between">
          <div class="w-full text-left">
            <div class="between">
              <div>
                <div v-ellipsis>
                  本年国网华中计划售电量
                </div>
                <YoungCountUp :count="data?.values?.[0]" />
              </div>
              <YoungCountUp :count="data?.increment?.[`0`]" showfix :decimal-places="1" />
            </div>
            <div class="between py-2">
              <div>
                <div v-ellipsis>
                  本月全网售电量
                </div>
                <YoungCountUp :count="data?.values?.[1]" />
              </div>
              <YoungCountUp :count="data?.increment?.[`1`]" showfix :decimal-places="1" />
            </div>
            <div class="between">
              <div>
                <div v-ellipsis>
                  全网线损率
                </div>
                <YoungCountUp :count="data?.values?.[2]" />
              </div>
              <YoungCountUp :count="data?.increment?.[`2`]" showfix :decimal-places="1" />
            </div>
          </div>
        </div>
      </YoungSectionContainer>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
