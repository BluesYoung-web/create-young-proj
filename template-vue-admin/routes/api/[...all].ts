/*
 * @Author: zhangyang
 * @Date: 2023-01-04 15:16:30
 * @LastEditTime: 2023-01-05 09:10:47
 * @Description:
 */
export default eventHandler(async (event) => {
  const method = event.node.req.method;
  const url = event.node.req.url;
  let body;

  if (!(method && method.toLowerCase() === 'get')) {
    try {
      body = await readBody(event);
      console.log('🚀 ~ file: [...all].ts:16 ~ eventHandler ~ body', body);
    } catch (error) {
      console.log('🚀 ~ file: [...all].ts:18 ~ eventHandler ~ error', error);
    }
  }

  // 开发服使用 http + 主机名，其他环境直接读取完整配置
  const api_server_url = process.env.VITE_BASE_HTTP;
  // 如果正式服报错，则设置一个请求头白名单，只传递对应的请求头
  // console.log("🚀 ~ file: [...].post.ts:11 ~ defineEventHandler ~ api_server_url", api_server_url);
  const headers = event.node.req.headers as Record<string, string>;

  try {
    const res = await $fetch(`${api_server_url}${url}`, {
      method: event.node.req.method,
      headers: {
        time: headers['time'],
        authorization: headers['authorization'],
        sign: headers['sign'],
        'content-type': headers['content-type'],
        'x-forwarded-for': headers['x-forwarded-for'],
      },
      body,
    });

    return res;
  } catch (error: any) {
    if (error.toString().includes('401')) {
      event.node.res.statusCode = 401;
      return error.data;
    } else {
      return error;
    }
  }
});
