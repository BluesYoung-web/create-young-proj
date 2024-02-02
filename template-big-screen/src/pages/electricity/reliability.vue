<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:48:13
 * @LastEditTime: 2024-02-02 14:48:14
 * @Description:
-->
<script setup lang='ts'>
import echarts from '~/components/YoungECharts/config'

const { data, options } = useLoadData<IGridReliability>(apis.get.getGridReliability, (res) => {
  return {
    title: {
      text: '管理提升',
      textStyle: {
        color: '#aed3dd',
        fontSize: 12,
        width: 250,
        overflow: 'break',
      },
      left: 'center',
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '30%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      show: true,
      itemHeight: 12,
      itemWidth: 12,
      itemGap: 6,
      textStyle: {
        fontSize: 10,
        color: '#92b1bb',
      },
      top: '12%',
    },
    series: [
      {
        data: res.data1,
        type: 'bar',
        name: '电网可靠性',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#2797f7',
            },
            {
              offset: 1,
              color: '#3e3f7e',
            },
          ]),
        },
      },
      {
        data: res.data2,
        type: 'bar',
        name: '售电及线损',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#b8429c',
            },
            {
              offset: 1,
              color: '#412557',
            },
          ]),
        },
      },
    ],
  }
})
</script>

<template>
  <div v-if="data" class="h-full flex flex-col">
    <YoungSectionHeader index="5" title="电网可靠性" />
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
                  本月1000KV线路跳闸条次
                </div>
                <div class="center-y">
                  <YoungCountUp :count="data?.values?.[0]" />
                  <div>次</div>
                </div>
              </div>
            </div>
            <div class="between py-2">
              <div>
                <div v-ellipsis>
                  500KV系统设备跳闸事件数
                </div>
                <div class="center-y">
                  <YoungCountUp :count="data?.values?.[1]" />
                  <div>起</div>
                </div>
              </div>
            </div>
            <div class="between">
              <div>
                <div v-ellipsis>
                  300MW及以上跳闸次数
                </div>
                <div class="center-y">
                  <YoungCountUp :count="data?.values?.[2]" />
                  <div>台次</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </YoungSectionContainer>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
