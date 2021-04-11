import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Http from "../httpClient";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/normas',
    name: 'Normas',
    component: () => import('../views/Normas.vue'),
  },{
    path: '/normas-form/:id?',
    name: 'NormasForm',
    component: () => import('../views/NormasForm.vue'),
    props: true
  },
  {
    path: '/consultorias',
    name: 'Consultorias',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.fullPath==="/login"){
    next();
    return;
  }

  Http.get("/auth/user")
      .then((response) => response.data)
      .then((data) => {
        if(data.authenticated) next(); else next('login');

      })
      .catch(error => {
        console.log(error.response.status);
        next('login');
      });  
});

export default router
