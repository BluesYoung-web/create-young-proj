/*
 * @Author: zhangyang
 * @Date: 2022-10-27 09:25:09
 * @LastEditTime: 2023-01-09 14:20:07
 * @Description:
 */
import type { RoleItem, ApiItem } from '@/typings';
import type { TableDataItem, TableHeadItem } from '@bluesyoung/ui-vue3-element-plus';
import { useFormMode } from '@bluesyoung/ui-vue3-element-plus';
import { deepClone } from '@bluesyoung/utils';
import { apis } from '@/modules/3-net';
export const useRoleBase = () => {
  const FORM_TEMP: RoleItem = {
    id: 0,
    name: '',
    keyword: '',
    desc: '',
    status: 1,
    sort: 0,
  };
  interface Query extends BaseQuery {
    name: string;
    keyword: string;
    status: 0 | 1;
  }
  const query = reactive<Query>({
    pageNum: 1,
    pageSize: 50,
    total: 0,
    name: '',
    keyword: '',
    status: 1,
  });

  const { isAdd, isEdit, edit, del, sure, clear, form, formRef, validForm } = useFormMode(
    FORM_TEMP,
    {
      addCbk: async () => {
        const res = (await validForm()) as boolean;
        if (res) {
          const v = deepClone(form.value);
          await apis.post.addRoleItem(v);
          ElMessage.success('新增成功！');
        }
        return res;
      },
      modCbk: async () => {
        const res = (await validForm()) as boolean;
        if (res) {
          const v = deepClone(form.value);
          await apis.patch.changeRoleItem(v);
          ElMessage.success('修改成功！');
        }
        return res;
      },
      delCbk: async (row) => {
        await apis.delete.deleteRole(row.id.toString());
        ElMessage.success('删除成功！');
        query.pageNum = 1;
      },
      cgEffect: () => getList(),
    },
  );

  /**
   * @param status 0 | 1
   */
  const changeStatus = async (id: number, status: number) => {
    await apis.patch.changeRoleItem({ id, status });
    ElMessage.success('修改成功！');
    getList();
  };

  const tableHead: TableHeadItem<RoleItem>[] = [
    { label: '角色ID', prop: 'id' },
    { label: '角色关键字', prop: 'keyword' },
    { label: '角色名称', prop: 'name' },
    { label: '角色描述', prop: 'desc' },
    { label: '创建信息', prop: 'creator' },
  ];
  const tableData = ref<TableDataItem<RoleItem>[]>([]);
  const getList = async () => {
    const { list, pageNum, pageSize, total } = await apis.get.getRoleList(query);
    tableData.value = deepClone(list || []);
    query.pageNum = +pageNum || 1;
    query.pageSize = +pageSize || 50;
    query.total = +total || 0;
  };

  return {
    query,
    getList,
    tableHead,
    tableData,
    baseFormRef: formRef,
    changeStatus,
    base: reactive({
      form,
      isAdd,
      isEdit,
      edit,
      del,
      sure,
      clear,
    }),
  };
};

export const useRoleMenu = () => {
  const showPriority = ref(false);
  const currRole = ref(0);
  const access = ref<number[]>([]);
  const origin = ref<number[]>([]);

  const tableHead = ref<TableHeadItem<NavArrItem>[]>([
    { label: '菜单名称', prop: 'title' },
    { label: '菜单id', prop: 'id' },
    { label: '父节点', prop: 'parentId' },
    { label: '页面路径', prop: 'component' },
  ]);
  const tableData = ref<TableDataItem<NavArrItem>[]>([]);

  const checkMap = ref<Record<number, boolean>>({});

  /**
   * 生成节点映射
   */
  const nodeMap = new Map<number, NavArrItem>();
  const generateNodeMap = (list: NavArrItem[]) => {
    for (const node of list) {
      nodeMap.set(node.id, node);
      if (node.children && node.children?.length > 0) {
        generateNodeMap(node.children);
      }
    }
  };

  /**
   * 多级联动选择
   */
  const selectChange = (item: NavArrItem) => {
    if (item.children && item.children?.length !== 0) {
      item.children.forEach((v) => {
        checkMap.value[v.id] = checkMap.value[item.id];
        selectChange(v);
      });
    }
    if (checkMap.value[item.id]) {
      while (item.parentId) {
        const tp = nodeMap.get(item.parentId);
        if (tp) {
          item = tp;
          checkMap.value[item.id] = true;
        } else {
          break;
        }
      }
    }
  };

  const edit = async (row: TableDataItem<RoleItem>) => {
    currRole.value = row.id;
    checkMap.value = {};
    nodeMap.clear();

    const { list, accessIds } = await apis.get.getRoleMenuTree(row.id);
    generateNodeMap(list);
    (Array.from(accessIds) as number[]).forEach((v) => {
      checkMap.value[v] = true;
    });

    tableData.value = deepClone(list);
    access.value = accessIds;
    origin.value = accessIds;
    showPriority.value = true;
  };
  const clear = () => {
    showPriority.value = false;
    currRole.value = 0;
    tableData.value.length = 0;
  };

  const sure = async () => {
    const before = origin.value.slice();
    const now = Object.entries(checkMap.value)
      .filter(([k, v]) => v)
      .map(([k, v]) => +k);

    const add = now.filter((v) => !before.includes(v));
    const del = before.filter((v) => !now.includes(v));
    await apis.patch.changeRoleMenu(currRole.value, add, del);
    ElMessage.success('修改成功！');
    clear();
  };

  return {
    showPriority,
    menu: reactive({
      checkMap,
      tableHead,
      tableData,
      edit,
      clear,
      sure,
      selectChange,
    }),
  };
};

export const useRoleApi = () => {
  const showApi = ref(false);
  const currRole = ref(0);
  const access = ref<number[]>([]);
  const origin = ref<number[]>([]);

  const tableHead = ref<TableHeadItem<ApiItem>[]>([
    { prop: 'desc', label: '接口描述' },
    { prop: 'id', label: '接口ID' },
    { prop: 'method', label: '接口方法' },
    { prop: 'path', label: '请求地址' },
  ]);
  const tableData = ref<TableDataItem<ApiItem>[]>([]);

  const checkMap = ref<Record<number, boolean>>({});

  const edit = async (row: TableDataItem<RoleItem>) => {
    currRole.value = row.id;
    checkMap.value = {};

    const { list, accessIds } = await apis.get.getRoleApis(row.id);
    (Array.from(accessIds) as number[]).forEach((v) => {
      checkMap.value[v] = true;
    });

    tableData.value = deepClone(
      Array.from(list)
        .map((item: any) => item.children)
        .flat(),
    );

    access.value = accessIds;
    origin.value = accessIds;
    showApi.value = true;

    isAll.value = tableData.value.length === access.value.length;
  };
  const clear = () => {
    showApi.value = false;
    currRole.value = 0;
    tableData.value.length = 0;
  };

  const sure = async () => {
    const before = origin.value.slice();
    const now = Object.entries(checkMap.value)
      .filter(([k, v]) => v)
      .map(([k, v]) => +k);

    const add = now.filter((v) => !before.includes(v));
    const del = before.filter((v) => !now.includes(v));
    await apis.patch.changeRoleApi(currRole.value, add, del);
    ElMessage.success('修改成功！');
    clear();
  };

  const isAll = ref(false);
  const changeAll = () => {
    tableData.value.forEach((i) => {
      checkMap.value[i.id] = isAll.value;
    });
  };

  return {
    showApi,
    api: reactive({
      checkMap,
      tableHead,
      tableData,
      edit,
      clear,
      sure,
      isAll,
      changeAll,
    }),
  };
};
