<template>
  <div class="dashboard">
    <h1 class="subheading greay--text">Dashboard</h1>
    <v-container class="my-5">

      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat right color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By workout name</span>
          </v-btn>
          <span>Sort workouts by workout name</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat right color="grey" @click="sortBy('date')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By Date</span>
          </v-btn>
          <span>Sort by person name</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="workout in workouts" :key="workout.id">
        <v-layout row wrap :class="`pa-3 workout ${workout.status}`">
          
          <v-flex xs12 md6>
            <div class="caption grey--text">Workout Title</div>
            <div>{{ workout.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ workout.alias }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ workout.date }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${workout.status} white--text caption my-2`">{{ workout.status }}</v-chip>
            </div>
          </v-flex>
          <v-btn color="info edit" small fab dark @click="multiple(workout.id)"><v-icon>edit</v-icon></v-btn>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
          <v-card tile>
            <v-toolbar card dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Workout Session</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <EditScheduleWorkoutSession @workoutAdded="snackbar = true" />
            </v-card-text>
          </v-card>
        </v-dialog>
          <v-icon v-if="workout.status != 'complete'" @click="deleteWorkoutSession(workout.id)" small class="delete">delete</v-icon>
          
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
  </div>
</template>

<script>
  import db from '@/firebase/fb';
  import firebase from 'firebase';
  import EditScheduleWorkoutSession from '@/components/layout/EditScheduleWorkoutSession';

  export default {
    
    name: 'ViewDashboard',
    components: {
      EditScheduleWorkoutSession
    },
    data() {
      return {
        dialog: false,
      }
    },
    computed: {
      workouts() {
        return this.$store.getters.getWorkouts;
      }
    },
    methods: {
      sortBy(prop) {
        this.workouts.sort( (a, b) => a[prop] < b[prop] ? -1 : 1)
      },
      deleteWorkoutSession(id) {
        this.$store.dispatch('deleteWorkoutSession', id)
      },
      multiple(id) {
        this.dialog = true;
        this.$store.dispatch('editWorkoutSession', id);
      }
    },
    created() {
      this.$store.dispatch('setWorkouts')
    }
  }

</script>

<style>

  .workout.complete {
    border-left: 4px solid #3CD1C2;
  }

  .workout.ongoing {
    border-left: 4px solid orange
  }

  .workout.overdue {
    border-left: 4px solid tomato;
  }

  .v-chip.complete {
    background: #3cd1c2;
  }

  .v-chip.ongoing {
    background: #ffaa2c;
  }

  .v-chip.overdue {
    background: #f83e70;
  }

  .workout .delete {
    position: absolute;
    bottom: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }

</style>