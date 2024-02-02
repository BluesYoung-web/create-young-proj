<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:40:50
 * @LastEditTime: 2024-02-02 14:42:06
 * @Description:
-->
<script setup lang='ts'>
import echarts from '~/components/YoungECharts/config'

const { data, options } = useLoadData<IPowerGridConstruction>(apis.get.getPowerGridConstruction, (res) => {
  return {
    grid: {
      left: '10%',
      right: '2%',
      top: '13%',
      bottom: '0%',
      containLabel: true,
    },
    title: {
      text: '固定资产投资完成情况',
      left: 'center',
      top: '0%',
      textStyle: {
        fontSize: '12px',
        width: 250,
        overflow: 'break',
        color: '#aed3dd',
      },

    },
    xAxis: {
      max(value) {
        return 120
      },
      show: false,
      type: 'value',
      boundaryGap: [0, 0.01],
      axisPointer: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: ['福建', '浙江', '安徽', '上海', '江苏'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#92b1bb',
      },
    },
    series: [
      {
        realtimeSort: true,
        type: 'bar',
        data: res.province,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
          color: '#92b1bb',
        },
        barWidth: '12px',
        barGap: '100%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#409ef7',
            },
            {
              offset: 1,
              color: '#11ccd6',
            },
          ]),
          borderRadius: [0, 9999, 9999, 0],
        },
      },
    ],
    tooltip: {
      show: true,
    },
    legend: {
      show: false,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  }
})
</script>

<template>
  <div class="h-full flex flex-col">
    <YoungSectionHeader index="2" title="电网建设" />
    <div class="h-full w-full flex flex-1 py-4">
      <YoungSectionContainer v-if="data">
        <div class="h-full w-full center">
          <div class="h-60% w-full between flex-col">
            <div class="w-full between">
              <div>
                <div v-ellipsis>
                  500KV线路长度(公里)
                </div>
                <YoungCountUp :count="data?.values?.[0]" :decimal-places="1" />
              </div>
              <YoungCountUp :count="data?.increment?.[0]" showfix :decimal-places="1" />
            </div>
            <div class="w-full between">
              <div>
                <div v-ellipsis>
                  500KV变电功率(万千伏安)
                </div>
                <YoungCountUp :count="data?.values?.[1]" :decimal-places="1" />
              </div>
              <YoungCountUp :count="data?.increment?.[1]" showfix :decimal-places="1" />
            </div>
          </div>
        </div>
      </YoungSectionContainer>
      <div class="h-full w-50% center">
        <YoungECharts width="250px" height="200px" :options="options" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
