<!--
 * @Author: zhangyang
 * @Date: 2022-10-27 11:28:27
 * @LastEditTime: 2023-01-09 10:32:20
 * @Description: 
-->
<route lang="yaml">
meta:
  title: 用户管理
  authPath: /system/user
</route>

<script lang="ts" setup>
import { useFormMode, YoungDialog, YoungPagination, YoungTable, YoungSelect } from '@bluesyoung/ui-vue3-element-plus';
import type { TableHeadItem, TableDataItem, SelectOptionItem } from '@bluesyoung/ui-vue3-element-plus';
import { deepClone } from '@bluesyoung/utils';
import { RoleItem, UserItem } from '@/typings';
import { apis } from '@/modules/3-net';

interface Form extends UserItem { };
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
    query.pageNum = 1;
  },
  cgEffect: () => getList()
});
const tableHead: TableHeadItem<Form>[] = [
  { prop: 'id', label: '用户ID' },
  { prop: 'username', label: '用户名' },
  { prop: 'mobile', label: '手机号' },
  { prop: 'role_name', label: '角色名称' },
  { prop: 'creator', label: '创建信息' },
];
interface Query extends BaseQuery {
  username: string;
  mobile: string;
  status: 0 | 1;
};
const query = reactive<Query>({
  pageNum: 1,
  pageSize: 50,
  total: 0,
  username: '',
  mobile: '',
  status: 1
});

const tableData = ref<TableDataItem<Form>[]>([]);
const roleList = ref<SelectOptionItem<number>[]>([]);
const getList = async () => {
  const { list: role_list } = await apis.get.getRoleList({ noPagination: true });
  roleList.value = (role_list || []).map((item: RoleItem) => {
    return {
      label: item.name,
      value: item.id
    };
  });

  const { list, pageNum, pageSize, total } = await apis.get.getUserList(query);
  tableData.value = deepClone(list || []);
  query.pageNum = +pageNum || 1;
  query.pageSize = +pageSize || 50;
  query.total = +total || 0;
};
/**
 * @param id userId
 * @param status 0 | 1
 */
const changeStatus = async (id: number, status: number) => {
  await apis.patch.changeUserItem({ id, status });
  ElMessage.success('修改成功！');
  getList();
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

getList();
</script>

<template>
  <div class="flex">
    <div class="m-2">
      <ElInput v-model="query.username" placeholder="请输入用户名" />
    </div>
    <div class="m-2">
      <ElInput v-model="query.mobile" placeholder="请输入手机号" :maxlength="11" />
    </div>
    <div class="m-2 w-50">
      <ElSelect v-model="query.status" placeholder="请选择状态" clearable>
        <ElOption :value="1" label="1-启用" />
        <ElOption :value="0" label="0-禁用" />
      </ElSelect>
    </div>
    <div class="m-2">
      <ElButton type="primary" @click="getList">搜索</ElButton>
    </div>
    <div class="m-2">
      <ElButton type="success" @click="isAdd = true">添加用户</ElButton>
    </div>
  </div>
  <div class="m-2">
    <YoungTable :table-data="tableData" :table-head="tableHead" :table-height="680">
      <template #switch>
        <ElTableColumn label="禁用/启用">
          <template #default="scope">
            <ElSwitch v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="#409EFF"
              inactive-color="#909399" @change="(e) => changeStatus(scope.row.id, e as number)" />
          </template>
        </ElTableColumn>
      </template>
      <template #operate>
        <ElTableColumn label="操作" width="300px" fixed="right">
          <template #default="scope">
            <ElButton type="primary" link @click="edit(scope.row)">编辑</ElButton>
            <ElButton type="warning" link @click="changePwd(scope.row)">修改密码</ElButton>
            <ElButton type="danger" link @click="del(scope.row)">删除</ElButton>
          </template>
        </ElTableColumn>
      </template>
    </YoungTable>
    <YoungPagination v-show="query.total > 0" v-model:page="query.pageNum" v-model:limit="query.pageSize"
      :total="query.total" @page-change="getList" />
  </div>
  <YoungDialog :is-add="isAdd" :is-edit="isEdit" width="520px" @sure="sure" @clear="clear">
    <template #body>
      <ElForm ref="formRef" :model="form" label-width="100px">
        <ElFormItem label="用户名" prop="username" :rules="{ required: true, message: '请输用户名', trigger: 'blur' }">
          <ElInput v-model="form.username" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="昵称" prop="nickname" :rules="{ required: true, message: '请输昵称(用于右上角展示)', trigger: 'blur' }">
          <ElInput v-model="form.nickname" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="手机号" prop="mobile" :rules="{ required: true, message: '请输手机号', trigger: 'blur' }">
          <ElInput v-model="form.mobile" :maxlength="11" class="!w-300px" />
        </ElFormItem>
        <ElFormItem label="角色">
          <YoungSelect v-model="form.roleId" placeholder="请选择角色" :options="roleList" />
        </ElFormItem>
        <ElFormItem v-if="isAdd" label="初始密码" prop="initPassword"
          :rules="{ required: true, message: '请输初始密码', trigger: 'blur' }">
          <ElInput v-model="form.initPassword" class="!w-300px" />
        </ElFormItem>
      </ElForm>
    </template>
  </YoungDialog>
</template>
