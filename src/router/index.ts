import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/drivers',
      name: 'drivers',
      // route level code-splitting
      // this generates a separate chunk (Drivers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DriversView.vue'),
    },
    {
      path: '/tours',
      name: 'tours',
      // route level code-splitting
      // this generates a separate chunk (Tours.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ToursView.vue'),
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
})

export default router
