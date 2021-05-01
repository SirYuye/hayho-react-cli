/**
 * @description proxy代理
 */

const proxy = {
  '/api': {
    'target': 'http://jsonplaceholder.typicode.com/',
    'changeOrigin': true,
    'pathRewrite': { '^/api': '' },
  },
}

export default proxy;
