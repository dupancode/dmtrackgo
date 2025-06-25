const { createRouter, createWebHistory } = VueRouter;

import Home from '../pages/Home.js';

// Rute SPA
const routes = [
  { path: '/', component: Home }
];

// Buat router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Fungsi bantu untuk ubah meta tag
function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Update <title> dan <meta> saat route berubah
router.afterEach((to) => {
  if (to.path === '/') {
    document.title = 'DM Track Go';
    setMeta('description', '');
  }
});

export default router;