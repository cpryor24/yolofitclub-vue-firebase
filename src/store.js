import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import db from '@/firebase/fb';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    uid: null,
    workouts: []
  },
  getters: {
   getUser: state => {
     return state.user;
   },
   getUserId: state => {
    return state.uid;
  }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = firebase.auth().currentUser;
    },
    setUserId: state => {
      state.uid = firebase.auth().currentUser.uid;
    },
    updateWorkoutList: (state, payload) => {
      state.workouts = payload;
    }
  },
  actions: {
    setUserAction: context => {
      context.commit('setUser');
    },
    setUserIdAction: context => {
      context.commit('setUserId');
    },
    
    setWorkouts: context => {
      db.collection('workouts').where('user_id', '==', firebase.auth().currentUser.uid).onSnapshot(res => {
        const changes = res.docChanges();
        context.commit('updateWorkoutList', changes.filter(change => change.type == 'added').map(change => ({
          ...change.doc.data(),
          id: change.doc.id
        })));
      })
    }
  }
})

export default store;