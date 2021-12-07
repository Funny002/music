import { createApp } from 'vue';
import App           from './App.vue';
import filters       from './filters';

const app = createApp(App);

filters().then(data => {
  app.config.globalProperties.$filters = data;
  // 挂载
  app.mount('#app');
});
