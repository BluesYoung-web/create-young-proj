/*
 * @Author: zhangyang
 * @Date: 2023-03-02 16:50:48
 * @LastEditTime: 2023-03-24 10:35:36
 * @Description: 检查更新
 */
import { CurrentVersion } from '@/stores';
import { sleep } from '@bluesyoung/utils';
import { server } from 'virtual:local-server';
import { generateNavData } from './4-auth';

export const install: UserModule = (app) => {
  let viteEnv: ImportMetaEnv;
  // 每分钟一次，检查更新
  setInterval(async () => {
    if (import.meta.env.DEV) {
      // 开发环境，局域网 ip
      viteEnv = await (await fetch(server + '/get/env')).json(); // console.log('🚀 ~ file: 5-checkupdate.ts:187~ setInterval ~ viteEnv:"' viteEnv)
    } else {
      // 部署环境
      viteEnv = await (await fetch(location.origin + location.pathname + `get/env`)).json();
      // console.log('🚀 ~ file: 5-checkupdate.ts:231~ setInterval ~ viteEnv:', viteEnv);
    }

    const refresh = async () => {
      await generateNavData(true);
      await sleep(0.5);
      location.reload();
    };

    if (viteEnv.VITE_CURRENT_VERSION !== CurrentVersion.value) {
      setTimeout(refresh, 3e4);
      ElMessageBox.alert('新版本已发布，点击立即重新加载(30s后自动刷新)', '温馨提示', {
        type: 'warning',
      }).then(() => refresh());
    }
  }, 6e4);
};
