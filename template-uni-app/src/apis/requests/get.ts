/*
 * @Author: zhangyang
 * @Date: 2023-07-18 16:50:32
 * @LastEditTime: 2023-09-19 10:19:44
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq } from '@bluesyoung/http'

export function useGet(http: YoungHttp) {
  const FreeReq: YoungHttpFreeReq = args => http.freeReq({ method: 'GET', ...args })
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'GET', ...args })

  return {
    getByUserName: (name: string) =>
      FreeReq<{
        login: string
        id: number
        node_id: string
        avatar_url: string
        gravatar_id: string
        url: string
        html_url: string
        followers_url: string
        following_url: string
        gists_url: string
        starred_url: string
        subscriptions_url: string
        organizations_url: string
        repos_url: string
        events_url: string
        received_events_url: string
        type: string
        site_admin: boolean
        name: string
        company: null | string
        blog: string
        location: null | string
        email: null | string
        hireable: null | boolean
        bio: null | string
        twitter_username: null | string
        public_repos: number
        public_gists: number
        followers: number
        following: number
        created_at: string
        updated_at: string
      }>({
        url: `/users/${name}`,
      }),
  }
}
