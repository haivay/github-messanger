import VueRouter from 'vue-router';

import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';


export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: SignInPage
    },
    {
      path: '/auth/github',
      name: 'main',
      component: MainPage
    },
  ]
})