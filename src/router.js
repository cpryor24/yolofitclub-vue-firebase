import Vue from 'vue';
import Router from 'vue-router';
import GMap from '@/views/GMap';
import Signup from '@/components/auth/Signup';
import Login from '@/components/auth/Login';
import ViewDashboard from '@/views/Dashboard';
import Clients from '@/views/Clients';
import Workout from '@/views/Workout';
import Timeline from '@/views/MyTimeline';
import ViewProfile from '@/views/Profile';
import UserProfile from '@/views/MyProfile';
import Card from '@/views/WorkoutCard';
import firebase from 'firebase';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: ViewDashboard,
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
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workouts',
      name: 'Timeline',
      component: Timeline,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workouts/:id',
      name: 'Workout',
      component: Workout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workouts/:id/:name',
      name: 'Card',
      component: Card,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myprofile',
      name: 'UserProfile',
      component: UserProfile,
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
