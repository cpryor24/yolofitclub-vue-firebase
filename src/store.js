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
    exerciseCategories: [],
    workoutSession: [],
    exercise: []
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
    },
    getWorkoutSession: state => {
      return state.workoutSession;
    },
    getExercise: state => {
      return state.exercise;
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
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
    },
    setWorkoutSession: (state, payload) => {
      state.workoutSession = payload;
    },
    setExercise: (state, payload) => {
      state.exercise = payload;
    }
  },
  actions: {
    setUserAction: context => {
      context.commit('setUser', firebase.auth().currentUser);
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
    userSignup: (context, email) => {
      let ref = db.collection('users').doc(email.slug);
      ref.get().then(doc => {
        if(doc.exists){
          email.aliasRules
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email.email, email.password)
            .then(cred => {
              ref.set({
                alias: email.alias,
                first_name: email.first_name,
                last_name: email.last_name,
                isAdmin: email.isAdmin,
                isPersonalTrainer: email.isPersonalTrainer,
                userRole: email.userRole,
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
    userLogin: (context, email) => {
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
          router.push({
            name: 'Login'
          });
        });
    },
    userExerciseCategories: (context) => {
      db.collection('exerciseCategory').get().then(snapshot => {
        let category = []
        snapshot.forEach(doc => {
          let categories = doc.data();
          categories.id = doc.id;
          category.push(categories);
        })
        context.commit('setExerciseCategories', category)
      })
    },
    addWorkoutSession: (context, workout) => {
      db.collection('workouts').add(workout).then(() => {
        context.commit('setWorkoutSession', workout);
        router.push({
          name: 'Timeline'
        })
      })
    },
    deleteWorkoutSession: (context, id) => {
      db.collection('workouts').doc(id).delete().then(() => {
        context.commit('setWorkoutSession', context.state.workouts.filter(workout => workout.id != id))
        router.push({
          name: 'Timeline'
        })
      })
    },
    editWorkoutSession: (context, id) => {
      let ref = db.collection('workouts').where(firebase.firestore.FieldPath.documentId(), '==', id)
        ref.get().then(snapshot => {
          snapshot.forEach(doc => {
            let workout = doc.data();
            workout.id = doc.id;
            context.commit('setWorkoutSession', workout)
          })
        })
    },
    startWorkoutSession: (context, id) => {
      let ref = db.collection('workouts').where(firebase.firestore.FieldPath.documentId(), '==', id)
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          let workout = doc.data();
          workout.id = doc.id;
          context.commit('setWorkoutSession', workout);
          router.push(`workouts/${id}`);
        })
      })
    },
    completeExercise: (context, name) => {
      let id = name.params;
      let path = name.name;
      let ref = db.collection('workouts').where(firebase.firestore.FieldPath.documentId(), '==', id)
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          context.commit('setExercise', doc.data().selectedExercises.filter(exercise => exercise.name == path)[0] )
          router.push(`${id}/${path}`);
        })
      })
    },
    finishExercise: (context, submittedExercise) => {
      // let ref = doc.collection('workouts').where(firebase.firestore.FieldPath.documentId(), '==', id)
    }
  }
})

export default store;