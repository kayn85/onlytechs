import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import SingleJobView from '@/views/SingleJobView.vue';
import AddJobView from '@/views/AddView.vue';
import EditView from '@/views/EditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: SingleJobView,
    },
    {
      path: '/jobs/add',
      name: 'add',
      component: AddJobView,
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
