/*
 * @Author: zhangyang
 * @Date: 2023-07-18 15:58:06
 * @LastEditTime: 2023-07-19 08:14:10
 * @Description:
 */
export const polyfillFormData = () => {
  return {
    name: 'vite-plugin-uni-axios',
    transform(code, id) {
      if (process.env.UNI_PLATFORM?.includes('mp')) {
        if (id.includes('/form-data/lib/browser.js')) {
          return {
            code: code.replace('window', 'globalThis'),
          };
        }
        if (id.includes('/axios/lib/platform/browser/classes/FormData.js')) {
          return {
            code: `import FormData from 'miniprogram-formdata';\nexport default FormData;`,
          };
        }
        if (id.includes('/axios/lib/platform/browser/classes/Blob.js')) {
          return {
            code: `import Blob from 'miniprogram-blob';\nexport default Blob;`,
          };
        }
      }
    },
  };
};
