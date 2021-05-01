/**
 * @description 运行时配置, 优先级最高
 */
const arr: string[] = [];

import { RequestConfig, history, defineConfig } from 'umi';

// http config
export const request: RequestConfig = {
  timeout: 1000,
  prefix: '',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  errorConfig: {
    // 后端接口不满足该规范的时候需要通过该配置把后端接口数据转换为正确格式, 只用于错误处理
    adaptor: resData => {
      return {
        ...resData,
        success: resData.success || true,
        message: resData.message || '',
      };
    },
  },
  // 中间件
  middlewares: [
    async function middlewareA(ctx, next) {
      // console.log(ctx)
      // console.log('A before');
      // if (ctx.req.url.indexOf('api') !== -1) {
      //   ctx.res = {error: '错误的实例'}
      // return setTimeout(() => history.push('/login'), 3000)
      // }
      await next();
      // console.log('A after');
    },
  ],
  // request 拦截器
  requestInterceptors: [
    (url, options) => {
      // console.log(url, options)
      return {
        url: `${url}?interceptors=yes`,
        options: { ...options, interceptors: true },
      };
    },
  ],
  // response 拦截器
  responseInterceptors: [
    async response => {
      // console.log(response)
      // 获取响应内容
      // const data = await response.clone().json();
      // console.log(data)
      enum codeMaps {
        '正常' = 200,
        '网关错误。' = 502,
        '服务不可用，服务器暂时过载或维护。' = 503,
        '网关超时。' = 504,
      }
      // console.log(codeMaps[response.status])
      return response;
    },
  ],
};

