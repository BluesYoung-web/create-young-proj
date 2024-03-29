<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:32:40
 * @LastEditTime: 2024-02-02 14:32:40
 * @Description:
-->
<script setup lang='ts'>
import echarts from '~/components/YoungECharts/config'

const { data, options } = useLoadData<ISocialCondition>(apis.get.getSocialCondition, (res) => {
  return {
    grid: {
      left: '0%',
      right: '0%',
      top: ' 0%',
      bottom: '0%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
    },
    title: [
      {
        text: '国内生产总值',
        left: 'center',
        top: '0',
        textStyle: {
          fontSize: 12,
          color: '#aed3dd',
        },
      },
      {
        text: `${res?.increment?.reduce((pre, current) => (pre + current), 0).toFixed(2)}%`,
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 14,
          color: '#aed3dd',
        },
        subtextStyle: {
          fontSize: 12,
          color: '#afcfdc',
        },
        itemGap: 0,
      },
    ],
    legend: {
      bottom: '0%',
      textStyle: {
        color: '#90acb9',
        fontSize: '12px',
      },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 4,
    },
    series: [
      {
        name: '国内生产总值',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        labelLine: {
          show: true,
          length: 6,
          length2: 6,
        },
        label: {
          color: '#afcfdc',
          fontSize: 12,
          overflow: 'break',
          position: 'outside',
          formatter: '{d} %',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'bold',
          },
        },
        data: [
          {
            name: '第一产业',
            value: res?.industry?.[0],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: '#08d8d8', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#7affff', // 100% 处的颜色
                  },
                ],
                false,
              ),
            },
          },
          {
            name: '第二产业',
            value: res?.industry?.[1],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: '#fa53fa', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#e793f8', // 100% 处的颜色
                  },
                ],
                false,
              ),
            },
          },
          {
            name: '第三产业',
            value: res?.industry?.[2],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: '#7161fe', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#e388f2', // 100% 处的颜色
                  },

                ],
                false,
              ),
            },
          },
        ],
      },
    ],
  }
})
</script>

<template>
  <div v-if="data" class="h-full flex flex-col">
    <YoungSectionHeader index="1" title="社会状况" />
    <div class="h-full flex flex-1 py-4">
      <YoungSectionContainer>
        <div class="h-full between">
          <div class="w-full text-left">
            <div class="between">
              <div>
                <div v-ellipsis>
                  铁路货物运输量(万吨)
                </div>
                <YoungCountUp :count="data?.values?.[0]" />
              </div>
              <YoungCountUp :count="data?.increment?.[`0`]" showfix :decimal-places="1" />
            </div>
            <div class="between py-2">
              <div>
                <div v-ellipsis>
                  银行中长期贷款(亿元)
                </div>
                <YoungCountUp :count="data?.values?.[1]" />
              </div>
              <YoungCountUp :count="data?.increment?.[`1`]" showfix :decimal-places="1" />
            </div>
            <div class="between">
              <div>
                <div v-ellipsis>
                  耗电量(万千瓦时)
                </div>
                <YoungCountUp :count="data?.values?.[2]" />
              </div>
              <YoungCountUp :count="data?.increment?.[`2`]" showfix :decimal-places="1" />
            </div>
          </div>
        </div>
      </YoungSectionContainer>
      <div class="h-full w-50% center">
        <YoungECharts :options="options" width="250px" height="200px" />
      </div>
    </div>
  </div>
</template>
