import { defineConfig } from 'vite';
import vue              from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // 插件
  base: '/',
  mode: 'development', // 模式，development|production
  resolve: { // 字符替换别名
    alias: {
      '@/': './src/'
    }
  },
  json: {
    stringify: true // 导入转换 -> export default JSON.parse("...")
  },
  server: {
    host: true,  // 地址
    port: 5004,  // 端口
    open: false, // 打开浏览器
    strictPort: false,  // 端口占用关闭
    proxy: { // 代理
      // '': {
      //   target:       '',
      //   changeOrigin: true,
      //   rewrite:      path => path.replace('', '')
      // }
    },
    cors: false // 跨域
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // 静态资源文件夹
    assetsInlineLimit: 0, // base64转换阈值
    cssCodeSplit: true, // css 拆分
    cssTarget: 'chrome61',
    sourcemap: true,
    minify: 'esbuild', // 代码混淆
    emptyOutDir: true,
    brotliSize: true, // 生产环境需要关闭
    chunkSizeWarningLimit: 400 // 警告阈值（kbs）
  }
});
