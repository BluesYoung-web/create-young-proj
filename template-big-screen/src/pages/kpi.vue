<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:45:20
 * @LastEditTime: 2024-02-02 14:45:20
 * @Description:
-->
<script setup lang='ts'>
import echarts from '~/components/YoungECharts/config'
import mapJson from '~/assets/data/china.json'

const { options, setOptions } = useEcharts()

const province = ['安徽', '福建', '江苏', '浙江']

onMounted(() => {
  mapJson.features.forEach((item, index) => {
    item.properties.name = province[index]
  })
  echarts.registerMap('CN', mapJson as any)

  setOptions({
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        type: 'map',
        map: 'CN',
        roam: false,
        aspectScale: 1,
        zoom: 1.2,
        selectedMode: false,
        label: {
          show: true,
          color: '#1cd8f5',
          fontSize: 16,
        },
        emphasis: {
          label: { color: '#1cd8f5' },
          itemStyle: {
            areaColor: isDark.value ? '#0b2035' : '#5db5b2',
          },
        },
        itemStyle: {
          areaColor: isDark.value ? '#101d2c' : '5db5b2',
          borderColor: '#01c7e3',
        },
      },
    ],
  })
})

watch(isDark, () => {
  mapJson.features.forEach((item, index) => {
    item.properties.name = province[index]
  })
  echarts.registerMap('CN', mapJson as any)

  setOptions({
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        type: 'map',
        map: 'CN',
        roam: false,
        aspectScale: 1,
        zoom: 1.2,
        selectedMode: false,
        label: {
          show: true,
          color: isDark.value ? '#1cd8f5' : '#fff',
          fontSize: 16,
        },
        emphasis: {
          label: { color: isDark.value ? '#1cd8f5' : '#ddd' },
          itemStyle: {
            areaColor: isDark.value ? '#0b2035' : '#75d4d1',
          },
        },
        itemStyle: {
          areaColor: isDark.value ? '#101d2c' : '#5db5b2',
          borderColor: isDark.value ? '#01c7e3' : '#fefefe',
        },
      },
    ],
  })
})
</script>

<template>
  <div class="h-full center">
    <div class="h-full w-90% flex flex-col">
      <div class="contanier-border">
        <div />
        <div />
        <div />
        <div />
        <div class="w-full center text-base">
          运营关键指标
        </div>
      </div>
      <dv-border-box12 :color="['#5893a6', '#ffda67']" :background-color="isDark ? '#1c3b4b' : '#f9f9f9'" class="my-4 h-full center flex-1">
        <YoungECharts width="100%" height="100%" :options="options" />
      </dv-border-box12>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contanier-border{
 --uno:relative px-2 py-4  text-sm w-full border-1 border-solid border-[#5893a6] ;

 > div:nth-child(1){
  --uno:h-1.5 w-1.5 bg-[#ffda67] absolute top-0 left-0 ;
 }

 > div:nth-child(2){
  --uno:h-1.5 w-1.5 bg-[#ffda67] absolute top-0 right-0 ;
 }

 > div:nth-child(3){
  --uno:h-1.5 w-1.5 bg-[#ffda67] absolute bottom-0 left-0 ;
 }

  > div:nth-child(4){
  --uno:h-1.5 w-1.5 bg-[#ffda67] absolute bottom-0 right-0 ;
 }
}
</style>
