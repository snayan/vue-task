import Vue from 'vue';
import Router from 'vue-router';
import Sign from '@/views/Sign.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
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
    },
  ],
});
