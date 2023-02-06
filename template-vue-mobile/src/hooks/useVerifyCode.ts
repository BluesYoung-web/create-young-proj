/*
 * @Author: zhangyang
 * @Date: 2021-09-10 09:23:47
 * @LastEditTime: 2023-01-13 16:26:47
 * @Description: 发送短信验证码的逻辑抽离
 */
import { useCountDown } from '@vant/use';
interface UseVerifyOptions {
  t: number;
  cbk(): void;
}

const defaultOptions: UseVerifyOptions = {
  t: 60,
  cbk: async () => {
    // todo: 调用发送验证码的接口
    // await get_verify_code();
    showToast('验证码已发送\n请注意查收');
  },
};
export const useVerifyCode = (options: UseVerifyOptions = defaultOptions) => {
  options = Object.assign(defaultOptions, options);
  const countDown = useCountDown({
    time: options.t * 1000,
  });
  const isClicked = ref(false);
  const sendClick = async () => {
    if (!isClicked.value) {
      countDown.start();
      isClicked.value = true;
      await options.cbk();
    }
  };
  watchEffect(() => {
    if (countDown.current.value.seconds === 0) {
      isClicked.value = false;
      countDown.reset();
    }
  });

  return {
    countDown,
    sendClick,
    isClicked,
  };
};
