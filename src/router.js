import Vue from 'vue';
import Router from 'vue-router';
import GMap from '@/views/GMap';
import Signup from '@/components/auth/Signup';
import Login from '@/components/auth/Login';
import Dashboard from '@/views/Dashboard';
import Clients from '@/views/Clients';
import BMI from '@/views/BMI';
import Workouts from '@/views/Workouts';
import firebase from 'firebase';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/gmap',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bmi',
      name: 'BMI',
      component: BMI,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workouts',
      name: 'Workouts',
      component: Workouts,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser;
    if(user){
      //user signed in, proceed to route
      next();
    } else {
      // no user signed in, redirect to login
      next({
        name: 'Login'
      });
    }
  } else {
    next();
  }
})

export default router;
