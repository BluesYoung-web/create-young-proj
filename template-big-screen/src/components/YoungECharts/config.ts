/*
 * @Author: zhangyang
 * @Date: 2024-02-02 12:05:08
 * @LastEditTime: 2024-02-02 12:07:33
 * @Description:
 */

// * 需要哪些组件和配置，请在 import 时手动添加。
import * as echarts from 'echarts/core'

// 引入用到的图表
import {
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PieChart,
} from 'echarts/charts'

// 引入提示框、数据集等组件
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'

// 引入标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'

// 引入 Canvas 渲染器，必须
import { SVGRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  GaugeChart,
  LabelLayout,
  SVGRenderer,
  LegendComponent,
  UniversalTransition,
])

export default echarts
