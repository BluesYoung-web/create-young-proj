/*
 * @Author: zhangyang
 * @Date: 2023-07-26 15:51:14
 * @LastEditTime: 2023-07-28 11:22:35
 * @Description:
 */
import type {
  SelectOptionItem,
  TableDataItem,
  TableHeadItem,
  YoungSearchScheme,
} from '@bluesyoung/ui-vue3-element-plus'
import { YoungSelect, useFormMode, useQuery } from '@bluesyoung/ui-vue3-element-plus'
import { deepClone } from '@bluesyoung/utils'

export function useRoleBase() {
  const FORM_TEMP: RoleItem = {
    id: 0,
    name: '',
    keyword: '',
    desc: '',
    status: 1,
    sort: 0,
  }

  const { isAdd, isEdit, edit, del, sure, clear, form, formRef, validForm } = useFormMode(
    FORM_TEMP,
    {
      addCbk: async () => {
        const res = (await validForm()) as boolean
        if (res) {
          const v = deepClone(form.value)
          await apis.post.addRoleItem(v)
          ElMessage.success('新增成功！')
        }
        return res
      },
      modCbk: async () => {
        const res = (await validForm()) as boolean
        if (res) {
          const v = deepClone(form.value)
          await apis.patch.changeRoleItem(v)
          ElMessage.success('修改成功！')
        }
        return res
      },
      delCbk: async (row) => {
        await apis.delete.deleteRole(row.id.toString())
        ElMessage.success('删除成功！')
        query.value.pageNum = 1
      },
      cgEffect: () => getList(),
    },
  )

  const options: SelectOptionItem[] = [
    { label: '禁用', value: 0 },
    { label: '启用', value: 1 },
  ]

  const tableHead: TableHeadItem<RoleItem>[] = [
    { label: '角色ID', prop: 'id' },
    { label: '角色关键字', prop: 'keyword' },
    { label: '角色名称', prop: 'name' },
    { label: '角色描述', prop: 'desc' },
    { label: '创建信息', prop: 'creator' },
    {
      label: '启用状态',
      prop: 'status',
      render: row =>
        h(YoungSelect, {
          'modelValue': row.status,
          options,
          'onUpdate:modelValue': async (status) => {
            // 状态未修改
            if (status === row.status)
              return

            row.status = status as 0 | 1
            await apis.patch.changeRoleItem(row)
            ElMessage.success('修改成功！')
          },
        }),
    },
  ]
  const tableData = ref<TableDataItem<RoleItem>[]>([])
  const getList = async () => {
    const { list, pageNum, pageSize, total } = await apis.get.getRoleList(query.value)
    tableData.value = deepClone(list || [])
    query.value.pageNum = +pageNum || 1
    query.value.pageSize = +pageSize || 50
    query.value.total = +total || 0
  }

  interface Query extends BaseQuery {
    name: string
    keyword: string
    status: 0 | 1
  }

  const { query, reset } = useQuery<Query>(
    {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      name: '',
      keyword: '',
      status: 1,
    },
    getList,
  )

  const queryScheme: YoungSearchScheme<Query> = {
    name: {
      type: 'input',
      tip: '角色名称',
      attrs: {
        placeholder: '请输入角色名称(中文)',
      },
    },
    keyword: {
      type: 'input',
      tip: '角色关键字',
      attrs: {
        placeholder: '请输入角色关键字(英文)',
      },
    },
    status: {
      type: 'select',
      tip: '状态',
      attrs: {
        placeholder: '角色状态',
      },
      options,
    },
  }

  return {
    query,
    queryScheme,
    getList,
    reset,
    tableHead,
    tableData,
    baseFormRef: formRef,
    base: reactive({
      form,
      isAdd,
      isEdit,
      edit,
      del,
      sure,
      clear,
    }),
  }
}

export function useRoleMenu() {
  const showPriority = ref(false)
  const currRole = ref(0)
  const access = ref<number[]>([])
  const origin = ref<number[]>([])

  const tableHead = ref<TableHeadItem<NavArrItem>[]>([
    { label: '菜单名称', prop: 'title' },
    { label: '菜单id', prop: 'id' },
    { label: '父节点', prop: 'parentId' },
    { label: '页面路径', prop: 'component' },
  ])
  const tableData = ref<TableDataItem<NavArrItem>[]>([])

  const checkMap = ref<Record<number, boolean>>({})

  /**
   * 生成节点映射
   */
  const nodeMap = new Map<number, NavArrItem>()
  const generateNodeMap = (list: NavArrItem[]) => {
    for (const node of list) {
      nodeMap.set(node.id, node)
      if (node.children && node.children?.length > 0)
        generateNodeMap(node.children)
    }
  }

  /**
   * 多级联动选择
   */
  const selectChange = (item: NavArrItem) => {
    if (item.children && item.children?.length !== 0) {
      item.children.forEach((v) => {
        checkMap.value[v.id] = checkMap.value[item.id]
        selectChange(v)
      })
    }
    if (checkMap.value[item.id]) {
      while (item.parentId) {
        const tp = nodeMap.get(item.parentId)
        if (tp) {
          item = tp
          checkMap.value[item.id] = true
        }
        else {
          break
        }
      }
    }
  }

  const edit = async (row: TableDataItem<RoleItem>) => {
    currRole.value = row.id
    checkMap.value = {}
    nodeMap.clear()

    const { list, accessIds } = await apis.get.getRoleMenuTree(row.id)
    generateNodeMap(list);
    (Array.from(accessIds) as number[]).forEach((v) => {
      checkMap.value[v] = true
    })

    tableData.value = deepClone(list)
    access.value = accessIds
    origin.value = accessIds
    showPriority.value = true
  }
  const clear = () => {
    showPriority.value = false
    currRole.value = 0
    tableData.value.length = 0
  }

  const sure = async () => {
    const before = origin.value.slice()
    const now = Object.entries(checkMap.value)
      .filter(([k, v]) => v)
      .map(([k, v]) => +k)

    const add = now.filter(v => !before.includes(v))
    const del = before.filter(v => !now.includes(v))
    await apis.patch.changeRoleMenu(currRole.value, add, del)
    ElMessage.success('修改成功！')
    clear()
  }

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
  }
}

export function useRoleApi() {
  const showApi = ref(false)
  const currRole = ref(0)
  const access = ref<number[]>([])
  const origin = ref<number[]>([])

  const tableHead = ref<TableHeadItem<ApiItem>[]>([
    { prop: 'desc', label: '接口描述' },
    { prop: 'id', label: '接口ID' },
    { prop: 'method', label: '接口方法' },
    { prop: 'path', label: '请求地址' },
  ])
  const tableData = ref<TableDataItem<ApiItem>[]>([])

  const checkMap = ref<Record<number, boolean>>({})

  const edit = async (row: TableDataItem<RoleItem>) => {
    currRole.value = row.id
    checkMap.value = {}

    const { list, accessIds } = await apis.get.getRoleApis(row.id);
    (Array.from(accessIds) as number[]).forEach((v) => {
      checkMap.value[v] = true
    })

    tableData.value = deepClone(
      Array.from(list)
        .map((item: any) => item.children)
        .flat(),
    )

    access.value = accessIds
    origin.value = accessIds
    showApi.value = true

    isAll.value = tableData.value.length === access.value.length
  }
  const clear = () => {
    showApi.value = false
    currRole.value = 0
    tableData.value.length = 0
  }

  const sure = async () => {
    const before = origin.value.slice()
    const now = Object.entries(checkMap.value)
      .filter(([k, v]) => v)
      .map(([k, v]) => +k)

    const add = now.filter(v => !before.includes(v))
    const del = before.filter(v => !now.includes(v))
    await apis.patch.changeRoleApi(currRole.value, add, del)
    ElMessage.success('修改成功！')
    clear()
  }

  const isAll = ref(false)
  const changeAll = () => {
    tableData.value.forEach((i) => {
      checkMap.value[i.id] = isAll.value
    })
  }

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
  }
}
