import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Http from "../httpClient";

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
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

//    console.log(to.fullPath);
//console.log('auth: ' + localStorage.getItem('token_authorization'));


  if (to.fullPath==="/"){
    localStorage.setItem('token_authorization', '');
    next('login');
    return;
  }

  if (to.fullPath==="/login"){
    localStorage.setItem('token_authorization', '');
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
