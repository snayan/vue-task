import Vue from 'vue';
import Router from 'vue-router';
import Sign from '@/views/Sign.vue';
import About from '@/views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
