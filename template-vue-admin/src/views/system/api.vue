<!--
 * @Author: zhangyang
 * @Date: 2022-10-27 14:24:32
 * @LastEditTime: 2023-01-09 11:51:07
 * @Description: 
-->
<route lang="yaml">
meta:
  title: 接口管理
  authPath: /system/api
</route>

<script lang="ts" setup>
import { useFormMode, YoungDialog, YoungTable, YoungPagination, YoungSelect } from '@bluesyoung/ui-vue3-element-plus';
import type { TableDataItem, TableHeadItem, SelectOptionItem } from '@bluesyoung/ui-vue3-element-plus';
import { deepClone } from '@bluesyoung/utils';
import type { ApiItem, RoleItem } from '@/typings';
import { MethodObj } from '@/typings';
import { apis } from '@/modules/3-net';
import { ElButton, ElTag } from 'element-plus';

interface Form extends ApiItem { };
const FORM_TEMP: Form = {
  id: 0,
  path: '',
  desc: '',
  method: 'POST',
  category: '',
  roleIds: []
};
const {
  isAdd,
  isEdit,
  edit,
  del,
  sure,
  clear,
  form,
  formRef,
  validForm
} = useFormMode<Form>(FORM_TEMP, {
  addCbk: async () => {
    const res = await validForm() as boolean;
    if (res) {
      const v = deepClone(form.value);
      await apis.post.addApiItem(v);
      ElMessage.success('新增成功！');
    }
    return res;
  },
  modCbk: async () => {
    const res = await validForm() as boolean;
    if (res) {
      const v = deepClone(form.value);
      await apis.patch.changeApiItem(v);
      ElMessage.success('修改成功！');
    }
    return res;
  },
  delCbk: async (row) => {
    await apis.delete.deleteApi(row.id.toString());
    ElMessage.success('删除成功！');
    query.pageNum = 1;
  },
  cgEffect: () => getList(),
});
const tableHead: TableHeadItem<Form>[] = [
  { prop: 'id', label: '接口ID' },
  { prop: 'desc', label: '接口描述' },
  { prop: 'category', label: '接口分组' },
  { prop: 'path', label: '接口路径' },
  { prop: 'creator', label: '创建信息' },
  {
    prop: 'method', label: '接口方法', render: (row) => h(ElTag, {
      effect: 'dark',
      type: MethodObj[row.method]
    },
      {
        default: () => row.method
      }
    )
  },
  {
    prop: 'id', label: '操作', render: (row) => h('div', [
      h(ElButton, { type: 'primary', link: true, onClick: () => edit(row) }, { default: () => '编辑' }),
      h(ElButton, { type: 'danger', link: true, onClick: () => del(row) }, { default: () => '删除' })
    ])
  }
];
const tableData = ref<TableDataItem<Form>[]>([]);

type Query = BaseQuery & Partial<Form>;
const query = reactive<Query>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  path: '',
});

const roleList = ref<SelectOptionItem<number>[]>([]);

const getList = async () => {
  const { list: role_list } = await apis.get.getRoleList({ noPagination: true });
  roleList.value = (role_list || []).map((item: RoleItem) => {
    return {
      label: item.name,
      value: item.id
    };
  });

  const { list, pageNum, pageSize, total } = await apis.get.getApiList(query);
  tableData.value = deepClone(list || []);
  query.pageNum = +pageNum || 1;
  query.pageSize = +pageSize || 50;
  query.total = +total || 0;
};

getList();
</script>

<template>
  <div class="flex">
    <div class="m-2">
      <ElInput v-model="query.path" placeholder="请输入接口路径" />
    </div>
    <div class="m-2">
      <ElButton type="primary" @click="getList">搜索</ElButton>
    </div>
    <div class="m-2">
      <ElButton type="success" @click="isAdd = true">添加接口</ElButton>
    </div>
  </div>
  <div class="m-2">
    <YoungTable :table-data="tableData" :table-head="tableHead" :table-height="680" />
    <YoungPagination v-model:page="query.pageNum" v-model:limit="query.pageSize" :total="query.total"
      @page-change="getList" />
  </div>
  <YoungDialog :is-add="isAdd" :is-edit="isEdit" width="520px" @sure="sure" @clear="clear">
    <template #body>
      <ElForm ref="formRef" :model="form" label-width="100px">
        <ElFormItem label="分组名称" prop="category" :rules="{ required: true, message: '请填写分组名称', trigger: 'blur' }">
          <ElInput v-model="form.category" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="接口描述" prop="desc" :rules="{ required: true, message: '请填写接口描述', trigger: 'blur' }">
          <ElInput v-model="form.desc" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="请求方法">
          <YoungSelect v-model="form.method" class="!w-300px"
            :options="Object.keys(MethodObj).map((item) => ({ label: item, value: item }))" />
        </ElFormItem>
        <ElFormItem label="接口路径" prop="path"
          :rules="{ message: '请填写合法的接口路径, eg: /user/list', trigger: 'blur', validator: (_: any, v: string) => /\/(.*)\/(.*)/.test(v) }">
          <ElInput v-model="form.path" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="关联角色">
          <YoungSelect v-model="form.roleIds" multiple placeholder="请选择角色" class="!w-300px" :options="roleList" />
        </ElFormItem>
      </ElForm>
    </template>
  </YoungDialog>
</template>