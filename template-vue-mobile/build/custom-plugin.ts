/*
 * @Author: zhangyang
 * @Date: 2023-01-10 14:43:13
 * @LastEditTime: 2023-01-10 15:11:44
 * @Description:
 */
import { networkInterfaces } from 'node:os';

const virtualModuleId = 'virtual:local-server';
const ips = networkInterfaces();
export const localServer = `http://${ips['eth0'][0].address}:3000`;

/**
 * 获取本机 ip 地址，拼接开发时的服务地址
 */
export const serverPlugin = () => {
  return {
    name: 'local-server',
    resolveId(id) {
      if (id === virtualModuleId) {
        return virtualModuleId;
      }
    },
    load(id) {
      if (id === virtualModuleId) {
        return `export const server = '${localServer}';`;
      }
    },
  };
};
