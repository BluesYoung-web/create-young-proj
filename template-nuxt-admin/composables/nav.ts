/*
 * @Author: zhangyang
 * @Date: 2023-06-01 12:03:44
 * @LastEditTime: 2023-07-21 16:59:24
 * @Description:
 */
export const useNavStore = defineStore('useNavStore', () => {
  const title = ref('');
  const sub_title = ref('');
  const nav_arr = ref<NavArrItem[]>([
    {
      id: 2,
      created_at: '2022-06-09 16:06:35',
      updated_at: '2023-01-03 17:08:21',
      name: 'systemRoot',
      title: '系统设置',
      icon: MenuIcons[0],
      path: '/system',
      redirect: '',
      component: '',
      permission: '',
      sort: 1,
      status: 1,
      visible: 1,
      breadcrumb: 0,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 88,
          created_at: '2023-01-03 17:09:45',
          updated_at: '2023-01-03 17:36:36',
          name: 'systemsettings',
          title: '权限及账号',
          icon: '',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 1,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 2,
          creator: '陈李炜',
          children: [
            {
              id: 4,
              created_at: '2022-06-09 16:06:35',
              updated_at: '2023-01-03 17:10:34',
              name: 'menu',
              title: '菜单管理',
              icon: 'tree-table',
              path: 'menu',
              redirect: '',
              component: '/system/menuList',
              permission: '',
              sort: 0,
              status: 1,
              visible: 1,
              breadcrumb: 1,
              parent_id: 88,
              creator: '陈李炜',
            },
            {
              id: 5,
              created_at: '2022-06-09 16:06:35',
              updated_at: '2023-01-03 17:10:07',
              name: 'role',
              title: '角色管理',
              icon: 'store',
              path: 'role',
              redirect: '',
              component: '/system/role',
              permission: '',
              sort: 1,
              status: 1,
              visible: 1,
              breadcrumb: 1,
              parent_id: 88,
              creator: '陈李炜',
            },
            {
              id: 6,
              created_at: '2022-06-09 16:06:35',
              updated_at: '2023-01-03 17:11:37',
              name: 'user',
              title: '管理员账号管理',
              icon: 'store',
              path: 'user',
              redirect: '',
              component: '/system/user',
              permission: '',
              sort: 2,
              status: 1,
              visible: 1,
              breadcrumb: 1,
              parent_id: 88,
              creator: '陈李炜',
            },
            {
              id: 7,
              created_at: '2022-06-09 16:06:35',
              updated_at: '2023-01-03 17:10:17',
              name: 'api',
              title: '接口管理',
              icon: 'store',
              path: 'api',
              redirect: '',
              component: '/system/api',
              permission: '',
              sort: 3,
              status: 1,
              visible: 1,
              breadcrumb: 1,
              parent_id: 88,
              creator: '陈李炜',
            },
          ],
        },
        {
          id: 42,
          created_at: '2022-10-21 09:19:59',
          updated_at: '2023-01-03 17:32:41',
          name: 'importRecords',
          title: '节假日配置',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 2,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 2,
          creator: '陈李炜',
          children: [
            {
              id: 43,
              created_at: '2022-10-21 09:20:54',
              updated_at: '2022-10-25 16:14:41',
              name: 'importRecordsList',
              title: '导入记录',
              icon: 'example',
              path: '',
              redirect: '',
              component: '/importRecords/importRecordsList',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 42,
              creator: 'super',
            },
          ],
        },
        {
          id: 22,
          created_at: '2022-08-17 17:45:47',
          updated_at: '2023-01-03 17:36:28',
          name: 'serve',
          title: '服务管理',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 3,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 2,
          creator: '陈李炜',
          children: [
            {
              id: 23,
              created_at: '2022-08-17 17:46:34',
              updated_at: '2023-01-11 09:34:34',
              name: 'innerServe',
              title: '内部服务',
              icon: 'user',
              path: '',
              redirect: 'https://mi.com',
              component: '/serve/innerServe',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 22,
              creator: 'super',
            },
            {
              id: 94,
              created_at: '2023-04-26 09:42:40',
              updated_at: '2023-04-26 09:56:49',
              name: 'redis',
              title: 'redis 查询',
              icon: '',
              path: '',
              redirect: 'redis 查询',
              component: '/serve/redisQuery',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 22,
              creator: '张扬',
            },
          ],
        },
        {
          id: 93,
          created_at: '2023-02-09 20:30:27',
          updated_at: '2023-02-09 20:30:33',
          name: 'liveEightHundred',
          title: 'Live800配置和使用',
          icon: '',
          path: '',
          redirect: '',
          component: '/liveEightHundred/liveEightHundredList',
          permission: '',
          sort: 4,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 2,
          creator: 'super',
        },
      ],
    },
    {
      id: 89,
      created_at: '2023-01-03 17:16:12',
      updated_at: '2023-01-03 17:16:39',
      name: 'merandapp',
      title: '商户与应用',
      icon: MenuIcons[1],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 2,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 12,
          created_at: '2022-07-29 10:18:43',
          updated_at: '2023-01-03 17:16:26',
          name: 'merchant',
          title: '商户管理',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 89,
          creator: '陈李炜',
          children: [
            {
              id: 13,
              created_at: '2022-07-29 10:20:51',
              updated_at: '2022-07-29 10:20:57',
              name: 'merchantList',
              title: '平台商户管理',
              icon: 'tree',
              path: '',
              redirect: '',
              component: '/merchant/list',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 12,
              creator: 'super',
            },
            {
              id: 14,
              created_at: '2022-07-29 10:22:09',
              updated_at: '2022-11-14 12:28:48',
              name: 'merchantPay',
              title: '平台支付配置',
              icon: 'pay',
              path: '',
              redirect: '',
              component: '/merchant/pay',
              permission: '',
              sort: 0,
              status: 0,
              visible: 0,
              breadcrumb: 1,
              parent_id: 12,
              creator: 'super',
            },
            {
              id: 15,
              created_at: '2022-07-29 10:25:38',
              updated_at: '2022-07-29 10:25:42',
              name: 'merchantMoney',
              title: '商户资金账户',
              icon: 'wallet',
              path: '',
              redirect: '',
              component: '/merchant/money',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 12,
              creator: 'super',
            },
          ],
        },
        {
          id: 16,
          created_at: '2022-08-01 11:06:41',
          updated_at: '2023-01-03 17:16:36',
          name: 'app',
          title: '应用管理',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 89,
          creator: '陈李炜',
          children: [
            {
              id: 18,
              created_at: '2022-08-01 11:08:31',
              updated_at: '2022-08-01 11:21:37',
              name: 'appList',
              title: '应用列表',
              icon: 'component',
              path: '',
              redirect: '',
              component: '/app/list',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 16,
              creator: 'super',
            },
          ],
        },
      ],
    },
    {
      id: 90,
      created_at: '2023-01-03 17:29:03',
      updated_at: '2023-01-03 17:30:49',
      name: 'promote',
      title: '公共推广模块',
      icon: MenuIcons[2],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 3,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 60,
          created_at: '2022-11-03 16:43:03',
          updated_at: '2023-03-06 10:41:16',
          name: 'record',
          title: '记录',
          icon: 'example',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 90,
          creator: '陈李炜',
          children: [
            {
              id: 61,
              created_at: '2022-11-03 16:43:59',
              updated_at: '2022-11-07 17:35:09',
              name: 'takeout',
              title: '提现记录',
              icon: 'example',
              path: '',
              redirect: '',
              component: '/record/takeOut',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 60,
              creator: 'super',
            },
            {
              id: 64,
              created_at: '2022-11-07 17:30:18',
              updated_at: '2022-11-07 17:30:41',
              name: 'report',
              title: '上报记录',
              icon: 'component',
              path: '',
              redirect: '',
              component: '/record/report',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 60,
              creator: 'super',
            },
            {
              id: 65,
              created_at: '2022-11-08 09:52:58',
              updated_at: '2022-11-18 09:46:37',
              name: 'award',
              title: '用户收支记录',
              icon: 'shop',
              path: '',
              redirect: '',
              component: '/record/award',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 60,
              creator: 'super',
            },
          ],
        },
        {
          id: 57,
          created_at: '2022-10-31 16:06:38',
          updated_at: '2023-01-03 17:30:29',
          name: 'promoteModule',
          title: '推广渠道及任务',
          icon: 'pay',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 1,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 90,
          creator: '陈李炜',
          children: [
            {
              id: 58,
              created_at: '2022-10-31 16:09:14',
              updated_at: '2022-11-11 11:57:13',
              name: 'promotionTask',
              title: '推广任务',
              icon: 'tree',
              path: '',
              redirect: '',
              component: '/promotionModule/promoteTask',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 57,
              creator: 'super',
            },
            {
              id: 59,
              created_at: '2022-10-31 16:10:43',
              updated_at: '2022-10-31 16:10:48',
              name: 'registeredChannels',
              title: '注册渠道',
              icon: 'component',
              path: '',
              redirect: '',
              component: '/promotionModule/registeredChannels',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 57,
              creator: 'super',
            },
          ],
        },
        {
          id: 66,
          created_at: '2022-11-09 09:24:47',
          updated_at: '2023-03-06 10:41:21',
          name: 'dataStatistics',
          title: '推广数据统计',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 2,
          status: 0,
          visible: 0,
          breadcrumb: 1,
          parent_id: 90,
          creator: '陈李炜',
          children: [
            {
              id: 70,
              created_at: '2022-11-09 11:00:49',
              updated_at: '2023-03-06 10:41:22',
              name: 'promoteData',
              title: '推广数据',
              icon: 'user',
              path: '',
              redirect: '',
              component: '/dataStatistics/promoteData',
              permission: '',
              sort: 0,
              status: 0,
              visible: 0,
              breadcrumb: 1,
              parent_id: 66,
              creator: '陈李炜',
            },
            {
              id: 73,
              created_at: '2022-11-09 12:17:46',
              updated_at: '2023-03-06 10:41:23',
              name: 'spending',
              title: '支出统计',
              icon: 'wallet',
              path: '',
              redirect: '',
              component: '/dataStatistics/spending',
              permission: '',
              sort: 0,
              status: 0,
              visible: 0,
              breadcrumb: 1,
              parent_id: 66,
              creator: '陈李炜',
            },
          ],
        },
      ],
    },
    {
      id: 91,
      created_at: '2023-01-03 17:34:26',
      updated_at: '2023-01-03 17:37:22',
      name: 'ShopModule',
      title: '商品交易模块',
      icon: MenuIcons[3],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 4,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 35,
          created_at: '2022-09-22 18:51:39',
          updated_at: '2023-01-03 17:34:51',
          name: 'goods',
          title: '商品管理',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 1,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 91,
          creator: '陈李炜',
          children: [
            {
              id: 77,
              created_at: '2022-11-24 10:10:21',
              updated_at: '2022-11-24 10:12:14',
              name: 'goodGoodsList',
              title: '商品服商品总览',
              icon: 'dashboard',
              path: '',
              redirect: '',
              component: '/goods/goodGoodsList',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 35,
              creator: 'super',
            },
            {
              id: 78,
              created_at: '2022-11-24 11:23:59',
              updated_at: '2022-11-24 11:24:07',
              name: 'platformGoodsList',
              title: '平台商品列表',
              icon: 'peoples',
              path: '',
              redirect: '',
              component: '/goods/platformGoodsList',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 35,
              creator: 'super',
            },
            {
              id: 79,
              created_at: '2022-11-24 11:48:05',
              updated_at: '2022-11-24 11:58:12',
              name: 'platformGoodsAudit',
              title: '平台商品上架审核',
              icon: 'tree-table',
              path: '',
              redirect: '',
              component: '/goods/platformGoodsAudit',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 35,
              creator: 'super',
            },
            {
              id: 80,
              created_at: '2022-11-24 14:15:58',
              updated_at: '2022-11-24 14:16:02',
              name: 'stockList',
              title: '商户采购列表',
              icon: 'tree',
              path: '',
              redirect: '',
              component: '/goods/stockList',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 35,
              creator: 'super',
            },
            {
              id: 81,
              created_at: '2022-11-24 17:42:47',
              updated_at: '2022-11-24 17:43:08',
              name: 'mchGoodsList',
              title: '商户商品列表',
              icon: 'example',
              path: '',
              redirect: '',
              component: '/goods/mchGoodsList',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 35,
              creator: 'super',
            },
          ],
        },
        {
          id: 29,
          created_at: '2022-08-18 11:28:54',
          updated_at: '2023-01-03 17:34:56',
          name: 'order',
          title: '订单管理',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 2,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 91,
          creator: '陈李炜',
          children: [
            {
              id: 30,
              created_at: '2022-08-18 11:30:32',
              updated_at: '2022-09-15 14:55:13',
              name: 'ordermanage',
              title: '用户订单管理',
              icon: 'component',
              path: '',
              redirect: '',
              component: '/order/ordermanage',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 29,
              creator: 'super',
            },
            {
              id: 34,
              created_at: '2022-09-16 12:26:11',
              updated_at: '2022-09-16 12:28:45',
              name: 'mchOrderManage',
              title: '商户订单管理',
              icon: 'dashboard',
              path: '',
              redirect: '',
              component: '/order/mchOrderManage',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 29,
              creator: 'super',
            },
          ],
        },
        {
          id: 44,
          created_at: '2022-10-26 09:28:05',
          updated_at: '2023-01-03 17:35:07',
          name: 'statementsManagement',
          title: '对账单管理',
          icon: 'store',
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 3,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 91,
          creator: '陈李炜',
          children: [
            {
              id: 45,
              created_at: '2022-10-26 09:30:14',
              updated_at: '2022-10-26 09:30:45',
              name: 'purchase',
              title: '平台进货对账单',
              icon: 'rok',
              path: '',
              redirect: '',
              component: '/statementsManagement/purchase',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 44,
              creator: 'super',
            },
            {
              id: 46,
              created_at: '2022-10-26 09:31:35',
              updated_at: '2022-10-26 09:31:40',
              name: 'sell',
              title: '平台售卖对账单',
              icon: 'shop',
              path: '',
              redirect: '',
              component: '/statementsManagement/sell',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 44,
              creator: 'super',
            },
            {
              id: 47,
              created_at: '2022-10-26 09:32:20',
              updated_at: '2023-01-10 12:20:46',
              name: 'collection',
              title: '应用充值对账单',
              icon: 'wallet',
              path: '',
              redirect: '',
              component: '/statementsManagement/collection',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 44,
              creator: '陈李炜',
            },
          ],
        },
      ],
    },
    {
      id: 31,
      created_at: '2022-08-30 17:32:18',
      updated_at: '2023-01-03 17:36:57',
      name: 'user',
      title: '用户管理',
      icon: MenuIcons[4],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 98,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 32,
          created_at: '2022-08-30 17:36:04',
          updated_at: '2022-08-30 17:50:28',
          name: 'usermessage',
          title: '用户信息',
          icon: 'user',
          path: '',
          redirect: '',
          component: '/user/userManage',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 31,
          creator: 'super',
        },
      ],
    },
    {
      id: 82,
      created_at: '2022-12-06 10:33:09',
      updated_at: '2023-01-03 17:36:48',
      name: 'checkCenter',
      title: '对账中心',
      icon: MenuIcons[5],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 99,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 83,
          created_at: '2022-12-06 10:33:56',
          updated_at: '2022-12-06 10:34:04',
          name: 'applicationPromotion',
          title: '应用推广账单',
          icon: 'wallet',
          path: '',
          redirect: '',
          component: '/checkCenter/applicationPromotion',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 82,
          creator: 'super',
        },
        {
          id: 84,
          created_at: '2022-12-06 17:06:10',
          updated_at: '2022-12-06 17:06:22',
          name: 'paymentTotal',
          title: '企业付款总账',
          icon: 'example',
          path: '',
          redirect: '',
          component: '/checkCenter/paymentTotal',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 82,
          creator: 'super',
        },
        {
          id: 85,
          created_at: '2022-12-06 17:27:22',
          updated_at: '2022-12-06 17:29:03',
          name: 'paumentRunningAccount',
          title: '企业付款流水',
          icon: 'tree-table',
          path: '',
          redirect: '',
          component: '/checkCenter/paumentRunningAccount',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 82,
          creator: 'super',
        },
        {
          id: 86,
          created_at: '2022-12-06 17:28:49',
          updated_at: '2022-12-06 17:29:13',
          name: 'laborRemuneration',
          title: '劳务报酬表',
          icon: 'shop',
          path: '',
          redirect: '',
          component: '/checkCenter/laborRemuneration',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 82,
          creator: 'super',
        },
      ],
    },
    {
      id: 97,
      created_at: '2023-05-05 16:18:07',
      updated_at: '2023-05-05 16:18:23',
      name: 'basefunction',
      title: '基础功能',
      icon: MenuIcons[6],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 99,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 95,
          created_at: '2023-04-27 18:47:07',
          updated_at: '2023-05-05 16:18:43',
          name: 'platform',
          title: '二维码管理',
          icon: MenuIcons[7],
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 97,
          creator: '陈李炜',
          children: [
            {
              id: 96,
              created_at: '2023-04-27 18:48:33',
              updated_at: '2023-05-04 16:36:51',
              name: 'qrcodemanage',
              title: '二维码管理',
              icon: MenuIcons[8],
              path: '',
              redirect: 'https://cli.im/help/64626',
              component: 'https://cli.im/help/64626',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 95,
              creator: '张扬',
            },
          ],
        },
      ],
    },
    {
      id: 98,
      created_at: '2023-05-05 16:18:07',
      updated_at: '2023-05-05 16:18:23',
      name: 'basefunction',
      title: '基础功能2',
      icon: MenuIcons[9],
      path: '',
      redirect: '',
      component: '',
      permission: '',
      sort: 99,
      status: 0,
      visible: 1,
      breadcrumb: 1,
      parent_id: 0,
      creator: '陈李炜',
      children: [
        {
          id: 95,
          created_at: '2023-04-27 18:47:07',
          updated_at: '2023-05-05 16:18:43',
          name: 'platform',
          title: '二维码管理',
          icon: MenuIcons[7],
          path: '',
          redirect: '',
          component: '',
          permission: '',
          sort: 0,
          status: 0,
          visible: 1,
          breadcrumb: 1,
          parent_id: 97,
          creator: '陈李炜',
          children: [
            {
              id: 96,
              created_at: '2023-04-27 18:48:33',
              updated_at: '2023-05-04 16:36:51',
              name: 'qrcodemanage',
              title: '二维码管理',
              icon: MenuIcons[8],
              path: '',
              redirect: 'https://cli.im/help/64626',
              component: 'https://cli.im/help/64626',
              permission: '',
              sort: 0,
              status: 0,
              visible: 1,
              breadcrumb: 1,
              parent_id: 95,
              creator: '张扬',
            },
          ],
        },
      ],
    },
  ]);

  const active_nav = ref('');

  const isLoading = ref(false);
  const isCollapse = ref(false);

  watch(
    () => WindowSize['lt-md'],
    (v) => {
      isCollapse.value = v;
    },
  );

  watchEffect(() => {
    if (isLoading.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  return {
    title,
    sub_title,
    nav_arr,
    active_nav,
    isLoading,
    isCollapse,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot));
}
