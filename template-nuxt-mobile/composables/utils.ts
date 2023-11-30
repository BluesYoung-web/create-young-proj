/*
 * @Author: zhangyang
 * @Date: 2022-08-12 16:31:53
 * @LastEditTime: 2023-11-07 18:01:33
 * @Description:
 */
import { createVNode, render } from 'vue'

export function goDownload(android?: string, ios?: string) {
  const { isApple } = useDevice()
  if (isApple)
    ios && window.open(ios)

  else
    android && window.open(android)
}

export function closeWindow() {
  if (process.server)
    return

  // @ts-expect-error
  if (typeof WeixinJSBridge !== 'undefined') {
    // @ts-expect-error 微信浏览器关闭窗口
    WeixinJSBridge.call('closeWindow')
  }

  // @ts-expect-error
  if (typeof AlipayJSBridge !== 'undefined') {
    // @ts-expect-error 支付宝浏览器关闭窗口
    AlipayJSBridge.call('popWindow')
  }
  // 其他关闭窗口
  window.close()
}

export async function showLoading() {
  if (process.server)
    return

  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  })
}

export function hideLoading() {
  if (process.server)
    return

  closeToast()
}
/**
 * 异步插入组件
 * @param El 组件实例
 */
export function injectComponent(El: ReturnType<typeof defineComponent>) {
  if (process.server)
    return false

  const appendTo = document.createElement('div')

  const onDestroy = () => {
    try {
      render(null, appendTo)
    }
    catch (error) {
      console.info('remove child error', error)
    }
  }

  const vnode = createVNode(El, {
    onDestroy,
  })
  render(vnode, appendTo)

  appendTo.firstElementChild && document.body.appendChild(appendTo.firstElementChild)

  return onDestroy
}
