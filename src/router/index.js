import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/products',
    component: () =>
      import(/* webpackChunkName: "products" */ '../views/Product/Product.vue'),
    children: [
      {
        path: '',
        name: 'products',
        component: () =>
          import(
            /* webpackChunkName: "productsStart" */ '../components/Product/Start.vue'
          ),
      },
      {
        path: ':id/details',
        name: 'productsSingle',
        component: () =>
          import(
            /* webpackChunkName: "productsSingle" */ '../components/Product/Single.vue'
          ),
      },
    ],
  },
  {
    path: '/contact',
    name: 'contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
