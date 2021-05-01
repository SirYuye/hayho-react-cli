import { defineConfig } from 'umi';
import routes from './src/router/index';
import proxy from './config/proxy';

export default defineConfig({
  history: { type: 'browser' },
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {},
  title: '审批流',
  routes,
  dva: {
    immer: true,
    hmr: true,
  },
  request: {
    dataField: 'data',
  },
  plugins: ['@alitajs/keep-alive'],
  keepalive: ['/', '/user'],
  // proxy
});
