<!--
 * @Author: zhangyang
 * @Date: 2023-07-25 16:45:39
 * @LastEditTime: 2023-08-25 16:55:10
 * @Description:
-->
<script lang="ts" setup>
import { YoungDialog, YoungPagination, YoungSearchForm, YoungTablePro } from '@bluesyoung/ui-vue3-element-plus'
import { useRoleApi, useRoleBase, useRoleMenu } from './hooks/useRole'

definePageMeta({
  title: '角色管理',
})

const {
  query,
  queryScheme,
  reset,
  getList,
  tableHead,
  tableData,
  baseFormRef,
  base,
} = useRoleBase()

const { showPriority, menu } = useRoleMenu()

const { showApi, api } = useRoleApi()

useTabReOpen(getList)
</script>

<template>
  <ElCard>
    <YoungSearchForm v-model="query" :search-scheme="queryScheme" :on-search="getList" :on-reset="reset">
      <template #btns>
        <ElButton type="success" @click="base.isAdd = true">
          添加角色
        </ElButton>
      </template>
    </YoungSearchForm>
  </ElCard>

  <br>

  <ElCard>
    <YoungTablePro :table-data="tableData" :table-head="tableHead">
      <template #operate>
        <ElTableColumn label="操作" width="300px" fixed="right">
          <template #default="scope">
            <ElButton type="primary" link @click="base.edit(scope.row)">
              信息编辑
            </ElButton>
            <ElButton type="primary" link @click="menu.edit(scope.row)">
              菜单编辑
            </ElButton>
            <ElButton type="primary" link @click="api.edit(scope.row)">
              接口编辑
            </ElButton>
            <ElButton type="danger" link @click="base.del(scope.row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </template>
    </YoungTablePro>
    <YoungPagination
      v-model:page="query.pageNum" v-model:limit="query.pageSize" :total="query.total"
      @page-change="getList"
    />
  </ElCard>
  <!-- 基础信息编辑 -->
  <YoungDialog
    :is-add="base.isAdd" :diff-form="base.form" :is-edit="base.isEdit" width="520px" @sure="base.sure"
    @clear="base.clear"
  >
    <template #body>
      <ElForm
        ref="baseFormRef" :model="base.form" label-width="120px"
        :label-position="WindowSize['lt-lg'] ? 'top' : 'left'"
      >
        <ElFormItem label="角色名称(中文)" prop="name" :rules="[{ required: true, message: '请填写角色名称', trigger: 'blur' }]">
          <ElInput v-model.trim="base.form.name" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="关键字(英文)" prop="keyword" :rules="[{ required: true, message: '请填写关键字', trigger: 'blur' }]">
          <ElInput v-model.trim="base.form.keyword" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="角色描述">
          <ElInput v-model.trim="base.form.desc" class="!w-300px" />
        </ElFormItem>
      </ElForm>
    </template>
  </YoungDialog>
  <!-- 菜单编辑 -->
  <YoungDialog
    real-title="菜单编辑" :diff-form="menu.checkMap" :is-edit="showPriority" top="5vh" width="1200px"
    @sure="menu.sure" @clear="menu.clear"
  >
    <template #body>
      <ElTable :data="menu.tableData" row-key="id" :default-expand-all="false" class="max-h-600px !overflow-y-auto">
        <ElTableColumn prop="name" label="节点名称" width="320px">
          <template #default="scope">
            <ElCheckbox v-model="menu.checkMap[scope.row.id]" @change="menu.selectChange(scope.row)">
              {{
                scope.row.title
              }}
            </ElCheckbox>
          </template>
        </ElTableColumn>
        <ElTableColumn v-for="(item, index) in menu.tableHead" v-bind="item" :key="`${index}fsdjhfaer`" />
        <ElTableColumn prop="name" label="隐藏/显示">
          <template #default="scope">
            <ElSwitch
              v-model="scope.row.visible" :active-value="1" :inactive-value="0" active-color="#409EFF"
              inactive-color="#909399" disabled
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </template>
  </YoungDialog>
  <!-- 接口编辑 -->
  <YoungDialog
    real-title="接口编辑" :diff-form="api.checkMap" :is-edit="showApi" top="5vh" width="1200px" @sure="api.sure"
    @clear="api.clear"
  >
    <template #body>
      <ElTable :data="api.tableData" row-key="id" :default-expand-all="false" class="max-h-600px !overflow-y-auto">
        <ElTableColumn prop="name" width="100px">
          <template #header>
            <ElCheckbox v-model="api.isAll" @change="api.changeAll">
              全选
            </ElCheckbox>
          </template>
          <template #default="scope">
            <ElCheckbox v-model="api.checkMap[scope.row.id]">
              {{ scope.row.title }}
            </ElCheckbox>
          </template>
        </ElTableColumn>
        <ElTableColumn v-for="(item, index) in api.tableHead" v-bind="item" :key="`${index}fsdjhfaer`" />
      </ElTable>
    </template>
  </YoungDialog>
</template>
