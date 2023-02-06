/*
 * @Author: zhangyang
 * @Date: 2022-03-01 14:01:31
 * @LastEditTime: 2023-01-13 15:42:50
 * @Description: 状态管理
 */
export const install: UserModule = (app) => {
  const pinia = createPinia();
  app.use(pinia);
};
