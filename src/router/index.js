import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import httpClient from "../httpClient";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
    component: () => import('../views/Consultorias.vue')
  },{
    path: '/consultorias-form/:id?',
    name: 'ConsultoriasForm',
    component: () => import('../views/ConsultoriasForm.vue'),
    props: true
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.fullPath==="/"){
    localStorage.setItem('token_authorization', '');
    next('login');
  } else if (to.fullPath==="/login"){
    localStorage.setItem('token_authorization', '');
    next();
  } else {    

    httpClient.get("/auth/user")
    .then((response) => response.data)
    .then((data) => {
      if(data.authenticated) next(); else next('login');

    })
    .catch(error => {
      console.log(error.response.status);
      next('login');
    }); 

  }

 
});

export default router
