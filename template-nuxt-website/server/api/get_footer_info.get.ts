/*
 * @Author: zhangyang
 * @Date: 2023-10-07 16:02:03
 * @LastEditTime: 2023-11-10 15:02:38
 * @Description:
 */
import { NUXT_PUBLIC_CACHE_TIME } from '~~/composables/config'

export default cachedEventHandler(async () => {
  console.log('start get footer info')

  try {
    const friend_links: FriendLinkItem[] = [
      {
        title: '来游戏',
        href: 'https://www.laiyouxi.com',
      },
      {
        title: '🌾',
        href: 'https://mi.com',
      },
    ]
    const follow_us: FollowItem[] = []
    const about_nav: AboutNavItem[] = []
    const beian = `<p><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">ICP:鄂B2-20120057-2</a>文网文:鄂网文[2020]5051-198号 文网游备字:[2015]M-CBG0688号 新广出审:[2015]1273号</p>

    <p>全国文明市场统一举报电话:12318武汉卓讯互动信息科技有限公司 版权所有</p>

    <p>湖北省文化市场诚信守法经营承诺书</p>

    <p>未满18周岁的未成年人用户请在家长的监督下进行游戏 |&nbsp;未成年人家长监护工程</p>

    <p><a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502000478" target="_blank">鄂公网安备 42018502000478号</a>&nbsp;&nbsp;&nbsp;<img alt="" loading="lazy" src="https://app-storage.laiyouxi.com/mchadminserver/2e524461-3725-40d9-b1e9-c7a15ba6bef5.png">&nbsp;&nbsp;<img alt="" loading="lazy" src="https://app-storage.laiyouxi.com/mchadminserver/cf4e3416-14c8-46f2-8e02-55ccb991e123.png">&nbsp; &nbsp;<img alt="" loading="lazy" src="https://app-storage.laiyouxi.com/mchadminserver/ba41a711-52b6-4d12-8800-5f49443aa84b.png">&nbsp; &nbsp;<img alt="" loading="lazy" src="https://app-storage.laiyouxi.com/mchadminserver/25af8dc3-9665-4519-8885-d840d7c15599.png">&nbsp;&nbsp;&nbsp;<img alt="" src="https://app-storage.laiyouxi.com/mchadminserver/3acd60f6-d583-48c1-b16a-87288960df3f.png" loading="lazy"></p>

    <p>健康游戏忠告：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>`

    return {
      logo_bottom: 'https://master-web-cdn.laiyouxi.com/platform_index/online/74af573514bce434ef1aad683250e8f0.png',
      friend_links,
      follow_us,
      about_nav,
      beian,
    }
  }
  catch (error) {
    console.error('get footer info fail: ', error)
    return false
  }
}, {
  maxAge: NUXT_PUBLIC_CACHE_TIME * 10,
  swr: true,
})
