import Vue from 'vue';
import Router from 'vue-router';
import GMap from '@/views/GMap';
import Signup from '@/components/auth/Signup';
import Login from '@/components/auth/Login';
import Dashboard from '@/views/Dashboard';
import Clients from '@/views/Clients';
import BMI from '@/views/BMI';
import Workouts from '@/views/Workouts';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/gmap',
      name: 'GMap',
      component: GMap
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
      component: BMI
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/workouts',
      name: 'Workouts',
      component: Workouts
    }
  ]
})
