<!--
 * @Author: zhangyang
 * @Date: 2023-07-25 16:44:56
 * @LastEditTime: 2023-07-26 16:44:26
 * @Description:
-->
<script lang="ts" setup>
import { useFormMode, YoungDialog, YoungTablePro, YoungPagination, YoungSelect, useQuery, YoungSearchForm } from '@bluesyoung/ui-vue3-element-plus';
import type { TableDataItem, TableHeadItem, SelectOptionItem, YoungSearchScheme } from '@bluesyoung/ui-vue3-element-plus';
import { deepClone } from '@bluesyoung/utils';
import { ElButton, ElTag } from 'element-plus';

definePageMeta({
  title: '接口管理'
});

interface Form extends ApiItem { op?: any; };
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
    query.value.pageNum = 1;
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
    prop: 'op', label: '操作', render: (row) => h('div', [
      h(ElButton, { type: 'primary', link: true, onClick: () => edit(row) }, { default: () => '编辑' }),
      h(ElButton, { type: 'danger', link: true, onClick: () => del(row) }, { default: () => '删除' })
    ])
  }
];
const tableData = ref<TableDataItem<Form>[]>([]);

const getList = async () => {
  const { list: role_list } = await apis.get.getRoleList({ noPagination: true });
  roleList.value = (role_list || []).map((item: RoleItem) => {
    return {
      label: item.name,
      value: item.id
    };
  });

  const { list, pageNum, pageSize, total } = await apis.get.getApiList(query.value);
  tableData.value = deepClone(list || []);
  query.value.pageNum = +pageNum || 1;
  query.value.pageSize = +pageSize || 50;
  query.value.total = +total || 0;
};

type Query = BaseQuery & Partial<Form>;
const { query, reset } = useQuery<Query>(
  {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    path: '',
  },
  getList,
);
const queryScheme: YoungSearchScheme<Query> = {
  path: {
    type: 'input',
    tip: '接口路径',
    attrs: {
      placeholder: '请输入接口路径',
    },
  },
};

const roleList = ref<SelectOptionItem<number>[]>([]);

getList();
</script>
<template>
  <ElCard>
    <YoungSearchForm v-model="query" :search-scheme="queryScheme" :on-search="getList" :on-reset="reset">
      <template #btns>
        <ElButton type="success" @click="isAdd = true">添加接口</ElButton>
      </template>
    </YoungSearchForm>
  </ElCard>

  <br />

  <ElCard>
    <YoungTablePro :table-data="tableData" :table-head="tableHead" />
    <YoungPagination v-model:page="query.pageNum" v-model:limit="query.pageSize" :total="query.total"
      @page-change="getList" />
  </ElCard>
  <YoungDialog :is-add="isAdd" :is-edit="isEdit" :diff-form="form" width="520px" @sure="sure" @clear="clear">
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
