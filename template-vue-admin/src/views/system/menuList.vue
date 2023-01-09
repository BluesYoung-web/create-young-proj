<!--
 * @Author: zhangyang
 * @Date: 2022-05-30 16:28:37
 * @LastEditTime: 2023-01-06 11:35:16
 * @Description: 菜单管理
-->
<route lang="yaml">
meta:
  title: 菜单管理
  authPath: /system/menuList
</route>

<script lang="ts" setup>
import { deepClone, isArray } from '@bluesyoung/utils';
import { useFormMode, YoungDialog } from '@bluesyoung/ui-vue3-element-plus';
import { apis } from '@/modules/3-net';

const FORM_TEMP: NavArrItem = {
  breadcrumb: 0,
  component: '',
  createdAt: '',
  creator: '',
  icon: '',
  id: 0,
  name: '',
  not_dev: 0,
  parentId: 0,
  path: '',
  permission: '',
  redirect: '',
  sort: 0,
  status: 1,
  title: '',
  updatedAt: '',
  visible: 1
};
// key 的类型必须为 string 才会生效！！！
const expandKeys = ref<Set<string>>(new Set());

let tempArr: string[] = [];
const getFatherAndSon = (arr: NavArrItem[], num?: number): string[] => {
  if (num === 1) {
    tempArr = [];
  }
  for (const item of arr) {
    tempArr.push(item.id + '');
    if (item.children && isArray(item.children) && item.children.length > 0) {
      getFatherAndSon(deepClone(item.children));
    }
  }
  return tempArr;
};
const expandChange = (...args: any) => {
  const [row, isOpen] = args as [NavArrItem, boolean];
  const autoid = row.id;
  if (isOpen) {
    expandKeys.value.add(autoid + '');
  } else {
    const allSub = getFatherAndSon([row], 1);
    allSub.forEach((v) => expandKeys.value.delete(v));
  }
};
const tableData = ref<NavArrItem[]>([]);

const topMenuOption = ref<Partial<NavArrItem>[]>([]);

/**
 * 获取节点列表
 */
const getList = async () => {
  const list = Object.values(await apis.get.getMenuList());

  tableData.value = list;

  topMenuOption.value = [
    { title: '顶级目录', children: list, id: 0 }
  ];
};

const {
  isAdd,
  isEdit,
  form,
  edit,
  del,
  sure,
  clear,
  formRef,
  validForm
} = useFormMode<NavArrItem>(FORM_TEMP, {
  addCbk: async () => {
    const res = await validForm() as boolean;
    if (res) {
      const v = deepClone(form.value);
      await apis.post.addMenuItem(v);
      ElMessage.success('菜单添加成功！');
    }
    return res;
  },
  modCbk: async () => {
    const res = await validForm() as boolean;
    if (res) {
      const v = deepClone(form.value);
      await apis.patch.changeMenuItem(v);
      ElMessage.success('菜单修改成功！');
    }
    return res;
  },
  delCbk: async (nav: NavArrItem) => {
    apis.delete.deleteMenu(nav.id.toString());
    expandKeys.value.delete(nav.id.toString());
    ElMessage.success('节点删除成功！');
    // 框架有 bug，视图更新不及时
    location.reload();
  },
  cgEffect: async () => {
    await getList();
  }
});

/**
 * 添加节点
 */
const add = () => {
  form.value.parentId = 0;
  isAdd.value = true;
};

const changeVisiable = async (id: number, visible: number) => {
  await apis.patch.changeMenuItem({ id, visible });
  ElMessage.success('修改成功！');
  getList();
};

getList()
</script>

<template>
  <div class="index">
    <div class="caozuoFat">
      <ElButton type="primary" plain @click="add">新建菜单</ElButton>
    </div>
    <!-- 节点列表 -->
    <ElTable :data="tableData" style="width: 100%; margin-bottom: 20px;" :tree-props="{ children: 'children' }"
      row-key="id" :expand-row-keys="[...expandKeys]" @expand-change="expandChange">
      <ElTableColumn prop="name" label="英文名称" width="320px" />
      <ElTableColumn prop="title" label="标题" />
      <ElTableColumn prop="sort" label="同级排序" />
      <ElTableColumn prop="component" label="页面路径" />
      <ElTableColumn prop="visible" label="隐藏/显示">
        <template #default="scope">
          <ElSwitch v-model="scope.row.visible" :active-value="1" :inactive-value="0" active-color="#409EFF"
            inactive-color="#909399" @change="(e) => changeVisiable(scope.row.id, e as number)" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="creator" label="创建人" />
      <ElTableColumn label="操作" width="300" fixed="right">
        <template #default="scope">
          <ElButton @click="edit(scope.row)">编辑</ElButton>
          <ElButton type="danger" @click="del(scope.row)">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <!-- 添加 / 编辑 -->
    <YoungDialog width="370px" :is-add="isAdd" :is-edit="isEdit" @sure="sure" @clear="clear">
      <template #body>
        <ElForm ref="formRef" :model="form" label-width="80px">
          <ElFormItem label="上级目录">
            <ElCascader :model-value="form.parentId" :props="{
              label: 'title',
              value: 'id',
              checkStrictly: true,
              multiple: false
            }" :options="topMenuOption" :show-all-levels="false"
              @update:model-value="(e: any) => form.parentId = e[e.length - 1]" />
          </ElFormItem>
          <ElFormItem label="英文名称" prop="name" :rules="{ required: true, message: '请输入英文名', trigger: 'blur' }">
            <ElInput v-model="form.name" placeholder="请输入英文名" />
          </ElFormItem>
          <ElFormItem label="标题" prop="title" :rules="{ required: true, message: '请输入页面标题', trigger: 'blur' }">
            <ElInput v-model="form.title" placeholder="请输入页面标题" />
          </ElFormItem>
          <ElFormItem label="排序">
            <ElInput v-model.number="form.sort" />
          </ElFormItem>
          <ElFormItem label="路径" prop="component" :rules="form.parentId === 0 ? {} :
            { message: '请输入合法的路径, eg: /path/page', trigger: 'blur', validator: (_: any, v: string) => v.trim() === '' || /\/(.*)\/(.*)/.test(v) }
          ">
            <ElInput v-model="form.component" />
          </ElFormItem>
        </ElForm>
      </template>
    </YoungDialog>
  </div>
</template>