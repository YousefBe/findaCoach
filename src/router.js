import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegisteration from './pages/coaches/CoachRegisteration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecived from './pages/requests/RequestsRecived.vue';
import UserAuth from './pages/auth/userAuth.vue';
import store from './store/index.js';
import NotFoundPage from './pages/notFound.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegisteration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsRecived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:mafe4ElkalamDa(.*)', component: NotFoundPage }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
