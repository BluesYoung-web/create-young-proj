/*
 * @Author: zhangyang
 * @Date: 2022-03-02 18:42:56
 * @LastEditTime: 2023-01-04 15:14:46
 * @Description: 存储界面相关的数据
 */
const SESSION_PREFIX = '__young_admin_';

export const SESSION_KEYS = {
  collapsed: `${SESSION_PREFIX}collapsed`,
  topIndex: `${SESSION_PREFIX}topIndex`,
  expandNodeKeys: `${SESSION_PREFIX}expandNodeKeys`,
  userInfo: `${SESSION_PREFIX}userInfo`,
  rawNavArr: `${SESSION_PREFIX}rawNavArr`,
  navArr: `${SESSION_PREFIX}navArr`,
  flatNavArr: `${SESSION_PREFIX}flatNavArr`,
  roleRoute: `${SESSION_PREFIX}roleRoute`,
};

export const isCollapse = useSessionStorage(SESSION_KEYS.collapsed, false);

export const TopIndex = useSessionStorage(SESSION_KEYS.topIndex, '0');

export const expandNodeKeys = useSessionStorage<number[]>(SESSION_KEYS.expandNodeKeys, []);

export const useUserStore = () => {
  const CurrUserInfo = useSessionStorage<CurrUserInfo>(
    SESSION_KEYS.userInfo,
    {} as unknown as CurrUserInfo,
  );
  const reset = () => (CurrUserInfo.value = {} as unknown as CurrUserInfo);
  return {
    CurrUserInfo,
    reset,
  };
};

export const useNavStore = () => {
  const RawNav = useSessionStorage<NavArrItem[]>(SESSION_KEYS.rawNavArr, []);
  const NavArrAll = useSessionStorage<NavArrItem[]>(SESSION_KEYS.navArr, []);
  const FlatNavArr = useSessionStorage<NavArrItem[]>(SESSION_KEYS.flatNavArr, []);
  const RoleRoute = useSessionStorage<string[]>(SESSION_KEYS.roleRoute, []);
  const TopMenu = computed(() => RawNav.value.filter((nav) => nav.visible === 1));
  const NavArr = computed(() =>
    TopIndex.value ? NavArrAll.value[+TopIndex.value]?.children || [] : [],
  );

  const reset = () => {
    NavArrAll.value = [];
    FlatNavArr.value = [];
    RoleRoute.value = [];
    RawNav.value = [];
  };
  return {
    RawNav,
    NavArrAll,
    NavArr,
    FlatNavArr,
    RoleRoute,
    TopMenu,
    reset,
  };
};
