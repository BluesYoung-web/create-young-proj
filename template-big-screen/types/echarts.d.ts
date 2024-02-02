/*
 * @Author: zhangyang
 * @Date: 2024-02-02 12:05:08
 * @LastEditTime: 2024-02-02 12:07:33
 * @Description:
 */
import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  MapSeriesOption,
  PieSeriesOption,
} from 'echarts/charts'

import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'

import type { ComposeOption } from 'echarts/core'

declare global {
  type EChartsOption = ComposeOption<
    | LineSeriesOption
    | GridComponentOption
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | BarSeriesOption
    | DatasetComponentOption | PieSeriesOption | GaugeSeriesOption | MapSeriesOption | ToolboxComponentOption
  >
}
