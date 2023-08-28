<!--
 * @Author: zhangyang
 * @Date: 2023-07-25 16:46:00
 * @LastEditTime: 2023-08-25 16:55:17
 * @Description:
-->
<script lang="ts" setup>
import { useFormMode, YoungDialog, YoungTablePro, YoungPagination, YoungSelect, useQuery, YoungSearchForm } from '@bluesyoung/ui-vue3-element-plus';
import type { TableDataItem, TableHeadItem, SelectOptionItem, YoungSearchScheme } from '@bluesyoung/ui-vue3-element-plus';
import { deepClone } from '@bluesyoung/utils';
import { ElButton } from 'element-plus';

definePageMeta({
  title: '用户管理'
});

interface Form extends UserItem { op?: any; };
const FORM_TEMP: Form = {
  id: 0,
  username: '',
  nickname: '',
  mobile: '',
  roleId: 1,
  status: 1,
  initPassword: ''
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
      await apis.post.addUserItem(v);
      ElMessage.success('新增成功！');
    }
    return res;
  },
  modCbk: async () => {
    const res = await validForm() as boolean;
    if (res) {
      const v = deepClone(form.value);
      await apis.patch.changeUserItem(v);
      ElMessage.success('修改成功！');
    }
    return res;
  },
  delCbk: async (row) => {
    await apis.delete.deleteUser(row.id.toString());
    ElMessage.success('删除成功！');
    query.value.pageNum = 1;
  },
  cgEffect: () => getList(),
});

const tableHead: TableHeadItem<Form>[] = [
  { prop: 'id', label: '用户ID' },
  { prop: 'username', label: '用户名' },
  { prop: 'mobile', label: '手机号' },
  { prop: 'role_name', label: '角色名称' },
  { prop: 'creator', label: '创建信息' },
  {
    prop: 'op', label: '操作', width: '300px', fixed: 'right', render: (row) => h('div', [
      hasPermission('/access/system/update/user') && h(ElButton, {
        type: 'primary',
        text: true,
        class: '!p-0',
        onClick: () => edit(row)
      }, {
        default: () => '编辑'
      }),
      hasPermission('/access/system/update/user') && h(ElButton, {
        type: 'warning',
        text: true,
        class: '!p-0',
        onClick: () => changePwd(row)
      }, {
        default: () => '修改密码'
      }),
      hasPermission('/access/system/del/user') && h(ElButton, {
        type: 'danger',
        text: true,
        class: '!p-0',
        onClick: () => del(row)
      }, {
        default: () => '删除'
      })
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

  const { list, pageNum, pageSize, total } = await apis.get.getUserList(query.value);
  tableData.value = deepClone(list || []);

  query.value.pageNum = +pageNum || 1;
  query.value.pageSize = +pageSize || 50;
  query.value.total = +total || 0;
};

const changePwd = (e: UserItem) => {
  ElMessageBox.prompt('请输入新密码').then(async ({ value }) => {
    value = value.trim()
    if (value) {
      await apis.patch.changeUserItem({ id: e.id, newPassword: value });
      ElMessage.success('修改成功！');
    }
  }).catch(() => null);
};

interface Query extends BaseQuery {
  username: string;
  mobile: string;
  status: 0 | 1;
}

const { query, reset } = useQuery<Query>(
  {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    username: '',
    mobile: '',
    status: 1
  },
  getList,
);
const queryScheme: YoungSearchScheme<Query> = {
  username: {
    type: 'input',
    tip: '用户名',
    attrs: {
      placeholder: '请输入用户名',
    },
  },
  mobile: {
    type: 'input',
    tip: '手机号',
    attrs: {
      placeholder: '请输入手机号',
      maxlength: 11
    }
  },
  status: {
    type: 'select',
    tip: '状态',
    attrs: {
      placeholder: '用户状态',
    },
    options: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }],
  }
};

const roleList = ref<SelectOptionItem<number>[]>([]);

useTabReOpen(getList);
</script>
<template>
  <ElCard>
    <YoungSearchForm v-model="query" :search-scheme="queryScheme" :on-search="getList" :on-reset="reset">
      <template #btns>
        <ElButton v-permission="'/access/system/create/user'" type="success" @click="isAdd = true">添加用户</ElButton>
      </template>
    </YoungSearchForm>
  </ElCard>

  <br />

  <ElCard>
    <YoungTablePro :table-data="tableData" :table-head="tableHead" />
    <YoungPagination v-model:page="query.pageNum" v-model:limit="query.pageSize" :total="query.total"
      @page-change="getList" />
  </ElCard>

  <YoungDialog :is-add="isAdd" :diff-form="form" :is-edit="isEdit" width="520px" @sure="sure" @clear="clear">
    <template #body>
      <ElForm ref="formRef" :model="form" label-width="100px" :label-position="WindowSize['lt-lg'] ? 'top' : 'left'">
        <ElFormItem label="用户名" prop="username" :rules="{ required: true, message: '请输用户名', trigger: 'blur' }">
          <ElInput v-model.trim="form.username" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="昵称" prop="nickname" :rules="{ required: true, message: '请输昵称(用于右上角展示)', trigger: 'blur' }">
          <ElInput v-model.trim="form.nickname" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="手机号" prop="mobile" :rules="{ required: true, message: '请输手机号', trigger: 'blur' }">
          <ElInput v-model.trim="form.mobile" :maxlength="11" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="角色">
          <YoungSelect v-model="form.roleId" placeholder="请选择角色" :options="roleList" />
        </ElFormItem>
        <ElFormItem v-if="isAdd" label="初始密码" prop="initPassword"
          :rules="{ required: true, message: '请输初始密码', trigger: 'blur' }">
          <ElInput v-model.trim="form.initPassword" class="!w-300px" />
        </ElFormItem>
      </ElForm>
    </template>
  </YoungDialog>
</template>
