<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:34:34
 * @LastEditTime: 2024-02-02 15:01:19
 * @Description:
-->
<route lang="yaml">
meta:
  layout: blank
</route>

<script setup lang="ts">
import SocialCondition from './social/condition.vue'
import ElectricityBuild from './electricity/build.vue'
import SocialElectricityUsage from './social/electricity-usage.vue'
import Kpi from './kpi.vue'
import ManageImprove from './manage-improve.vue'
import ElectricityReliability from './electricity/reliability.vue'
import SaleAndCost from './electricity/sale-and-cost.vue'
</script>

<template>
  <div class="box-border h-full flex flex-col overflow-hidden px-20 text">
    <YoungHeader class="relative -top-3" />
    <div class="relative flex-1 text-[#00706c] -top-1 dark:text-[--text-color]">
      <DvBorderBox12>
        <div class="grid grid-cols-16 h-full px-6 py-4">
          <div class="grid col-span-5 grid-rows-3 h-full">
            <RouterLink to="/social/condition">
              <SocialCondition />
            </RouterLink>
            <RouterLink to="/electricity/build">
              <ElectricityBuild />
            </RouterLink>
            <RouterLink to="/social/electricity-usage">
              <SocialElectricityUsage />
            </RouterLink>
          </div>
          <div class="col-span-6">
            <RouterLink to="/kpi">
              <Kpi />
            </RouterLink>
          </div>
          <div class="grid col-span-5 grid-rows-3 h-full">
            <RouterLink to="/manage-improve">
              <ManageImprove />
            </RouterLink>
            <RouterLink to="/electricity/reliability">
              <ElectricityReliability />
            </RouterLink>
            <RouterLink to="/electricity/sale-and-cost">
              <SaleAndCost />
            </RouterLink>
          </div>
        </div>
      </DvBorderBox12>
    </div>
  </div>
</template>
