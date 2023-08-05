<!--
 * @Author: zhangyang
 * @Date: 2023-07-25 16:45:17
 * @LastEditTime: 2023-08-02 10:44:39
 * @Description:
-->
<script lang="ts" setup>
import { YoungTablePro, useFormMode, YoungDialog, YoungSelect } from '@bluesyoung/ui-vue3-element-plus';
import type { TableHeadItem } from '@bluesyoung/ui-vue3-element-plus';
import { deepClone, isArray } from '@bluesyoung/utils';
import { ElButton } from 'element-plus';

definePageMeta({
  title: '菜单管理'
});

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
 * 生成节点映射
 */
const nodeMap = new Map<string, NavArrItem>();
const generateNodeMap = (list: NavArrItem[]) => {
  for (const node of list) {
    nodeMap.set(node.id.toString(), node);
    if (node.children && node.children?.length > 0) {
      generateNodeMap(node.children);
    }
  }
};

/**
 * 获取节点列表
 */
const getList = async () => {
  const list = Object.values(await apis.get.getMenuList());
  generateNodeMap(list);

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

const tableHead: TableHeadItem<NavArrItem>[] = [
  {
    prop: 'title', label: '标题', render: (row) => h('div', { class: 'inline-flex items-center justify-center' }, [
      h('div', { class: row.icon }),
      h('div', row.title)
    ])
  },
  {
    prop: 'sort', label: '同级排序', aligin: 'center', render: (row, i) => h('div', {
      class: 'flex text-2xl justify-center'
    }, [
      h('div', {
        class: 'i-ic-round-keyboard-arrow-up cursor-pointer',
        title: '向上',
        onClick: async () => {
          const arr = nodeMap.get(row.parentId.toString())?.children || [];
          const index = arr.findIndex((m) => m.id === row.id);
          if (index <= 0) {
            return ElMessage.warning('已经到最前面啦！');
          } else {
            const pre = arr[index - 1];

            const num = row.sort;
            const preNum = pre.sort;

            if (num !== preNum) {
              row.sort = preNum;
              pre.sort = num;
            } else {
              row.sort = num - 1;
            }
            await Promise.all([
              apis.patch.changeMenuItem(row),
              apis.patch.changeMenuItem(pre),
            ]);
            ElMessage.success('顺序修改成功！');
            getList();
          }
        }
      }),
      h('div', {
        class: 'i-ic-round-keyboard-arrow-down cursor-pointer',
        title: '向下',
        onClick: async () => {
          const arr = nodeMap.get(row.parentId.toString())?.children || [];
          const index = arr.findIndex((m) => m.id === row.id);
          if (index === arr.length - 1) {
            return ElMessage.warning('已经到最后面啦！');
          } else {
            const next = arr[index + 1];

            const num = row.sort;
            const nextNum = next.sort;

            if (num !== nextNum) {
              row.sort = nextNum;
              next.sort = num;
            } else {
              row.sort = num + 1;
            }
            await Promise.all([
              apis.patch.changeMenuItem(row),
              apis.patch.changeMenuItem(next),
            ]);
            ElMessage.success('顺序修改成功！');
            getList();
          }
        }
      }),
    ])
  },
  { prop: 'component', label: '页面路径' },
  {
    prop: 'visible', label: '隐藏/显示', render: (row) => h(YoungSelect, {
      modelValue: row.visible,
      options: [{ label: '显示', value: 1 }, { label: '隐藏', value: 0 }],
      'onUpdate:modelValue': async (e: number) => {
        // 状态未修改
        if (e === row.visible) {
          return;
        }

        row.visible = e;
        await apis.patch.changeMenuItem({ ...row, visible: e });
        ElMessage.success('菜单修改成功！');
      }
    })
  },
  { prop: 'creator', label: '创建时间' },
  {
    prop: 'id', label: '操作', fixed: 'right', width: '180', render: (row) => h('div', [
      h(ElButton, {
        text: true,
        class: '!p-0',
        type: 'primary',
        onClick: () => edit(row),
      }, {
        default: () => h('div', '编辑')
      }),
      h(ElButton, {
        type: 'primary',
        class: '!p-0',
        text: true,
        onClick: () => {
          form.value.parentId = row.id;
          isAdd.value = true;
        },
      }, {
        default: () => h('div', '添加子节点')
      }),
      h(ElButton, {
        text: true,
        class: '!p-0',
        type: 'danger',
        onClick: () => del(row),
      }, {
        default: () => h('div', '删除')
      })
    ])
  }
];

getList();
</script>

<template>
  <ElCard>
    <div>
      <ElButton type="primary" plain @click="add">新建菜单</ElButton>
    </div>
    <br />
    <!-- 节点列表 -->
    <YoungTablePro :table-data="tableData" :table-head="tableHead" :tree-props="{ children: 'children' }" row-key="id"
      :expand-row-keys="[...expandKeys]" @expand-change="expandChange" />
    <!-- 添加 / 编辑 -->
    <YoungDialog width="370px" :is-add="isAdd" :diff-form="form" :is-edit="isEdit" @sure="sure" @clear="clear">
      <template #body>
        <ElForm ref="formRef" :model="form" label-width="80px" :label-position="WindowSize['lt-lg'] ? 'top' : 'left'">
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
            <ElInput v-model.trim="form.name" placeholder="请输入英文名" />
          </ElFormItem>
          <ElFormItem label="标题" prop="title" :rules="{ required: true, message: '请输入页面标题', trigger: 'blur' }">
            <ElInput v-model.trim="form.title" placeholder="请输入页面标题" />
          </ElFormItem>
          <ElFormItem label="图标">
            <ElSelect v-model="form.icon" class="select_icon" placeholder="请选择图标">
              <template #prefix>
                <div :class="form.icon" />
              </template>
              <ElOption v-for="(item, index) in MenuIconList" :key="index + 'sfjhaeoir'" :value="item.label">
                <div :class="item.label" />
              </ElOption>
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="排序">
            <ElInputNumber v-model.number="form.sort" />
          </ElFormItem>
          <ElFormItem label="是否显示">
            <ElRadioGroup v-model="form.visible">
              <ElRadio :label="1">显示</ElRadio>
              <ElRadio :label="0">隐藏</ElRadio>
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem label="路径" prop="component" :rules="form.parentId === 0 ? {} :
            { message: '请输入合法的路径, eg: /path/page', trigger: 'blur', validator: (_: any, v: string) => v.trim() === '' || /\/(.*)\/(.*)/.test(v) }
            ">
            <ElInput v-model.trim="form.component" />
          </ElFormItem>
        </ElForm>
      </template>
    </YoungDialog>
  </ElCard>
</template>

<style lang="scss" scoped>
:deep(.select_icon .el-input__inner) {
  opacity: 0 !important;
}
</style>
