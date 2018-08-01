import Vue from 'vue';
import Router from 'vue-router';

import QuickPos from '@/components/pages/QuickPos.vue';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'QuickPos',
      component: QuickPos,
    }
  ],
});



export default router;