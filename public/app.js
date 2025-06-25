const { createApp } = Vue;

import router from './src/router/index.js';

const App = {
  data: () => ({ 
    year: new Date().getFullYear()
  }),
  mounted() {
  },
  template: `
    <main class="p-2 overflow-x-hidden">
        <router-view></router-view>
    </main>
      <footer class="mt-2 p-2">
        <h6 class="text-center text-sm">Copyright 2024 - {{year}} by Dupan Code All Rights Reserved </h6>
      </footer>
  `
};

createApp(App).use(router).mount('#app');