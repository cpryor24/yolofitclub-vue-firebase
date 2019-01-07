import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import db from '@/firebase/fb';
import router from '@/router';;

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    uid: null,
    isAuthenticated: null,
    workouts: [],
    exerciseCategories: []
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getUserId: state => {
      return state.uid;
    }, 
    getWorkouts: state => {
      return state.workouts;
    },
    isAuthenticated: state => {
      console.log(state.isAuthenticated)
      return state.user !== null && state.user !== undefined;
    },
    getExerciseCategories: state => {
      return state.exerciseCategories;
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = firebase.auth().currentUser;
    },
    setUserId: state => {
      state.uid = firebase.auth().currentUser.uid;
    },
    setDashboard: (state, payload) => {
      state.workouts = payload;
    },
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload;
    },
    setExerciseCategories: (state, payload) => {
      state.exerciseCategories = payload;
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
        context.commit('setDashboard', changes.filter(change => change.type == 'added').map(change => ({
          ...change.doc.data(),
          id: change.doc.id
        })));
      })
    },
    userSignup: (context, email, password, first_name, lastname, alias, slug) => {
      let ref = db.collection('users').doc(email.slug);
      ref.get().then(doc => {
        if(doc.exists){

        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email.email, email.password)
            .then(cred => {
              ref.set({
                alias: email.alias,
                first_name: email.first_name,
                last_name: email.last_name,
                geolocation: null,
                user_id: cred.user.uid
              })
              context.commit('setUser', cred.user)
              context.commit('setIsAuthenticated', true)
            }).then(() => {
              router.push({
                name: 'Dashboard'
              });
            }).catch(() => {
              context.commit('setUser', null);
              context.commit('setIsAuthenticated', false)
            })
        }
      })
    },
    userLogin: (context, email, password) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.email, email.password)
        .then(cred => {
          context.commit('setUser', cred.user);
          context.commit('setIsAuthenticated', true);
          router.push({
            name: 'Dashboard'
          })
        })
        .catch(() => {
          context.commit('setUser', null);
          context.commit('setIsAuthenticated', false);
        });
    },
    userLogOut: (context) => {
      firebase.auth()
        .signOut()
        .then( () => {
          context.commit('setUser', null);
          context.commit('setIsAuthenticated', false);
          router.push({
            name: 'Login'
          })
        })
        .catch(() => {
          context.commit('setUser', null);
          context.commit('setIsAuthenticated', false);
          rrouter.push({
            name: 'Login'
          });
        });
    },
    seed: ({ rootState }) => {
      let exCatRef = rootState.db.collection('exercise-category');

      exCatRef.add({
      })
    },
    userExerciseCategories: (context) => {
      db.collection('exerciseCategory').get().then(snapshot => {
        // console.log('snapshot', snapshot)
        context.commit('setExerciseCategories', snapshot.docs.map(category => ({
          id: category.id,
          name: category.data()
        })))
        // snapshot.forEach(doc => {
        //   let categories = [
        //     {
        //       id: doc.id,
        //       name: doc.data()
        //     }
        //   ]
        //   const category = context.state.exerciseCategories.push(categories)
        //   let categories = doc.data();
        //   categories.id = doc.id
        //   console.log('categories in userExCat', categories)
        //   context.commit('setExerciseCategories', categories)
        // })
      });
    }
  }
})

export default store;