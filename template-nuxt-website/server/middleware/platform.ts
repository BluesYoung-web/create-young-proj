/*
 * @Author: zhangyang
 * @Date: 2023-10-07 12:11:46
 * @LastEditTime: 2023-11-01 19:09:47
 * @Description:
 */
export default defineEventHandler((event) => {
  event.context.platformSource = process.env.PROJECT_NAME === 'mobile' ? 'mobile' : 'pc'
  event.context['x-forwarded-for'] = event.node.req.headers['x-forwarded-for'] as string
  event.context['x-real-ip'] = event.node.req.headers['x-real-ip'] as string
})
