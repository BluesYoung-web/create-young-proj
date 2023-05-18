/*
 * @Author: zhangyang
 * @Date: 2023-01-10 14:43:13
 * @LastEditTime: 2023-05-18 15:55:37
 * @Description:
 */
import { networkInterfaces } from 'node:os';

function getLocalIP(): string | undefined {
  const ips = networkInterfaces();

  function isPrivateIP(ip: string) {
    return (
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(ip) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip) ||
      /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(ip)
    );
  }

  for (const name of Object.keys(ips)) {
    const networkInterface = ips[name];

    for (const interfaceInfo of networkInterface) {
      if (
        interfaceInfo.family === 'IPv4' &&
        !interfaceInfo.internal &&
        isPrivateIP(interfaceInfo.address)
      ) {
        return interfaceInfo.address;
      }
    }
  }

  return '127.0.0.1';
}

const virtualModuleId = 'virtual:local-server';
export const localServer = `http://${getLocalIP()}:3000`;

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
