/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:35:24
 * @LastEditTime: 2023-09-19 10:19:08
 * @Description:
 */
import { useHttp } from '@bluesyoung/http/uni'
import { useGet, usePost } from './requests'

/**
 * 自动根据对应的环境，使用对应的接口地址，避免重复打包
 */
const EnvConfig = {
  develop: 'https://dev.req.cn',
  trial: 'https://test.req.cn',
  release: 'https://online.req.cn',
}

export function getReqUrl(): string {
  // @ts-expect-error
  return import.meta.env.VITE_API_BASE_URL || EnvConfig[__wxConfig.envVersion]
}

const http = useHttp({
  baseURL: getReqUrl(),
  loading: {
    start: () => {
      showLoading()
    },
    end: () => {
      hideLoading()
    },
  },
  headers: {
    getCommonHeaders: () => ({
      Accept: 'application/vnd.github.v3+json',
    }),
    getAuthHeaders: () => {
      const token = 'todo: change to the real token that you used'
      return {
        Authorization: `Bearer ${token}`,
      }
    },
  },
  fail: (err) => {
    // todo: 错误逻辑处理
    showErrorModal(err.toString())
  },
})

export const apis = {
  get: useGet(http),
  post: usePost(http),
}
