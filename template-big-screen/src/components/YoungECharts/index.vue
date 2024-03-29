<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 12:04:31
 * @LastEditTime: 2024-02-02 12:11:47
 * @Description:
-->
<script setup lang="ts">
import type { EChartsType } from 'echarts/core'
import echarts from './config'

const props = withDefaults(defineProps<Props>(), {
  theme: null,
  loading: false,
})

interface Props {
  options?: EChartsOption
  theme?: Object | string | null
  loading?: boolean // 受控
  height: string
  width: string
  onMouseover?: (...args: any[]) => void
  onMouseout?: (...args: any[]) => void
}

const chartRef = ref<HTMLDivElement>()
const chartInstance = ref<EChartsType>()

function draw() {
  if (chartInstance.value && props.options)
    chartInstance.value.setOption(props.options, { notMerge: true })
}

function init() {
  if (!chartRef.value)
    return

  // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
  chartInstance.value = echarts.getInstanceByDom(chartRef.value)
  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: 'canvas',
      }),
    )

    // 绑定鼠标事件：
    if (props.onMouseover && props.options) {
      chartInstance.value.on('mouseover', (event: object) => {
        props.onMouseover?.(event, chartInstance.value, props.options)
      })
    }
    if (props.onMouseout && props.options) {
      chartInstance.value.on('mouseout', (event: object) => {
        props.onMouseout?.(event, chartInstance.value, props.options)
      })
    }

    draw()
  }
}

// 窗口自适应并开启过渡动画
function resize() {
  if (chartInstance.value)
    chartInstance.value.resize({ animation: { duration: 300 } })
}

// 自适应防抖优化
const debouncedResize = useDebounceFn(resize, 0, { maxWait: 800 })

// 对父组件暴露获取 ECharts 实例的方法，可直接通过实例调用原生函数
defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})

watch(props, () => {
  draw()
})

// 展示 loading 动画
watch(
  () => props.loading,
  (loading) => {
    loading
      ? chartInstance.value?.showLoading()
      : chartInstance.value?.hideLoading()
  },
)

onMounted(() => {
  init()
  window.addEventListener('resize', debouncedResize)
})

onBeforeUnmount(() => {
  // 容器被销毁之后，销毁实例，避免内存泄漏
  chartInstance.value?.dispose()
  window.removeEventListener('resize', debouncedResize)
})
</script>

<template>
  <div
    id="echart"
    ref="chartRef"
    :style="{ width: props.width, height: props.height }"
  />
</template>
