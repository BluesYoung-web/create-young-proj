/*
 * @Author: zhangyang
 * @Date: 2023-07-18 14:12:25
 * @LastEditTime: 2023-08-25 16:22:55
 * @Description: ui 交互，弹窗之类的
 */
import { sleep } from '@bluesyoung/utils';

let loadingCount = 0;

/**
 * 显示loading
 * @param mask - 是否显示遮罩
 * @param title - 提示文本
 */
export function showLoading(title = '加载中...', mask = true) {
  const { fullscreenLoading, smallLoading } = storeToRefs(useHttpLoading());

  if (fullscreenLoading.value) {
    return;
  }

  loadingCount++;

  if (import.meta.env.VITE_CUSTOM_LOADING) {
    smallLoading.value = true;
  } else {
    uni.showLoading({
      mask,
      title,
    });
  }
}

/**
 * 隐藏loading
 */
export function hideLoading() {
  const { smallLoading, fullscreenLoading } = storeToRefs(useHttpLoading());

  if (fullscreenLoading.value) {
    return;
  }

  if (--loadingCount === 0) {
    if (import.meta.env.VITE_CUSTOM_LOADING) {
      smallLoading.value = false;
    } else {
      uni.hideLoading();
    }
  }
}

/**
 * 展示 toast
 */
export function showToast(options?: UniApp.ShowToastOptions) {
  const { icon = 'none', mask = false } = options || {};

  uni.showToast({
    icon,
    mask,
    ...options,
  });
}

let hasModel = false;
const modalPage = new Set<string>();
/**
 * 显示弹窗
 * ! 全局一次只展示一个弹窗，其他的往后排
 */
export async function showModal(options: UniApp.ShowModalOptions) {
  const page = getCurrentPages();
  const route = page[page.length - 1].route || '';
  if (modalPage.has(route)) {
    hasModel = true;
  } else {
    hasModel = false;
    modalPage.add(route);
  }
  const { title = '提示', showCancel = true, complete } = options;
  while (hasModel) {
    await sleep(0.5);
  }
  return new Promise((resolve, reject) => {
    hasModel = true;
    uni.showModal({
      title,
      showCancel,
      success(res) {
        hasModel = false;
        modalPage.delete(route);
        if (res.confirm) {
          resolve(res);
        } else if (res.cancel) {
          reject(res);
        }
      },
      fail(err) {
        hasModel = false;
        modalPage.delete(route);
        reject(err);
      },
      ...options,
      complete: (res) => {
        hasModel = false;
        modalPage.delete(route);
        complete?.(res);
      },
    });
  });
}

/**
 * 显示错误弹窗 只有确定按钮
 * @param errMsg - 错误信息
 */
export function showErrorModal(errMsg: string) {
  return showModal({ content: errMsg, showCancel: false });
}
