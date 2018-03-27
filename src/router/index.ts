import Vue from 'vue';
import Router from 'vue-router';
import Sign from '@/views/Sign.vue';
import Home from '@/views/Home.vue';
import Detail from '@/views/Detail.vue';
import Me from '@/views/Me.vue';
import { hasLogin } from '@/util/session';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiredAuth: true },
    },
    {
      path: '/home/:id',
      name: 'detail',
      component: Detail,
      meta: { requiredAuth: true },
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      meta: { requiredAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!hasLogin()) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;
