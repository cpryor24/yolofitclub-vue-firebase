import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    workouts: [
      // {title: 'Legs', status: 'ongoing', content: 'doing four exercises', data: '2019-01-03'},
      // {title: 'Shoulders', status: 'completed', content: 'This is a leg workout', data: '2019-01-02'},
      // {title: 'Back', status: 'overdue', content: 'This is a back workout', data: '2019-01-01'}
    ]
  },
  getters: {
   
  },
  mutations: {

  },
  actions: {

  }
})

export default store;